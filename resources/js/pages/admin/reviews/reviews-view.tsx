import { Product, Category, Tag, Author, Review } from "@/types"
import { ProductReviews } from "@/components/dashboard/products/product-reviews"
import { dashboard, adminReviewsIndex, adminReviewsEdit } from "@/routes"
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
export default function ReviewsView({ product, review }: { product: Product, review: Review }) {
    return (
        <>
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{review.id}</h1>
                    <Button onClick={() => router.visit(adminReviewsEdit(review.id))}>
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
                                    General Information for {review.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="slug">ID</FieldLabel>
                                    <Input id="slug" type="text" placeholder="Slug..." disabled value={review.id} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="title">Rating</FieldLabel>
                                    <Input id="title" type="text" placeholder="Title..." disabled value={review.rating} />
                                </Field>
                            </CardContent>
                        </Card>
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    General Information for {review.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="created_at">Created Date</FieldLabel>
                                    {String(review.created_at) ?? '-'}
                                    {/* <Input id="created_at" type="date" placeholder="Release Date..." disabled value={review.release_date ? review.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="updated_at">Updated Date</FieldLabel>
                                    {String(review.updated_at) ?? '-'}
                                    {/* <Input id="updated_at" type="date" placeholder="Release Date..." disabled value={review.release_date ? review.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deleted_at">Deleted Date</FieldLabel>
                                    {review.deleted_at ? String(review.deleted_at) : '-'}
                                    {/* <Input id="deleted_at" type="date" placeholder="Release Date..." disabled value={review.release_date ? review.release_date : ""} /> */}
                                </Field>
                            </CardContent>
                        </Card>

                    </div>
                    {review.product ? (
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

ReviewsView.layout = {
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
        {
            title: 'View',
            href: '#',
        },
    ],
};
