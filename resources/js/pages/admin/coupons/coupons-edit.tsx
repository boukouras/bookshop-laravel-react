import { Product, Category, Tag, Author, Coupon } from "@/types"
import { dashboard, adminCouponsIndex } from "@/routes"
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
export default function CouponsView({ products, coupon }: { products: Product[], coupon:Coupon }) {
    return (
        <form>
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{coupon.code}</h1>
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
                                    General Information for {coupon.code}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="code">Code</FieldLabel>
                                    <Input id="code" type="text" placeholder="Code..." disabled value={coupon.code} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="value">Value</FieldLabel>
                                    <Input id="value" type="text" placeholder="Value..." disabled value={coupon.value} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea id="description" placeholder="Description..." disabled value={coupon.description ? coupon.description : ""} />
                                </Field>
                            </CardContent>
                        </Card>
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    General Information for {coupon.code}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="created_at">Created Date</FieldLabel>
                                    {String(coupon.created_at) ?? '-'}
                                    {/* <Input id="created_at" type="date" placeholder="Release Date..." disabled value={coupon.release_date ? coupon.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="updated_at">Updated Date</FieldLabel>
                                    {String(coupon.updated_at) ?? '-'}
                                    {/* <Input id="updated_at" type="date" placeholder="Release Date..." disabled value={coupon.release_date ? coupon.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deleted_at">Deleted Date</FieldLabel>
                                    {coupon.deleted_at ? String(coupon.deleted_at) : '-'}
                                    {/* <Input id="deleted_at" type="date" placeholder="Release Date..." disabled value={coupon.release_date ? coupon.release_date : ""} /> */}
                                </Field>
                            </CardContent>
                        </Card>

                    </div>
                </section >
            </div>
        </form>
    )
}

CouponsView.layout = {
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
        {
            title: 'Edit',
            href: '#',
        },
    ],
};
