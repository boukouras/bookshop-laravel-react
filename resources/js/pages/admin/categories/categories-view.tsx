import { Product, Category } from "@/types"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import { dashboard, adminCategoriesIndex, adminCategoriesDestroy, adminCategoriesUpdate, adminProductsShow } from "@/routes"
import { router } from "@inertiajs/react"
import { GenericForm, GenericFormField } from "@/components/dashboard/forms/data-add-form"
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
import { DataTable } from "@/components/dashboard/data/data-table"
const formSchema = z.object({
    name: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    slug: z.string().min(1, "Slug is required.").max(255, "Slug must be at most 255 characters."),
    image: z.string().min(1, "Image is required.").max(255, "Image must be at most 255 characters."),
    description: z.string().min(1, "Description is required.").max(255, "Description must be at most 255 characters."),
    status: z.boolean(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
})
type CategoryFormValues = z.infer<typeof formSchema>
export default function CategoriesView({ products, category }: { products: Product[], category: Category }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: category.slug ?? "",
            name: category.name ?? "",
            image: category.image ? String(category.image).slice(0, 10) : "",
            description: category.description ?? "",
            status: category.status ?? false,
            created_at: category.created_at ? String(category.created_at).slice(0, 10) : "",
            updated_at: category.updated_at ? String(category.updated_at).slice(0, 10) : "",
        },
    })
    const categoryFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Category Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Category Slug..." },
        { name: "image", label: "Image", type: "text", placeholder: "Category ..." },
        { name: "description", label: "Description", type: "text", placeholder: "Category Description..." },
        { name: "status", label: "Status", type: "checkbox", placeholder: "Category Status..." },
        { name: "created_at", label: "Updated at", type: "display", disabled: true },
        { name: "updated_at", label: "Created at", type: "display", disabled: true },
    ] satisfies GenericFormField<CategoryFormValues>[]
    const columns: ColumnDef<DataTableFeatures, Product>[] = createColumns<Product>({
        columns: [
            {
                accessorKey: "title",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Title"
                    />
                ),
            },

            {
                accessorKey: "isbn",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="ISBN"
                    />
                ),
            },

            {
                accessorKey: "pages",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Pages"
                    />
                ),
            },

            {
                accessorKey: "price",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Price"
                    />
                ),

                cell: ({ row }) => {
                    const price = Number(row.getValue("price"))

                    return new Intl.NumberFormat("el-GR", {
                        style: "currency",
                        currency: "EUR",
                    }).format(price)
                },
            },

            {
                accessorKey: "stock",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Stock"
                    />
                ),
            },
        ],

        actions: [
            {
                label: "View product",
                onClick: (product) => {
                    router.get(adminProductsShow(product.id))
                },
            },
        ],
    })
    function handleCancel() { form.reset(); setIsEditing(false) }
    function handleDelete() {
        setIsSaving(true);
        router.delete(
            adminCategoriesDestroy(category.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Category deleted successfully.")
                router.visit(adminCategoriesIndex().url)
            },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsDeleting(false) },
        })
    }
    function onSubmit(data: CategoryFormValues) {
        setIsSaving(true)
        router.put(adminCategoriesUpdate(category.id).url, data, {
            preserveScroll: true, onSuccess: () => { setIsEditing(false); toast.success("Category updated successfully.") },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsSaving(false) },
        })
    }
    return (
        <>
            <GenericForm
                form={form}
                title={category.name}
                description={`Information for ${category.name}`}
                sections={[
                    { title: "General", description: `General information for ${category.name}`, fields: categoryFields.slice(0, 5) },
                    { title: "Category Details", description: "Additional category information.", fields: categoryFields.slice(5) },
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
                deleteTitle="Delete this Category"
                deleteMessage="Are you realy want to delete this category?"
            />
            <div className="px-10 py-10">
                {products.length > 0 ? (<DataTable columns={columns} data={products} />) : ("There is no products for this category")}
            </div>
        </>
    )
}

CategoriesView.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Catalog',
            href: '#',
        },
        {
            title: 'Categories',
            href: adminCategoriesIndex(),
        },
        {
            title: 'View',
            href: '#',
        },
    ],
};
