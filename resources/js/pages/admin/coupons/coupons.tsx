import { Head, router } from '@inertiajs/react';
import { dashboard, adminCouponsIndex, adminCouponsShow, adminCouponsEdit } from '@/routes';
import { Author, Coupon, Product } from '@/types';
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
    coupons: {
        data: Coupon[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}
const columns: ColumnDef<DataTableFeatures, Coupon>[] = createColumns<Coupon>({
    columns: [
        {
            accessorKey: "code",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Code"
                />
            ),
        },

        {
            accessorKey: "value",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Value"
                />
            ),
        },
        
        {
            accessorKey: "status",

            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Status"
                />
            ),
        },
    ],

    actions: [
        {
            label: "View Coupon",
            onClick: (coupon) => {
                router.get(adminCouponsShow(coupon.id))
            },
        },

        {
            label: "Edit Coupon",
            onClick: (coupon) => {
                router.get(adminCouponsEdit(coupon.id))
            },
        },

        {
            label: "Delete Coupon",
            onClick: (coupon) => {
                console.log(coupon.id)
            },
        },
    ],
})
export default function Coupons({ coupons, filters }: Props) {
    const statistics = [
        {
            label: 'Total Coupons',
            value: coupons.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Coupons',
            value: coupons.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Coupons',
            value: coupons.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: coupons.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Coupons" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Coupons</h1>
                    <Button onClick={() => router.visit('#')}>
                        <Plus className="mr-2" />
                        Add Coupon
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={coupons.data} />
            </div>
        </>
    )
}

Coupons.layout = {
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
            title: 'Coupons',
            href: adminCouponsIndex(),
        },
    ],
};