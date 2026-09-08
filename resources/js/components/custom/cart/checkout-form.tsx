'use client'
import type { CheckoutForm1Data } from './checkout-data'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckoutForm1ContactStep } from './checkout-form-1-contact-step'
import { CheckoutForm1OrderSummary } from './checkout-form-1-order-summary'
import { CheckoutForm1PaymentStep } from './checkout-form-1-payment-step'
import { CheckoutForm1Progress } from './checkout-form-1-progress'
import { CheckoutForm1ShippingStep } from './checkout-form-1-shipping-step'
import { checkoutSchema } from './checkout-data'
import { Cart, PaymentMethod, ShippingMethod } from '@/types'
import { router } from '@inertiajs/react'
import { cartStoreOrder } from '@/routes'
import { usePage } from '@inertiajs/react'
const STEP_COPY = [
    { title: 'Contact Information', description: "We'll use this to send you order updates" },
    { title: 'Shipping Address', description: 'Where should we deliver your order?' },
    { title: 'Payment Details', description: 'Your payment information is secure and encrypted' },
]
const STEP_FIELDS = {
    1: ['email', 'firstName', 'lastName', 'phone'],
    2: ['shipping_method_id', 'address', 'city', 'state', 'postal_code', 'country'],
    3: ['cardNumber', 'expiryDate', 'cvv', 'cardName'],
} as const
export function CheckoutForm({ initialCheckoutForm1Data, cart, paymentMethods, shippingMethods }: { initialCheckoutForm1Data: CheckoutForm1Data, cart: Cart, paymentMethods: PaymentMethod[], shippingMethods: ShippingMethod[] }) {
    const { auth } = usePage().props
    console.log(auth)
    const [step, setStep] = useState(1)
    const form = useForm<CheckoutForm1Data>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            ...initialCheckoutForm1Data,
            email: auth.user.email ?? '',
            firstName: auth.user.name.split(' ')[0] ?? '',
            lastName: auth.user.name.split(' ')[1] ?? '',
        },
        mode: 'onTouched',
    })
    const { control, trigger, handleSubmit, } = form
    const nextStep = async () => {
        const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS]
        const isValid = await trigger(fields)
        if (!isValid) { return }
        setStep(prev => Math.min(prev + 1, STEP_COPY.length))
    }
    const prevStep = () => { setStep(prev => Math.max(prev - 1, 1)) }
    const onSubmit = (data: CheckoutForm1Data) => {
        console.log(data)
        // Submit checkout to Laravel
        router.post(
            cartStoreOrder(),
            data,
        )
    }

    return (
        <div className="bg-muted/30">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-balance">
                        Secure Checkout
                    </h1>
                    <p className="text-muted-foreground">
                        Complete your purchase in just a few steps
                    </p>
                </div>
                <CheckoutForm1Progress step={step} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-balance">
                                        {STEP_COPY[step - 1].title}
                                    </CardTitle>
                                    <CardDescription>
                                        {STEP_COPY[step - 1].description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-6">
                                    {step === 1 && (<CheckoutForm1ContactStep control={control} />)}
                                    {step === 2 && (<CheckoutForm1ShippingStep control={control} shippingMethods={shippingMethods} />)}
                                    {step === 3 && (<CheckoutForm1PaymentStep control={control} paymentMethods={paymentMethods} />)}
                                    <div className="flex justify-between pt-6">
                                        <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="h-9 cursor-pointer px-4 py-2">
                                            <ArrowLeft data-icon="inline-start" />
                                            Back
                                        </Button>
                                        {step < STEP_COPY.length ? (
                                            <Button type="button" onClick={nextStep} className="h-9 cursor-pointer px-4 py-2">
                                                Continue
                                            </Button>
                                        ) : (
                                            <Button type="submit" className="h-9 cursor-pointer px-4 py-2">
                                                <Lock data-icon="inline-start" />
                                                Complete Order
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1">
                            <CheckoutForm1OrderSummary control={control} cart={cart} paymentMethods={paymentMethods} shippmentMethods={shippingMethods} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}