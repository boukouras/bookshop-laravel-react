"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { dashboard, adminPublishersStore, adminPublishersIndex } from "@/routes"
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
type PublisherFormValues = z.infer<typeof formSchema>
export default function PublishersAdd() {
    const publisherFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Publisher Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Publisher Slug..." },
        { name: "logo", label: "Logo", type: "text", placeholder: "Publisher Logo..." },
        { name: "description", label: "Description", type: "text", placeholder: "Publisher Description..." },
        { name: "status", label: "Status", type: "checkbox", placeholder: "Publisher Status..." },
    ] satisfies GenericFormField<PublisherFormValues> []
    const form = useForm<PublisherFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            logo: "",
            description:"",
            status: false
        },
    })
    function onSubmit(data: PublisherFormValues) {
        router.post(adminPublishersStore().url, data, {
            preserveScroll: true,
            onSuccess: () => { toast.success("Publisher created successfully.") },
            onError: () => { toast.error("Something went wrong.") },
        })
    }
    function handleCancel() { router.visit(adminPublishersIndex().url) }
    return (
        <GenericForm
            form={form}
            title="Add New Publisher"
            description="Create a new publisher for your catalog."
            sections={[
                { title: "General", description: "Basic information about the publisher.", fields: publisherFields.slice(0, 5) },
                { title: "Publisher Details", description: "Additional publisher information.", fields: publisherFields.slice(5) },
            ]}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            submitLabel="Create Publisher"
            submittingLabel="Creating..."
        />
    )
}

PublishersAdd.layout = {
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
            title: 'Publishers',
            href: adminPublishersIndex(),
        },
        {
            title: 'Edit',
            href: '#',
        },
    ],
};
