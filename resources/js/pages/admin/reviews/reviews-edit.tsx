import { Product, Category, Tag, Author, Review } from "@/types"
import { dashboard, adminReviewsIndex } from "@/routes"
import { Plus } from "lucide-react"
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
import { router } from "@inertiajs/react"
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
export default function ReviewsView({ products, review }: { products: Product[], review:Review }) {
    return (
        <form>
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{review.id}</h1>
                    <Button onClick={() => router.visit('#')}>
                        <Plus className="mr-2" />
                        Save
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
                                    <FieldLabel htmlFor="id">ID</FieldLabel>
                                    <Input id="id" type="text" placeholder="ID..." value={review.id} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="rating">Rating</FieldLabel>
                                    <Input id="rating" type="number" placeholder="Rating..." value={review.rating} />
                                </Field>
                            </CardContent>
                        </Card>
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>Review Details</CardTitle>
                                <CardDescription>
                                    General Information for {review.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="created_at">Created Date</FieldLabel>
                                    {String(review.created_at) ?? '-'}
                                    {/* <Input id="created_at" type="date" placeholder="Release Date..." value={review.release_date ? review.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="updated_at">Updated Date</FieldLabel>
                                    {String(review.updated_at) ?? '-'}
                                    {/* <Input id="updated_at" type="date" placeholder="Release Date..." value={review.release_date ? review.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deleted_at">Deleted Date</FieldLabel>
                                    {review.deleted_at ? String(review.deleted_at) : '-'}
                                    {/* <Input id="deleted_at" type="date" placeholder="Release Date..." value={review.release_date ? review.release_date : ""} /> */}
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
        </form>
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
            title: 'Edit',
            href: '#',
        },
    ],
};
