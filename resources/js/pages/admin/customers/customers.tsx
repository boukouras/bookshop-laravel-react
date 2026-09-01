import { Head, router } from '@inertiajs/react';
import { dashboard, adminCustomersIndex, adminCustomersShow, adminCustomersEdit } from '@/routes';
import { Author, Product, User } from '@/types';
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
    customers: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, User>[] = createColumns<User>({
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
            accessorKey: "email",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Email"
                />
            ),
        },

        {
            accessorKey: "telephone",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Telephone"
                />
            ),
        },
    ],

    actions: [
        {
            label: "View Customer",
            onClick: (customer) => {
                router.get(adminCustomersShow(customer.id))
            },
        },

        {
            label: "Edit Customer",
            onClick: (customer) => {
                router.get(adminCustomersEdit(customer.id))
            },
        },

        {
            label: "Delete Customer",
            onClick: (customer) => {
                console.log(customer.id)
            },
        },
    ],
})
export default function Customers({ customers, filters }: Props) {
    const statistics = [
        {
            label: 'Total Customers',
            value: customers.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Customers',
            value: customers.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Customers',
            value: customers.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: customers.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Customers" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <Button onClick={() => router.visit('#')}>
                        <Plus className="mr-2" />
                        Add Author
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={customers.data} />
            </div>
        </>
    )
}

Customers.layout = {
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
            title: 'Customers',
            href: adminCustomersIndex(),
        },
    ],
};