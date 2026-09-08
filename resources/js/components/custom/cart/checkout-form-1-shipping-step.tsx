'use client'
import { Controller, type Control } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { CheckoutForm1Data } from './checkout-data'
import { CheckoutForm1CountryField } from './checkout-form-1-country-field'
import { ShippingMethod } from '@/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
type CheckoutForm1ShippingStepProps = { control: Control<CheckoutForm1Data>, shippingMethods: ShippingMethod[] }
export function CheckoutForm1ShippingStep({ control, shippingMethods }: CheckoutForm1ShippingStepProps) {
  return (
    <FieldGroup>
      <Controller name="shipping_method_id" control={control} render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend className="text-sm font-medium">
              Shipping Method
            </FieldLegend>
            <RadioGroup value={String(field.value)}onValueChange={(value) => field.onChange(Number(value))}className="flex flex-col gap-3"aria-invalid={fieldState.invalid}>
              {shippingMethods.map((method) => {
                const hasFreeShipping = method.free_from_amount !== null
                const hasDeliveryEstimate = method.min_days !== null || method.max_days !== null
                const deliveryEstimate = method.min_days !== null &&method.max_days !== null? method.min_days === method.max_days? `${method.min_days} days`: `${method.min_days}-${method.max_days} days`: method.min_days !== null? `${method.min_days}+ days`: method.max_days !== null? `Up to ${method.max_days} days`: null
                const isSelected = field.value === method.id
                return (
                  <FieldLabel key={method.id}htmlFor={`shipping-method-${method.id}`}className="cursor-pointer">
                    <Field orientation="horizontal"className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 data-[selected=true]:border-primary data-[selected=true]:bg-muted/50"data-invalid={fieldState.invalid}data-selected={isSelected}>
                      <RadioGroupItem id={`shipping-method-${method.id}`}value={String(method.id)}/>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-medium">
                              {method.name}
                            </div>
                            {method.description && (<p className="text-sm text-muted-foreground">{method.description}</p>)}
                          </div>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          {hasDeliveryEstimate && (<span>Delivery: {deliveryEstimate}</span>)}
                          {method.provider && (<span className="capitalize">{method.provider}</span>)}
                        </div>
                        {hasFreeShipping && (
                          <p className="mt-1 text-xs font-medium text-green-600">
                            Free shipping on orders over{' '}{Number(method.free_from_amount,).toLocaleString('el-GR', {style: 'currency',currency: 'EUR',})}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        {Number(method.price) === 0 ? (
                          <span className="font-semibold text-green-600">Free</span>
                        ) : (
                          <span className="font-semibold">{Number(method.price,).toLocaleString('el-GR', {style: 'currency',currency: 'EUR',})}</span>
                        )}
                      </div>
                    </Field>
                  </FieldLabel>
                )
              })}
            </RadioGroup>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </FieldSet>
        )}
      />
      <Controller name="address" control={control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="address">
            Street address
          </FieldLabel>
          <Input {...field} id="address" placeholder="Main Street" className="h-9" aria-invalid={fieldState.invalid} autoComplete="street-address" />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )} />
      <Controller name="number" control={control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="number">
            Street number
          </FieldLabel>
          <Input {...field} id="number" placeholder="123" className="h-9" aria-invalid={fieldState.invalid} autoComplete="street-address" />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )} />
      <div className="grid gap-4 md:grid-cols-2">
        <Controller name="city" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city">
              City
            </FieldLabel>
            <Input {...field} id="city" placeholder="New York" className="h-9" aria-invalid={fieldState.invalid} autoComplete="address-level2" />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )} />
        <Controller name="state" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="state">
              State / Region
            </FieldLabel>
            <Input {...field} id="state" placeholder="NY" className="h-9" aria-invalid={fieldState.invalid} autoComplete="address-level1" />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Controller name="postal_code" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="postal_code">
              ZIP code
            </FieldLabel>
            <Input {...field} id="postal_code" placeholder="10001" className="h-9" aria-invalid={fieldState.invalid} autoComplete="postal-code" />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )} />
        <CheckoutForm1CountryField control={control} />
      </div>
    </FieldGroup>
  )
}