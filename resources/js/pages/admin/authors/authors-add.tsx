"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { dashboard, adminAuthorsIndex, adminAuthorsStore } from "@/routes"
import { router } from "@inertiajs/react"
import { GenericFormField } from "@/components/dashboard/forms/data-add-form"
import { GenericForm } from "@/components/dashboard/forms/data-add-form"
const formSchema = z.object({
    name: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    slug: z.string().min(1, "Slug is required.").max(255, "Slug must be at most 255 characters."),
    logo: z.string().min(1, "Logo is required.").max(255, "Logo must be at most 255 characters."),
    description: z.string().min(1, "Description is required.").max(255, "Description must be at most 255 characters."),
    status: z.boolean()
})
type AuthorFormValues = z.infer<typeof formSchema>
export default function AuthorsAdd() {
    const authorFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Author Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Author Slug..." },
        { name: "logo", label: "Logo", type: "text", placeholder: "Author Logo..." },
        { name: "description", label: "Description", type: "text", placeholder: "Author Description..." },
        { name: "status", label: "Status", type: "checkbox", placeholder: "Author Status..." },
    ] satisfies GenericFormField<AuthorFormValues>[]
    const form = useForm<AuthorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            logo: "",
            description:"",
            status: false
        },
    })
    function onSubmit(data: AuthorFormValues) {
        router.post(adminAuthorsStore().url, data, {
            preserveScroll: true,
            onSuccess: () => { toast.success("Author created successfully.") },
            onError: () => { toast.error("Something went wrong.") },
        })
    }
    function handleCancel() { router.visit(adminAuthorsIndex().url) }
    return (
        <GenericForm
            form={form}
            title="Add New Author"
            description="Create a new author for your catalog."
            sections={[
                { title: "General", description: "Basic information about the author.", fields: authorFields.slice(0, 5) },
                { title: "Author Details", description: "Additional author information.", fields: authorFields.slice(5) },
            ]}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            submitLabel="Create Author"
            submittingLabel="Creating..."
        />
    )
}

AuthorsAdd.layout = {
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
            title: 'Authors',
            href: adminAuthorsIndex(),
        },
        {
            title: 'Edit',
            href: '#',
        },
    ],
};
