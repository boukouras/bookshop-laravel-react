import { Head, router } from '@inertiajs/react';
import { dashboard, adminAuthorsIndex, adminAuthorsShow, adminAuthorsCreate } from '@/routes';
import { Author, Product } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { DataTable } from '@/components/dashboard/data/data-table';
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
interface Props {
    authors: {
        data: Author[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Author>[] = createColumns<Author>({
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

        {
            accessorKey: "products",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Products"
                />
            ),

            cell: ({ row }) => {
                const products = Number(row.original.products?.length)

                return products ?? "-"
            },
        },
    ],

    actions: [
        {
            label: "View Author",
            onClick: (author) => {
                router.get(adminAuthorsShow(author.id))
            },
        },
    ],
})
export default function Authors({ authors, filters }: Props) {
    const statistics = [
        {
            label: 'Total Authors',
            value: authors.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Authors',
            value: authors.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Authors',
            value: authors.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: authors.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Authors" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Authors</h1>
                    <Button onClick={() => router.visit(adminAuthorsCreate())}>
                        <Plus className="mr-2" />
                        Add Author
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={authors.data} />
            </div>
        </>
    )
}

Authors.layout = {
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
    ],
};