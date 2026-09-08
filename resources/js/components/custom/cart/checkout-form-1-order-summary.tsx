'use client'
import { Controller, type Control, useWatch } from 'react-hook-form'
import { Gift, Shield, Tag, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { Cart, Coupon, PaymentMethod, ShippingMethod } from '@/types'
import type { CheckoutForm1Data } from './checkout-data'
import { CartItem } from './cart'
import { useState } from 'react'
import { cartCartCouponApply } from '@/routes'
type CheckoutForm1OrderSummaryProps = { control: Control<CheckoutForm1Data>, cart: Cart, paymentMethods: PaymentMethod[], shippmentMethods: ShippingMethod[] }
export function CheckoutForm1OrderSummary({ control, cart, paymentMethods, shippmentMethods }: CheckoutForm1OrderSummaryProps) {
    const items = cart.items ?? []
    const subtotal = items.reduce((total, item) => { const price = Number(item.product?.price); return total + price * item.quantity }, 0)
    const paymentMethodId = useWatch({ control, name: 'payment_method_id', })
    const selectedPaymentMethod = paymentMethods.find(paymentMethod => paymentMethod.id === paymentMethodId,)
    const shippmentMethodId = useWatch({ control, name: 'shipping_method_id' })
    const selectedShippmentMethod = shippmentMethods.find(shippmentMethod => shippmentMethod.id === shippmentMethodId)
    const freeFromAmount = Number(selectedShippmentMethod?.free_from_amount ?? 0)
    const shipping = freeFromAmount > 0 && subtotal >= freeFromAmount ? 0 : Number(selectedShippmentMethod?.price ?? 0)
    const paymentCost = Number(selectedPaymentMethod?.cost ?? 0)
    const diff = Math.max(freeFromAmount - subtotal, 0)
    const tax = 0
    const formatPrice = (value: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(value) }


    const [couponLoading, setCouponLoading] = useState(false)
    const [couponError, setCouponError] = useState<string | null>(null)
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
    
    const discount = appliedCoupon?.value ? appliedCoupon.type === 'fixed' ? Math.min(appliedCoupon.value, subtotal) : subtotal * (appliedCoupon.value / 100) : 0
    const total = subtotal - discount + shipping + tax + paymentCost
    const applyCoupon = async (code: string) => {
        const normalizedCode = code.trim()

        if (!normalizedCode) {
            setCouponError('Please enter a promo code.')
            return
        }

        setCouponLoading(true)
        setCouponError(null)

        try {
            const response = await fetch(
                cartCartCouponApply.url(),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        promo_code: normalizedCode,
                    }),
                },
            )

            const data = await response.json()

            if (!response.ok) {
                setCouponError(
                    data.errors?.promo_code?.[0] ??
                    'Unable to apply this coupon.',
                )

                setAppliedCoupon(null)
                return
            }

            setAppliedCoupon(data.coupon)
        } catch {
            setCouponError('Unable to apply this coupon.')
            setAppliedCoupon(null)
        } finally {
            setCouponLoading(false)
        }
    }
    return (
        <Card className="sticky top-8">
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-balance">
                        Order Summary
                    </CardTitle>
                    <Badge variant="secondary">
                        {items.length}{' '}
                        {items.length === 1 ? 'item' : 'items'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {/* Items */}
                <div className="flex flex-col gap-4">
                    {items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <Separator />
                {/* Promo code */}
                <Controller name="promo_code" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="promo_code" className="text-sm">
                            Promo code
                        </FieldLabel>
                        <div className="flex gap-2">
                            <Input {...field} id="promo_code" placeholder="Enter code" className="h-9 uppercase" aria-invalid={fieldState.invalid} onChange={(event) => { field.onChange(event); setCouponError(null) }} />
                            <Button type="button" variant="outline" className="h-9 shrink-0 cursor-pointer px-4" disabled={couponLoading} onClick={() => applyCoupon(field.value ?? '')}>
                                {couponLoading ? 'Applying...' : 'Apply'}
                            </Button>
                        </div>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        {couponError && (
                            <p className="text-sm text-destructive">
                                {couponError}
                            </p>
                        )}
                        {appliedCoupon && (
                            <p className="text-sm text-green-600">
                                Coupon <strong>{appliedCoupon.code}</strong> applied.
                            </p>
                        )}
                    </Field>
                )} />
                <Separator />
                {/* Prices */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            Subtotal
                        </span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    {selectedShippmentMethod && (
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Truck className="size-3.5" aria-hidden="true" />
                                Shipping
                            </span>

                            <span>
                                {shipping === 0 ? 'Free' : formatPrice(shipping)}
                            </span>
                        </div>
                    )}
                    {selectedShippmentMethod && shipping > 0 && freeFromAmount > 0 && diff > 0 && (
                        <p className="text-xs text-muted-foreground">
                            Spend {formatPrice(diff)} more to get free shipping.
                        </p>
                    )}
                    {tax > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Tax
                            </span>
                            <span>{formatPrice(tax)}</span>
                        </div>
                    )}
                    {paymentCost > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Additional Payment Cost
                            </span>
                            <span>{formatPrice(paymentCost)}</span>
                        </div>
                    )}
                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1.5">
                                <Tag className="size-3.5" aria-hidden="true" />
                                Discount
                            </span>
                            <span>
                                -{formatPrice(discount)}
                            </span>
                        </div>
                    )}
                    {appliedCoupon?.code && appliedCoupon.value && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1.5">
                                <Tag className="size-3.5" aria-hidden="true" />
                                {appliedCoupon.code}
                            </span>
                            <span>
                                {appliedCoupon.type === 'fixed' ? (
                                    `-${formatPrice(appliedCoupon.value)}`
                                ) : (
                                    `-${appliedCoupon.value}%`
                                )}
                            </span>
                        </div>
                    )}
                </div>
                <Separator />
                {/* Total */}
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">
                        Total
                    </span>
                    <span className="text-xl font-bold">
                        {formatPrice(total)}
                    </span>
                </div>
                {/* Trust information */}
                <div className="flex flex-col gap-3 border-t pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="size-4 shrink-0" aria-hidden="true" />
                        <span>
                            SSL encrypted checkout
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Truck className="size-4 shrink-0" aria-hidden="true" />
                        <span>
                            Free shipping on orders over $75
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Gift className="size-4 shrink-0" aria-hidden="true" />
                        <span>
                            30-day return policy
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}