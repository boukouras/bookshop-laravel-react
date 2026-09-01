import { Controller, UseFormReturn } from "react-hook-form"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/custom/multi-select"
import { FormFieldConfig } from "@/types"

type GenericFormFieldsProps = {
    form: UseFormReturn<any>
    fields: FormFieldConfig[]
}
export function GenericFormFields({ form, fields }: GenericFormFieldsProps) {
    return (
        <>
            {fields.map((config) => (
                <Controller key={config.name} name={config.name} control={form.control} render={({ field, fieldState }) => {
                    if (config.type === "textarea") {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {config.label}
                                </FieldLabel>
                                <Textarea {...field} placeholder={config.placeholder} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                            </Field>
                        )
                    }
                    if (config.type === "checkbox") {
                        return (
                            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <FieldContent>
                                    <FieldLabel>
                                        {config.label}
                                    </FieldLabel>
                                    {config.description && (
                                        <FieldDescription>
                                            {config.description}
                                        </FieldDescription>
                                    )}
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error,]} />)}
                                </FieldContent>
                            </Field>
                        )
                    }
                    if (config.type === "select") {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {config.label}
                                </FieldLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={config.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {config.options?.map(
                                            (option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>
                                                    {option.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error,]} />
                                )}
                            </Field>
                        )
                    }
                    if (config.type === "multiselect") {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {config.label}
                                </FieldLabel>
                                <MultiSelect options={config.options ?? []} value={field.value ?? []} onValueChange={field.onChange} placeholder={config.placeholder} searchPlaceholder={`Search ${config.label}...`} />
                                {fieldState.invalid && (<FieldError errors={[fieldState.error,]} />)}
                            </Field>
                        )
                    }
                    return (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {config.label}
                            </FieldLabel>
                            <Input {...field} type={config.type} placeholder={config.placeholder} aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && (<FieldError errors={[fieldState.error,]} />)}
                        </Field>
                    )
                }}
                />
            ))}
        </>
    )
}