import { Product, Category, Tag, Author, User } from "@/types"
import { ProductReviews } from "@/components/dashboard/products/product-reviews"
import { dashboard, adminCustomersIndex, adminCustomersEdit } from "@/routes"
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
export default function CustomersView({ product, customer }: { product: Product, customer: User }) {
    return (
        <>
            <div className="space-y-6 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{customer.name}</h1>
                    <Button onClick={() => router.visit(adminCustomersEdit(customer.id))}>
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
                                    General Information for {customer.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input id="name" type="text" placeholder="Name..." disabled value={customer.name} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" type="text" placeholder="Email..." disabled value={customer.email} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="Ttlephone">Telephone</FieldLabel>
                                    <Textarea id="telephone" placeholder="Telephone..." disabled value={customer.email} />
                                </Field>
                            </CardContent>
                        </Card>
                        <Card size="sm" className="mx-10 w-full">
                            <CardHeader>
                                <CardTitle>Customer Details</CardTitle>
                                <CardDescription>
                                    General Information for {customer.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="created_at">Created Date</FieldLabel>
                                    {String(customer.created_at) ?? '-'}
                                    {/* <Input id="created_at" type="date" placeholder="Release Date..." disabled value={customer.release_date ? customer.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="updated_at">Updated Date</FieldLabel>
                                    {String(customer.updated_at) ?? '-'}
                                    {/* <Input id="updated_at" type="date" placeholder="Release Date..." disabled value={customer.release_date ? customer.release_date : ""} /> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="deleted_at">Deleted Date</FieldLabel>
                                    {customer.deleted_at ? String(customer.deleted_at) : '-'}
                                    {/* <Input id="deleted_at" type="date" placeholder="Release Date..." disabled value={customer.release_date ? customer.release_date : ""} /> */}
                                </Field>
                            </CardContent>
                        </Card>

                    </div>
                </section >
            </div>
        </>
    )
}

CustomersView.layout = {
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
        {
            title: 'View',
            href: '#',
        },
    ],
};
