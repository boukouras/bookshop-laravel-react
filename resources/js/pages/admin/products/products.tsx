import { Head, router } from '@inertiajs/react';
import { dashboard, adminProductsIndex, adminProductsShow, adminProductsCreate } from '@/routes';
import { Product } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { DataTable } from '@/components/dashboard/data/data-table';
// import { columns } from '@/components/dashboard/data/columns';
import { DataTableFeatures } from "@/components/dashboard/data/data-table-features"
import { type ColumnDef } from "@tanstack/react-table"
import { createColumns } from "@/components/dashboard/data/custom-columns"
import { DataTableColumnHeader } from "@/components/dashboard/data/data-table-column-header"
interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
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
export default function Products({ products, filters }: Props) {
    const statistics = [
        {
            label: 'Total Products',
            value: products.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Products',
            value: products.data.filter((p) => p.status === 'active').length,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Products',
            value: products.data.filter((p) => p.status === 'draft').length,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: products.data.filter(p => p.stock && p.stock > 0).length,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Products" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button onClick={() => router.visit(adminProductsCreate())}>
                        <Plus className="mr-2" />
                        Add Product
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={products.data} />
            </div>
        </>
    )
}

Products.layout = {
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
            title: 'Products',
            href: adminProductsIndex(),
        },
    ],
};