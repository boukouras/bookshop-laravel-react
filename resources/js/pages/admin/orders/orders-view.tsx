import { Product, Category, Tag, Author, Order } from "@/types"
import { ProductReviews } from "@/components/dashboard/products/product-reviews"
import { dashboard, adminOrdersIndex, adminOrdersEdit } from "@/routes"
import { Plus } from "lucide-react"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldContent
} from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { MultiSelect } from "@/components/custom/multi-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Link } from "@inertiajs/react"
export default function OrdersView({ product, order }: { product: Product, order: Order }) {
    return (
        <>
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{order.id}</h1>
                    <Button onClick={() => router.visit(adminOrdersEdit(order.id))}>
                        <Plus className="mr-2" />
                        Edit
                    </Button>
                </div>
                <section className="py-10 px-10">
                    <Link href={'https://dashboard.shadcnspace.com/apps/ecommerce/editproduct'} target="_blank">ΓΙΑ ΕΜΠΝΕΥΣΗ</Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>General</CardTitle>
                                <CardDescription>
                                    General Information for {order.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="id">ID</FieldLabel>
                                    <Input id="id" type="text" placeholder="ID..." disabled value={order.id} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="amount">Amount</FieldLabel>
                                    <Input id="amount" type="number" placeholder="Amount..." disabled value={order.amount} />
                                </Field>
                            </CardContent>
                        </Card>
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    General Information for {order.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="created_at">Created Date</FieldLabel>
                                    {String(order.created_at) ?? '-'}
                                    {/* <Input id="created_at" type="date" placeholder="Release Date..." disabled value={order.release_date ? order.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="updated_at">Updated Date</FieldLabel>
                                    {String(order.updated_at) ?? '-'}
                                    {/* <Input id="updated_at" type="date" placeholder="Release Date..." disabled value={order.release_date ? order.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deleted_at">Deleted Date</FieldLabel>
                                    {order.deleted_at ? String(order.deleted_at) : '-'}
                                    {/* <Input id="deleted_at" type="date" placeholder="Release Date..." disabled value={order.release_date ? order.release_date : ""} /> */}
                                </Field>
                            </CardContent>
                        </Card>

                    </div>
                    {order.items ? (
                        // <ProductReviews reviews={product.reviews} />
                        'He have products'
                    ) : (
                        'There is no reviews for this product'
                    )}
                </section >
            </div>
        </>
    )
}

OrdersView.layout = {
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
        {
            title: 'View',
            href: '#',
        },
    ],
};
