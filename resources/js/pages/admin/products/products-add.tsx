"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Category, Tag } from "@/types"
import { adminProductsIndex, adminProductsStore } from "@/routes"
import { router } from "@inertiajs/react"
import { GenericFormField } from "@/components/dashboard/forms/data-add-form"
import { GenericForm } from "@/components/dashboard/forms/data-add-form"
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
})
type ProductFormValues = z.infer<typeof formSchema>
export default function ProductsAdd({ categories, tags, }: { categories: Category[], tags: Tag[] }) {
    const categoryOptions = categories.map((category) => ({ label: category.name, value: category.id, }))
    const tagOptions = tags.map((tag) => ({ label: tag.name, value: tag.id, }))
    const statusOptions = [
        {label: "Active",value: "active"},
        {label: "Inactive",value: "inactive"},
        {label: "Draft",value: "draft"},
    ]
    const productFields = [
        {name: "title",label: "Title",type: "text",placeholder: "Product title..."},
        {name: "slug",label: "Slug",type: "text",placeholder: "product-slug..."},
        {name: "description",label: "Description",type: "textarea",placeholder: "Product description..."},
        {name: "isbn",label: "ISBN",type: "text",placeholder: "ISBN..."},
        {name: "price",label: "Price",type: "number",placeholder: "0.00"},
        {name: "categories",label: "Categories",type: "multiselect",options: categoryOptions},
        {name: "status",label: "Status",type: "select",options: statusOptions},
        {name: "tags",label: "Tags",type: "multiselect",options: tagOptions},
        {name: "stock",label: "Stock",type: "number",placeholder: "0"},
        {name: "release_date",label: "Release Date",type: "date"},
        {name: "is_featured",label: "Featured",type: "checkbox",description:"This product will be displayed as featured on the home page."},
    ] satisfies GenericFormField<ProductFormValues>[]
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: "",
            title: "",
            description: "",
            isbn: "",
            price: "",
            stock: "",
            release_date: "",
            status: "draft",
            is_featured: false,
            categories: [],
            tags: [],
        },
    })
    function onSubmit(data: ProductFormValues) {
        router.post(adminProductsStore().url, data, {
            preserveScroll: true,
            onSuccess: () => { toast.success("Product created successfully.") },
            onError: () => { toast.error("Something went wrong.") },
        })
    }
    function handleCancel() { router.visit(adminProductsIndex().url) }
    return (
        <GenericForm
            form={form}
            title="Add New Product"
            description="Create a new product for your catalog."
            sections={[
                {title: "General",description:"Basic information about the product.",fields: productFields.slice(0, 5)},
                {title: "Product Details",description:"Additional product information.",fields: productFields.slice(5)},
            ]}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            submitLabel="Create Product"
            submittingLabel="Creating..."
        />
    )
}