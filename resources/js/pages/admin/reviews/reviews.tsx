import { Head, router } from '@inertiajs/react';
import { dashboard, adminReviewsIndex, adminReviewsShow, adminReviewsEdit } from '@/routes';
import { Author, Product, Review } from '@/types';
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
    reviews: {
        data: Review[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Reviews({ reviews, filters }: Props) {
    const columns: ColumnDef<DataTableFeatures, Review>[] = createColumns<Review[]>({
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
                accessorKey: "product",
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Product"
                    />
                ),
                cell: ({ row }) => {
                    return row.original.product.title ?? "Unknown";
                },
            },

            {
                accessorKey: "rating",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Rating"
                    />
                ),
            },

        ],

        actions: [
            {
                label: "View Review",
                onClick: (review) => {
                    router.get(adminReviewsShow(review.id))
                },
            },

            {
                label: "Edit Review",
                onClick: (review) => {
                    router.get(adminReviewsEdit(review.id))
                },
            },

            {
                label: "Delete Review",
                onClick: (review) => {
                    console.log(review.id)
                },
            },
        ],
    })
    const statistics = [
        {
            label: 'Total Reviews',
            value: reviews.total,
            percentage: '+12%',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Active Reviews',
            value: reviews.total,
            percentage: '',
            isPositive: true,
            icon: ShoppingBag,
        },
        {
            label: 'Draft Reviews',
            value: reviews.total,
            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
        {
            label: 'Out Of Stock',
            value: reviews.total,

            percentage: '',
            isPositive: false,
            icon: ShoppingBag,
        },
    ];
    return (
        <>
            <Head title="Reviews" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Reviews</h1>
                    <Button onClick={() => router.visit('#')}>
                        <Plus className="mr-2" />
                        Add Review
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <AnalyticsCard key={index} stat={stat} />
                    ))}
                </div>
                <DataTable columns={columns} data={reviews.data} />
            </div>
        </>
    )
}

Reviews.layout = {
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
            title: 'Reviews',
            href: adminReviewsIndex(),
        },
    ],
};