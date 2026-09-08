'use client'
import { useState } from 'react'
import { Controller, type Control, useWatch } from 'react-hook-form'
import { CreditCard, Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { CheckoutForm1Data } from './checkout-data'
import { PaymentMethod } from '@/types'
type CheckoutForm1PaymentStepProps = { control: Control<CheckoutForm1Data>, paymentMethods: PaymentMethod[] }
export function CheckoutForm1PaymentStep({ control, paymentMethods }: CheckoutForm1PaymentStepProps) {
    const [showCvv, setShowCvv] = useState(false)
    const paymentMethodId = useWatch({ control, name: 'payment_method_id', })
    const selectedPaymentMethod = paymentMethods.find(paymentMethod => paymentMethod.id === paymentMethodId,)
    const isCardPayment = selectedPaymentMethod?.slug === 'credit_card'
    console.log(selectedPaymentMethod?.slug)
    return (
        <div className="flex flex-col gap-6">
            {/* Payment method */}
            <Controller name="payment_method_id" control={control} render={({ field, fieldState }) => (
                <FieldSet>
                    <FieldLegend className="text-sm font-medium">
                        Payment Method
                    </FieldLegend>
                    <RadioGroup value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))} className="flex flex-col gap-3" aria-invalid={fieldState.invalid}>
                        {paymentMethods.map((paymentMethod) => (
                            <FieldLabel key={paymentMethod.id} htmlFor={`payment-method-${paymentMethod.id}`}>
                                <Field orientation="horizontal" className="cursor-pointer rounded-lg border p-4" data-invalid={fieldState.invalid}>
                                    <RadioGroupItem value={String(paymentMethod.id)} id={`payment-method-${paymentMethod.id}`} />
                                    <CreditCard className="size-5 text-muted-foreground" aria-hidden="true" />
                                    <span className="flex-1">
                                        {paymentMethod.name}
                                        {Number(paymentMethod.cost) > 0 && (
                                            <span className="text-muted-foreground">{' '} - additional cost of{' '}{Number(paymentMethod.cost).toLocaleString('el-GR', { style: 'currency', currency: 'EUR' })}</span>
                                        )}
                                    </span>
                                </Field>
                            </FieldLabel>
                        ))}
                    </RadioGroup>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </FieldSet>
            )}
            />
            {isCardPayment && (
                <FieldGroup>
                    {/* Card number */}
                    <Controller name="cardNumber" control={control} render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="cardNumber">
                                Card number
                            </FieldLabel>
                            <Input {...field} id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} className="h-9" inputMode="numeric" autoComplete="cc-number" aria-invalid={fieldState.invalid} onChange={event => { const formatted = event.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim(); field.onChange(formatted) }} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Expiry */}
                        <Controller name="expiryDate" control={control} render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="expiryDate">
                                    Expiry
                                </FieldLabel>
                                <Input {...field} id="expiryDate" placeholder="MM/YY" maxLength={5} className="h-9" inputMode="numeric" autoComplete="cc-exp" aria-invalid={fieldState.invalid} onChange={event => { const formatted = event.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2',); field.onChange(formatted) }} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                        {/* CVV */}
                        <Controller name="cvv" control={control} render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="cvv">
                                    CVV
                                </FieldLabel>
                                <InputGroup className="h-9">
                                    <InputGroupInput {...field} id="cvv" type={showCvv ? 'text' : 'password'} placeholder="123" maxLength={4} inputMode="numeric" autoComplete="cc-csc" aria-invalid={fieldState.invalid} onChange={event => { field.onChange(event.target.value.replace(/\D/g, '',),) }} />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton type="button" variant="ghost" size="icon-xs" aria-label={showCvv ? 'Hide CVV' : 'Show CVV'} className="cursor-pointer hover:bg-transparent" onClick={() => setShowCvv(current => !current)}>
                                            {showCvv ? (
                                                <EyeOff className="text-muted-foreground" />
                                            ) : (
                                                <Eye className="text-muted-foreground" />
                                            )}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                        {/* Card name */}
                        <Controller name="cardName" control={control} render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="cardName">
                                    Name on card
                                </FieldLabel>
                                <Input {...field} id="cardName" placeholder="John Doe" className="h-9" autoComplete="cc-name" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />
                    </div>
                    {/* Save payment information */}
                    <Controller name="saveInfo" control={control} render={({ field }) => (
                        <Field orientation="horizontal">
                            <Checkbox id="saveInfo" checked={field.value} onCheckedChange={field.onChange} />
                            <FieldLabel htmlFor="saveInfo" className="text-sm font-normal"                            >
                                Save payment information for future purchases
                            </FieldLabel>
                        </Field>
                    )} />
                </FieldGroup>
            )}
        </div>
    )
}