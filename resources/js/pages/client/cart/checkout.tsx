import { ShoppingBag } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckoutForm } from '@/components/custom/cart/checkout-form'
import { initialCheckoutForm1Data, } from '@/components/custom/cart/checkout-data'
import type { Cart, PaymentMethod, ShippingMethod } from '@/types'
export default function CheckOut({ cart, shippingMethods, paymentMethods }: { cart: Cart, shippingMethods: ShippingMethod[], paymentMethods: PaymentMethod[] }) {
    const hasItems = cart.items && cart.items?.length > 0
    console.log(paymentMethods)
    return (
        <main className="min-h-svh bg-muted/30">
            {hasItems ? (
                <div className="w-full">
                    <CheckoutForm initialCheckoutForm1Data={initialCheckoutForm1Data} cart={cart} shippingMethods={shippingMethods} paymentMethods={paymentMethods} />
                </div>
            ) : (
                <div className="flex min-h-svh items-center justify-center px-4 py-12">
                    <Card className="w-full max-w-md">
                        <CardHeader className="items-center text-center">
                            <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-muted">
                                <ShoppingBag className="size-7 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-2xl">
                                Your cart is empty
                            </CardTitle>
                            <CardDescription>
                                There are no products in your cart.
                                Add some products before proceeding
                                to checkout.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Button asChild className="cursor-pointer">
                                <Link href="/products">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    )
}