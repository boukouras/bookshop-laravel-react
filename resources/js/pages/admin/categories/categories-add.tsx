"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { dashboard, adminCategoriesStore, adminCategoriesIndex } from "@/routes"
import { router } from "@inertiajs/react"
import { GenericFormField } from "@/components/dashboard/forms/data-add-form"
import { GenericForm } from "@/components/dashboard/forms/data-add-form"
const formSchema = z.object({
    name: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    slug: z.string().min(1, "Slug is required.").max(255, "Slug must be at most 255 characters."),
    image: z.string().min(1, "Image is required.").max(255, "Image must be at most 255 characters."),
    description: z.string().min(1, "Description is required.").max(255, "Description must be at most 255 characters."),
    status: z.boolean(),
})
type CategoryFormValues = z.infer<typeof formSchema>
export default function CategoriesAdd() {
    const categoryFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Category Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Category Slug..." },
        { name: "image", label: "Image", type: "text", placeholder: "Category ..." },
        { name: "description", label: "Description", type: "text", placeholder: "Category Description..." },
        { name: "status", label: "Status", type: "checkbox", placeholder: "Category Status..." },
    ] satisfies GenericFormField<CategoryFormValues>[]
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: "",
            name: "",
            image: "",
            description: "",
            status: false,
        },
    })
    function onSubmit(data: CategoryFormValues) {
        router.post(adminCategoriesStore().url, data, {
            preserveScroll: true,
            onSuccess: () => { toast.success("Category created successfully.") },
            onError: () => { toast.error("Something went wrong.") },
        })
    }
    function handleCancel() { router.visit(adminCategoriesIndex().url) }
    return (
        <GenericForm
            form={form}
            title="Add New Category"
            description="Create a new category for your catalog."
            sections={[
                { title: "General", description: "Basic information about the category.", fields: categoryFields.slice(0, 5) },
                { title: "Category Details", description: "Additional category information.", fields: categoryFields.slice(5) },
            ]}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            submitLabel="Create Category"
            submittingLabel="Creating..."
        />
    )
}

CategoriesAdd.layout = {
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
            title: 'Add',
            href: '#',
        },
    ],
};
