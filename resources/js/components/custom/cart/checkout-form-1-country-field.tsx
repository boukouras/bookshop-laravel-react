'use client'
import { Controller, type Control } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { countryLabels, countryOptions, type CheckoutForm1Data } from './checkout-data'
type CheckoutForm1CountryFieldProps = { control: Control<CheckoutForm1Data> }
export function CheckoutForm1CountryField({ control, }: CheckoutForm1CountryFieldProps) {
    return (
        <Controller name="country" control={control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="country">
                    Country
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="country" className="!h-9 w-full" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select country">
                            {field.value
                                ? countryLabels[field.value] ?? field.value
                                : null}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {countryOptions.map(country => (
                                <SelectItem key={country.value} value={country.value}>
                                    {country.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                )}
            </Field>
        )} />
    )
}