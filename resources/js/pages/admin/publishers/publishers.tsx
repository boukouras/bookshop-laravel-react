import { Head, router } from '@inertiajs/react';
import { dashboard, adminPublishersIndex, adminPublishersShow, adminPublishersCreate } from '@/routes';
import { Author, Product, Publisher } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { DataTable } from '@/components/dashboard/data/data-table';
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
interface Props {
    publishers: {
        data: Publisher[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Publisher>[] = createColumns<Publisher>({
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
            label: "View Publisher",
            onClick: (publisher) => {
                router.get(adminPublishersShow(publisher.id))
            },
        },
        {
            label: "Delete Publisher",
            onClick: (publisher) => {
                console.log(publisher.id)
            },
        },
    ],
})
export default function Publishers({ publishers, filters }: Props) {
    const statistics = [
        {
            label: 'Total Publishers',
            value: publishers.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Publishers',
            value: publishers.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Publishers',
            value: publishers.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: publishers.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Publishers" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Publishers</h1>
                    <Button onClick={() => router.visit(adminPublishersCreate())}>
                        <Plus className="mr-2" />
                        Add Publisher
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={publishers.data} />
            </div>
        </>
    )
}

Publishers.layout = {
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
    ],
};