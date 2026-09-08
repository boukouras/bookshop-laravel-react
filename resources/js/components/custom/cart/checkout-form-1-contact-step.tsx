'use client'
import { Controller, type Control } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { CheckoutForm1Data } from './checkout-data'
type CheckoutForm1ContactStepProps = { control: Control<CheckoutForm1Data> }
export function CheckoutForm1ContactStep({ control, }: CheckoutForm1ContactStepProps) {
    return (
        <FieldGroup>
            <Controller name="email" control={control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">
                        Email address
                    </FieldLabel>
                    <Input {...field} id="email" type="email" placeholder="john@example.com" className="h-9" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )} />
            <div className="grid gap-4 md:grid-cols-2">
                <Controller name="firstName" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="firstName">
                            First name
                        </FieldLabel>
                        <Input {...field} id="firstName" placeholder="John" className="h-9" aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
                <Controller name="lastName" control={control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="lastName">
                            Last name
                        </FieldLabel>
                        <Input {...field} id="lastName" placeholder="Doe" className="h-9" aria-invalid={fieldState.invalid} />

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )} />
            </div>
            <Controller name="phone" control={control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">
                        Phone number (optional)
                    </FieldLabel>
                    <Input {...field} id="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-9" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )} />
        </FieldGroup>
    )
}