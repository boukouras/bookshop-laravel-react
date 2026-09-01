import { Product, Publisher } from "@/types"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import { dashboard, adminPublishersIndex, adminPublishersDestroy, adminPublishersUpdate, adminProductsShow } from "@/routes"
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
    logo: z.string().min(1, "Logo is required.").max(255, "Logo must be at most 255 characters."),
    description: z.string().min(1, "Description is required.").max(255, "Description must be at most 255 characters."),
    status: z.boolean(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
})
type PublisherFormValues = z.infer<typeof formSchema>
export default function PublishersView({ products, publisher }: { products: Product[], publisher: Publisher }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const form = useForm<PublisherFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: publisher.slug ?? "",
            name: publisher.name ?? "",
            logo: publisher.logo ? String(publisher.logo).slice(0, 10) : "",
            description: publisher.description ?? "",
            status: publisher.status,
            created_at: publisher.created_at ? String(publisher.created_at).slice(0, 10) : "",
            updated_at: publisher.updated_at ? String(publisher.updated_at).slice(0, 10) : "",
        },
    })
    const publisherFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Publisher Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Publisher Slug..." },
        { name: "logo", label: "Logo", type: "text", placeholder: "Publisher Logo..." },
        { name: "description", label: "Description", type: "text", placeholder: "Publisher Description..." },
        { name: "status", label: "Status", type: "checkbox", placeholder: "Publisher Status..." },
        { name: "created_at", label: "Updated at", type: "display", disabled: true },
        { name: "updated_at", label: "Created at", type: "display", disabled: true },
    ] satisfies GenericFormField<PublisherFormValues>[]
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
            adminPublishersDestroy(publisher.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Publisher deleted successfully.")
                router.visit(adminPublishersIndex().url)
            },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsDeleting(false) },
        })
    }
    function onSubmit(data: PublisherFormValues) {
        setIsSaving(true)
        router.put(adminPublishersUpdate(publisher.id).url, data, {
            preserveScroll: true, onSuccess: () => { setIsEditing(false); toast.success("Publisher updated successfully.") },
            onError: () => { toast.error("Something went wrong.") },
            onFinish: () => { setIsSaving(false) },
        })
    }
    return (
        <>
            <GenericForm
                form={form}
                title={publisher.name}
                description={`Information for ${publisher.name}`}
                sections={[
                    { title: "General", description: `General information for ${publisher.name}`, fields: publisherFields.slice(0, 5) },
                    { title: "Publisher Details", description: "Additional publisher information.", fields: publisherFields.slice(5) },
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
                deleteTitle="Delete this Publisher"
                deleteMessage="Are you realy want to delete this publisher?"
            />
            <div className="px-10 py-10">
                {products.length > 0 ? (<DataTable columns={columns} data={products} />) : ("There is no products for this publisher")}
            </div>
        </>
    )
}

PublishersView.layout = {
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
            title: 'Publisher',
            href: adminPublishersIndex(),
        },
        {
            title: 'View',
            href: '#',
        },
    ],
};
