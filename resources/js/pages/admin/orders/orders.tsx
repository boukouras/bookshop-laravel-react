import { Head, router } from '@inertiajs/react';
import { dashboard, adminOrdersIndex, adminOrdersShow, adminOrdersEdit } from '@/routes';
import { Author, Order, Product } from '@/types';
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
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Order>[] = createColumns<Order>({
    columns: [
        {
            accessorKey: "customer",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Customer"
                />
            ),
            cell: ({ row }) => {
                return row.original.user.name ?? "Unknown";
            },
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
                return row.original.items.length ?? "Unknown";
            },
        },

        {
            accessorKey: "amount",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Amount"
                />
            ),
        },

        {
            accessorKey: "payment",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Payment"
                />
            ),
            cell: ({ row }) => {
                return row.original.payments[0].status ?? "Unknown";
            },
        },

        {
            accessorKey: "shipment",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Shipment"
                />
            ),
            cell: ({ row }) => {
                return row.original.shipments[0].status ?? "Unknown";
            },
        },

    ],

    actions: [
        {
            label: "View Order",
            onClick: (order) => {
                router.get(adminOrdersShow(order.id))
            },
        },

        {
            label: "Edit Order",
            onClick: (order) => {
                router.get(adminOrdersEdit(order.id))
            },
        },

        {
            label: "Delete Order",
            onClick: (order) => {
                console.log(order.id)
            },
        },
    ],
})
export default function Orders({ orders, filters }: Props) {
    console.log(orders)
    const statistics = [
        {
            label: 'Total Orders',
            value: orders.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Orders',
            value: orders.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Orders',
            value: orders.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: orders.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Orders" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Orders</h1>
                    <Button onClick={() => router.visit('#')}>
                        <Plus className="mr-2" />
                        Add Order
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={orders.data} />
            </div>
        </>
    )
}

Orders.layout = {
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
            title: 'Orders',
            href: adminOrdersIndex(),
        },
    ],
};