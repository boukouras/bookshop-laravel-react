"use client"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Check, Pencil, Trash, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/custom/multi-select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
export type GenericFormField<T extends FieldValues> = {
    name: Path<T>
    label: string
    type: | "text" | "number" | "textarea" | "date" | "select" | "multiselect" | "checkbox" | "datetime" | "display"
    placeholder?: string
    description?: string
    options?: { label: string; value: string | number }[]
    disabled?: boolean
    min?: number
    max?: number
    step?: number
    rows?: number
    className?: string
    render?: (field: any, fieldState: any) => React.ReactNode
}
export type GenericFormSection<T extends FieldValues> = { title: string; description?: string; fields: GenericFormField<T>[] }
export type GenericFormProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    title: string
    description?: string
    sections: GenericFormSection<T>[]
    onSubmit: (data: T) => void | Promise<void>
    onCancel?: () => void
    isEditing?: boolean
    onEdit?: () => void
    alwaysEditing?: boolean
    submitLabel?: string
    submittingLabel?: string
    cancelLabel?: string
    onDelete?: () => void
    deleting?: boolean
    deleteLabel?: string
    deletingLabel?: string
    showDeleteInEditMode?: boolean
    deleteTitle?: string,
    deleteMessage?: string
    editLabel?: string
    className?: string
    contentClassName?: string
    showHeader?: boolean
    showActions?: boolean
    children?: React.ReactNode
}
export function GenericForm<T extends FieldValues>({
    form,
    title,
    description,
    sections,
    onSubmit,
    onCancel,
    isEditing = true,
    onEdit,
    alwaysEditing = false,
    submitLabel = "Save",
    submittingLabel = "Saving...",
    cancelLabel = "Cancel",
    onDelete,
    deleting = false,
    deleteLabel = "Delete",
    deletingLabel = "Deleting...",
    showDeleteInEditMode = true,
    deleteTitle,
    deleteMessage,
    editLabel = "Edit",
    className = "space-y-6 p-4",
    contentClassName = "px-10 py-10",
    showHeader = true,
    showActions = true,
    children,
}: GenericFormProps<T>) {
    const isSubmitting = form.formState.isSubmitting
    const editable = alwaysEditing || isEditing
    const handleSubmit = form.handleSubmit(onSubmit)
    function renderField(fieldConfig: GenericFormField<T>) {
        return (
            <Controller key={String(fieldConfig.name)} name={fieldConfig.name} control={form.control} render={({ field, fieldState, }) => {
                const invalid = fieldState.invalid
                const disabled = fieldConfig.disabled || !editable
                if (fieldConfig.render) {
                    return (
                        <Field data-invalid={invalid} className={fieldConfig.className}>
                            {fieldConfig.render(field, fieldState)}
                        </Field>
                    )
                }
                if (fieldConfig.type === "checkbox") {
                    return (
                        <Field orientation="horizontal" data-invalid={invalid} className={fieldConfig.className}>
                            <Checkbox id={`form-${String(fieldConfig.name)}`} checked={field.value === true} disabled={disabled} onCheckedChange={field.onChange} aria-invalid={invalid} />
                            <FieldContent>
                                <FieldLabel htmlFor={`form-${String(fieldConfig.name)}`}>{fieldConfig.label}</FieldLabel>
                                {fieldConfig.description && (<FieldDescription>{fieldConfig.description}</FieldDescription>)}
                                {invalid && (<FieldError errors={[fieldState.error,]} />)}
                            </FieldContent>
                        </Field>
                    )
                }
                return (
                    <Field data-invalid={invalid} className={fieldConfig.className}>
                        <FieldLabel htmlFor={`form-${String(fieldConfig.name)}`}>{fieldConfig.label}</FieldLabel>
                        {(fieldConfig.type === "text" || fieldConfig.type === "number" || fieldConfig.type === "date") && (
                            <Input {...field} id={`form-${String(fieldConfig.name)}`} type={fieldConfig.type} placeholder={fieldConfig.placeholder} disabled={disabled} min={fieldConfig.min} max={fieldConfig.max} step={fieldConfig.step} aria-invalid={invalid} />
                        )}
                        {fieldConfig.type === "datetime" && (
                            <Input id={`form-${String(fieldConfig.name)}`} type="datetime-local" value={field.value ? String(field.value).slice(0, 16) : ""} disabled={disabled} onChange={field.onChange} aria-invalid={invalid} />
                        )}
                        {fieldConfig.type === "display" && (
                            <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm">
                                {field.value ? new Date(field.value).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", }) : "-"}
                            </div>
                        )}
                        {fieldConfig.type === "textarea" && (
                            <Textarea {...field} id={`form-${String(fieldConfig.name)}`} placeholder={fieldConfig.placeholder} disabled={disabled} rows={fieldConfig.rows ?? 6} className="resize-none" aria-invalid={invalid} />
                        )}
                        {fieldConfig.type === "select" && (
                            <Select value={field.value ? String(field.value) : ""} disabled={disabled} onValueChange={(value) => {
                                const option = fieldConfig.options?.find((item) => String(item.value) === value)
                                field.onChange(option ? option.value : value)
                            }}>
                                <SelectTrigger id={`form-${String(fieldConfig.name)}`} aria-invalid={invalid}>
                                    <SelectValue placeholder={fieldConfig.placeholder ?? `Select ${fieldConfig.label.toLowerCase()}...`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {fieldConfig.options?.map((option) => (<SelectItem key={String(option.value)} value={String(option.value)}>{option.label}</SelectItem>))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                        {fieldConfig.type === "multiselect" && (
                            <MultiSelect options={fieldConfig.options ?? []} value={Array.isArray(field.value) ? field.value : []} onValueChange={field.onChange} placeholder={fieldConfig.placeholder ?? `Select ${fieldConfig.label.toLowerCase()}...`} searchPlaceholder={`Search ${fieldConfig.label.toLowerCase()}...`} disabled={disabled} />
                        )}
                        {fieldConfig.description && (<FieldDescription>{fieldConfig.description}</FieldDescription>)}
                        {invalid && (<FieldError errors={[fieldState.error,]} />)}
                    </Field>
                )
            }} />
        )
    }
    function DeleteDialog() {
        return (<DeleteDialog />)
    }
    return (
        <div className={className}>
            {showHeader && (
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        {description && (<p className="text-sm text-muted-foreground">{description}</p>)}
                    </div>
                    {showActions && (
                        <div className="flex items-center gap-2">
                            {!editable && onEdit && (
                                <Button type="button" onClick={onEdit} disabled={isSubmitting}>
                                    <Pencil className="mr-2 size-4" />
                                    {editLabel}
                                </Button>)}
                            {editable && (
                                <>
                                    {onDelete && showDeleteInEditMode && (
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button type="button" variant="destructive" disabled={isSubmitting || deleting}><Trash2 className="mr-2 size-4" />{deleting ? deletingLabel : deleteLabel}</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-sm">
                                                    <DialogHeader>
                                                        <DialogTitle>{deleteTitle}</DialogTitle>
                                                        <DialogDescription>
                                                            {deleteMessage}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">No</Button>
                                                        </DialogClose>
                                                        <Button type="submit" onClick={onDelete}>Yes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                    )}
                                    {onCancel && (<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}><X className="mr-2 size-4" />{cancelLabel}</Button>)}
                                    <Button type="submit" form="generic-form" disabled={isSubmitting}><Check className="mr-2 size-4" />{isSubmitting ? submittingLabel : submitLabel}</Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
            <form id="generic-form" onSubmit={handleSubmit}>
                <section className={contentClassName}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {sections.map((section, sectionIndex) => (
                            <Card key={`${section.title}-${sectionIndex}`} size="sm" className="w-full">
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                    {section.description && (<CardDescription>{section.description}</CardDescription>)}
                                </CardHeader>
                                <CardContent>
                                    <FieldGroup>{section.fields.map((field) => renderField(field))}</FieldGroup>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </form>
            {children}
        </div>
    )
}