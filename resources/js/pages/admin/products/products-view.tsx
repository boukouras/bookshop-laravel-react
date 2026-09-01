"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod"
import { router } from "@inertiajs/react"
import { Product, Category, Tag } from "@/types"
import { ProductReviews } from "@/components/dashboard/products/product-reviews"
import { adminProductsDestroy, adminProductsIndex, adminProductsUpdate } from "@/routes"
import { GenericForm, GenericFormField } from "@/components/dashboard/forms/data-add-form"
const formSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    slug: z.string().min(1, "Slug is required.").max(255, "Slug must be at most 255 characters."),
    description: z.string().min(1, "Description is required."),
    isbn: z.string().optional(),
    price: z.string().min(1, "Price is required.").refine((value) => !Number.isNaN(Number(value)), "Price must be a valid number.").refine((value) => Number(value) >= 0, "Price cannot be negative."),
    stock: z.string().min(1, "Stock is required.").refine((value) => /^\d+$/.test(value), "Stock must be a valid number."),
    release_date: z.string().optional(),
    status: z.enum(["active", "inactive", "draft"]),
    is_featured: z.boolean(),
    categories: z.array(z.number()),
    tags: z.array(z.number()),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
})
type ProductFormValues = z.infer<typeof formSchema>
export default function ProductsView({ product, categories, tags }: { product: Product, categories: Category[], tags: Tag[] }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: product.slug ?? "",
            title: product.title ?? "",
            description: product.description ?? "",
            isbn: product.isbn ?? "",
            price: product.price != null ? String(product.price) : "",
            stock: product.stock != null ? String(product.stock) : "",
            release_date: product.release_date ? String(product.release_date).slice(0, 10) : "",
            status: product.status,
            is_featured: product.is_featured ?? false,
            categories: product.categories?.map((category) => category.id) ?? [],
            tags: product.tags?.map((tag) => tag.id) ?? [],
            created_at: product.created_at ? String(product.created_at).slice(0, 10) : "",
            updated_at: product.updated_at ? String(product.updated_at).slice(0, 10) : "",
        },
    })
    const categoryOptions = categories.map((category) => ({ label: category.name, value: category.id, }))
    const tagOptions = tags.map((tag) => ({ label: tag.name, value: tag.id, }))
    const statusOptions = [
        {
            label: "Active",
            value: "active",
        },
        {
            label: "Inactive",
            value: "inactive",
        },
        {
            label: "Draft",
            value: "draft",
        },
    ]
    const productFields = [
        { name: "title", label: "Title", type: "text", placeholder: "Product title..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "product-slug..." },
        { name: "description", label: "Description", type: "textarea", placeholder: "Product description..." },
        { name: "isbn", label: "ISBN", type: "text", placeholder: "ISBN..." },
        { name: "price", label: "Price", type: "number", placeholder: "0.00" },
        { name: "categories", label: "Categories", type: "multiselect", options: categoryOptions },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "tags", label: "Tags", type: "multiselect", options: tagOptions },
        { name: "stock", label: "Stock", type: "number", placeholder: "0" },
        { name: "release_date", label: "Release Date", type: "date" },
        { name: "is_featured", label: "Featured", type: "checkbox", description: "This product will be displayed as featured on the home page." },
        { name: "created_at", label: "Updated at", type: "display", disabled: true },
        { name: "updated_at", label: "Created at", type: "display", disabled: true },
    ] satisfies GenericFormField<ProductFormValues>[]
    function handleCancel() { form.reset(); setIsEditing(false) }
    function handleDelete() {
        setIsSaving(true);
        router.delete(
            adminProductsDestroy(product.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Product deleted successfully.")
                router.visit(adminProductsIndex().url)
            },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsDeleting(false) },
        })
    }
    function onSubmit(data: ProductFormValues) {
        setIsSaving(true)
        router.put(adminProductsUpdate(product.id).url, data, {
            preserveScroll: true, onSuccess: () => { setIsEditing(false); toast.success("Product updated successfully.") },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsSaving(false) },
        })
    }
    return (
        <div>
            {/* Header */}
            <GenericForm
                form={form}
                title={product.title}
                description={`Information for ${product.title}`}
                sections={[
                    { title: "General", description: `General information for ${product.title}`, fields: productFields.slice(0, 5) },
                    { title: "Product Details", description: "Additional product information.", fields: productFields.slice(5) },
                ]}
                onSubmit={onSubmit}
                onCancel={handleCancel}
                submitLabel="Save"
                submittingLabel="Saving..."
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
                deleting={isDeleting}
                deleteLabel="Delete"
                deletingLabel="Deleting..."
                deleteTitle="Delete this Product"
                deleteMessage="Are you realy want to delete this product?"
            />
            <div className="px-10 py-10">
                {product.reviews ? (<ProductReviews reviews={product.reviews} />) : ("There is no reviews for this product")}
            </div>
        </div>
    )
}