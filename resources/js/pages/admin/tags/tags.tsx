import { Head, router } from '@inertiajs/react';
import { dashboard, adminTagsIndex, adminTagsShow, adminTagsCreate } from '@/routes';
import { Tag } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { DataTable } from '@/components/dashboard/data/data-table';
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
interface Props {
    tags: {
        data: Tag[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Tag>[] = createColumns<Tag>({
    columns: [
        {
            accessorKey: "name",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Name"
                />
            ),
        },

        {
            accessorKey: "slug",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Slug"
                />
            ),
        },
    ],

    actions: [
        {
            label: "View Tag",
            onClick: (tag) => {
                router.get(adminTagsShow(tag.id))
            },
        },

        {
            label: "Delete Tag",
            onClick: (tag) => {
                console.log(tag.id)
            },
        },
    ],
})
export default function Tags({ tags, filters }: Props) {
    const statistics = [
        {
            label: 'Total Tags',
            value: tags.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Tags',
            value: tags.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Tags',
            value: tags.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: tags.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Tags" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <Button onClick={() => router.visit(adminTagsCreate())}>
                        <Plus className="mr-2" />
                        Add Tag
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={tags.data} />
            </div>
        </>
    )
}

Tags.layout = {
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
    ],
};