import { Head, router } from '@inertiajs/react';
import { dashboard, adminCategoriesIndex, adminCategoriesShow, adminCategoriesCreate } from '@/routes';
import { Category } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { DataTable } from '@/components/dashboard/data/data-table';
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
interface Props {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Category>[] = createColumns<Category>({
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
            accessorKey: "description",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Description"
                />
            ),
        },
    ],

    actions: [
        {
            label: "View Category",
            onClick: (category) => {
                router.get(adminCategoriesShow(category.id))
            },
        },
    ],
})
export default function Categories({ categories, filters }: Props) {
    const statistics = [
        {
            label: 'Total Categories',
            value: categories.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Categories',
            value: categories.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Categories',
            value: categories.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: categories.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Categories" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Button onClick={() => router.visit(adminCategoriesCreate())}>
                        <Plus className="mr-2" />
                        Add Category
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={categories.data} />
            </div>
        </>
    )
}

Categories.layout = {
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
    ],
};