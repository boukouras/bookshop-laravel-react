import { Product, Tag } from "@/types"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import { dashboard, adminTagsIndex, adminTagsDestroy, adminTagsUpdate, adminProductsShow } from "@/routes"
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
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
})
type TagFormValues = z.infer<typeof formSchema>
export default function TagsView({ products, tag }: { products: Product[], tag: Tag }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const form = useForm<TagFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: tag.slug ?? "",
            name: tag.name ?? "",
            created_at: tag.created_at ? String(tag.created_at).slice(0, 10) : "",
            updated_at: tag.updated_at ? String(tag.updated_at).slice(0, 10) : "",
        },
    })
    const tagFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Tag Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Tag Slug..." },
        { name: "created_at", label: "Updated at", type: "display", disabled: true },
        { name: "updated_at", label: "Created at", type: "display", disabled: true },
    ] satisfies GenericFormField<TagFormValues>[]
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
            adminTagsDestroy(tag.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Tag deleted successfully.")
                router.visit(adminTagsIndex().url)
            },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsDeleting(false) },
        })
    }
    function onSubmit(data: TagFormValues) {
        setIsSaving(true)
        router.put(adminTagsUpdate(tag.id).url, data, {
            preserveScroll: true, onSuccess: () => { setIsEditing(false); toast.success("Tag updated successfully.") },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsSaving(false) },
        })
    }
    return (
        <>
            <GenericForm
                form={form}
                title={tag.name}
                description={`Information for ${tag.name}`}
                sections={[
                    { title: "General", description: `General information for ${tag.name}`, fields: tagFields.slice(0, 5) },
                    { title: "Tag Details", description: "Additional tag information.", fields: tagFields.slice(5) },
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
                deleteTitle="Delete this Tag"
                deleteMessage="Are you realy want to delete this tag?"
            />
            <div className="px-10 py-10">
                {products.length>0 ? (<DataTable columns={columns} data={products} />) : ("There is no products for this tag")}
            </div>
        </>
    )
}

TagsView.layout = {
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
            title: 'Tags',
            href: adminTagsIndex(),
        },
        {
            title: 'View',
            href: '#',
        },
    ],
};
