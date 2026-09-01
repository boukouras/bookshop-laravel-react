import { Review } from "@/types";
import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DataTableColumnHeader } from "../data/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableFeatures } from "../data/data-table-features";
import { createColumns } from "../data/custom-columns";
import { DataTable } from "../data/data-table";
export function ProductReviews({ reviews }: { reviews: Review[] }) {
    const columns: ColumnDef<DataTableFeatures, Review>[] = createColumns<Review[]>({
        columns: [
            {
                accessorKey: "user",
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
                accessorKey: "email",
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Email"
                    />
                ),
                cell: ({ row }) => {
                    return row.original.user.email ?? "Unknown";
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

            {
                accessorKey: "comment",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Comment"
                    />
                ),
            },

            {
                accessorKey: "verified_purchase",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Verified Purchase"
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

            {
                accessorKey: "created_at",

                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Created At"
                    />
                ),
            },
        ],
    })
    const featureName = "Reviews"
    return (
        <Card size="sm" className="w-full">
            <CardHeader>
                <CardTitle>{featureName}</CardTitle>
                <CardDescription>
                    All reviews
                </CardDescription>
            </CardHeader>
            <CardContent>
                {reviews.length > 0 ? (
                    <DataTable columns={columns} data={reviews} />
                ) : (
                    'There is no review for this product'
                )}
            </CardContent>
        </Card>
    )
}