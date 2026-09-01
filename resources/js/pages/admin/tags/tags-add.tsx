"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { dashboard, adminTagsIndex, adminTagsStore } from "@/routes"
import { router } from "@inertiajs/react"
import { GenericFormField } from "@/components/dashboard/forms/data-add-form"
import { GenericForm } from "@/components/dashboard/forms/data-add-form"
const formSchema = z.object({
    name: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    slug: z.string().min(1, "Slug is required.").max(255, "Slug must be at most 255 characters."),
})
type TagFormValues = z.infer<typeof formSchema>
export default function TagsAdd() {
    const tagFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Tag Name..." },
        { name: "slug", label: "Slug", type: "text", placeholder: "Tag Slug..." },
    ] satisfies GenericFormField<TagFormValues>[]
    const form = useForm<TagFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    })
    function onSubmit(data: TagFormValues) {
        router.post(adminTagsStore().url, data, {
            preserveScroll: true,
            onSuccess: () => { toast.success("Tag created successfully.") },
            onError: () => { toast.error("Something went wrong.") },
        })
    }
    function handleCancel() { router.visit(adminTagsIndex().url) }
    return (
        <GenericForm
            form={form}
            title="Add New Tag"
            description="Create a new tag for your catalog."
            sections={[
                { title: "General", description: "Basic information about the tag.", fields: tagFields.slice(0, 5) },
                { title: "Tag Details", description: "Additional tag information.", fields: tagFields.slice(5) },
            ]}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            submitLabel="Create Tag"
            submittingLabel="Creating..."
        />
    )
}

TagsAdd.layout = {
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
            title: 'Edit',
            href: '#',
        },
    ],
};
