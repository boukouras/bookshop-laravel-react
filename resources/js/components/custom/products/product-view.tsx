"use client"
import { useMemo, useState } from "react"
import { Check, ChevronRight, Heart, Minus, Plus, ShoppingBag, Star, } from "lucide-react"
import type { Category, Publisher, Author, Product } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Fragment } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Separator,
} from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ProductWish } from "./product-wish"
import { ProductAddToCartView } from "./product-add-to-cart"
import { Link } from "@inertiajs/react"
import { Image } from "../image"
import { authors } from "@/actions/App/Http/Controllers/ClientController"
export function ProductDetailsView({ product }: { product: Product }) {
    return (
        <>
            {
                product.isbn && (
                    <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                        <span className="text-muted-foreground">
                            ISBN
                        </span>

                        <span className="font-medium">
                            {product.isbn}
                        </span>
                    </div>
                )
            }
            {
                product.pages && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Pages
                            </span>
                            <span className="font-medium">
                                {product.pages}
                            </span>
                        </div>
                    </>
                )
            }
            {
                product.authors && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Author{product.authors.length > 1 && 's'}
                            </span>
                            <span className="font-medium">
                                {product.authors.map((author, index) => (
                                    <Fragment key={author.id}>
                                        <Link href={`/authors/${author.slug}`}>
                                            {author.name}
                                        </Link>
                                        {product.authors && (
                                            index < product.authors.length - 1 && ", "
                                        )}
                                    </Fragment>
                                ))}
                            </span>
                        </div>
                    </>
                )
            }
            {
                product.publishers &&
                product.publishers.length >
                0 && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Publisher
                            </span>
                            <span className="font-medium">
                                {product.publishers.map((publisher, index) => (
                                    <Fragment key={publisher.id}>
                                        <Link href={`/publishers/${publisher.slug}`}>
                                            {publisher.name}
                                        </Link>
                                        {product.publishers && (
                                            index < product.publishers.length - 1 && ", "
                                        )}
                                    </Fragment>
                                ))}
                            </span>
                        </div>
                    </>
                )
            }
            {
                product.languages &&
                product.languages.length > 0 && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Language
                            </span>
                            <span className="font-medium">
                                {product.languages.map((language) => language.name).join(", ")}
                            </span>
                        </div>
                    </>
                )
            }
            {
                product.tags &&
                product.tags.length > 0 && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Tags
                            </span>
                            <span className="font-medium">
                                {product.tags.map((tag, index) => (
                                    <Fragment key={tag.id}>
                                        <Link href={`/tags/${tag.slug}`}>
                                            {tag.name}
                                        </Link>
                                        {product.tags && (
                                            index < product.tags.length - 1 && ", "
                                        )}
                                    </Fragment>
                                ))}
                            </span>
                        </div>
                    </>
                )
            }
            {
                product.release_date && (
                    <>
                        <Separator />
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                            <span className="text-muted-foreground">
                                Release date
                            </span>
                            <span className="font-medium">
                                {new Date(product.release_date).toLocaleDateString("en-GB")}
                            </span>
                        </div>
                    </>
                )
            }
        </>
    )
}
export function ProductView({
    product,
    type,
    parent,
}: { product: Product, type?: "products" | "categories" | "authors" | "publishers", parent?: Category | Publisher | Author }) {
    const [quantity, setQuantity] = useState(1)
    const [liked, setLiked] = useState(false)
    const [added, setAdded] = useState(false)
    const averageRating = useMemo(() => {
        const reviews = product.reviews ?? []

        if (reviews.length === 0) { return 0 }
        return (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length)
    }, [product.reviews])

    const hasDiscount = product.discount_type !== null && product.discount_value !== null && Number(product.discount_value) > 0
    const finalPrice = useMemo(() => {
        if (!hasDiscount) { return Number(product.price) }
        if (product.discount_type === "percentage") {
            return (Number(product.price) - (Number(product.price) * Number(product.discount_value)) / 100)
        }
        return (Number(product.price) - Number(product.discount_value))
    }, [product.price, product.discount_type, product.discount_value, hasDiscount,
    ])

    const isInStock = product.stock !== null && product.stock > 0

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:py-12">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link href={'/'}>
                    <span className="cursor-pointer hover:text-foreground">
                        Home
                    </span>
                </Link>
                <ChevronRight className="size-4" />
                {type && (
                    <>
                        <Link href={`/${type}`}>
                            <span className="cursor-pointer hover:text-foreground">
                                {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                            </span>
                        </Link>
                        <ChevronRight className="size-4" />
                    </>
                )}
                {parent && (
                    <>
                        <Link href={`/${type}/${parent.slug}`}>
                            <span className="cursor-pointer hover:text-foreground">
                                {parent.name}
                            </span>
                        </Link>
                        <ChevronRight className="size-4" />
                    </>
                )}
                <span className="line-clamp-1 text-foreground">
                    {product.title}
                </span>
            </div>
            {/* Main product section */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:gap-16">
                {/* Product image */}
                <div className="relative">
                    <div className="sticky top-8">
                        <div className="relative mx-auto flex aspect-[4/5] max-w-xl items-center justify-center overflow-hidden rounded-2xl bg-muted/40 p-8 md:p-12">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-muted),transparent_65%)] opacity-60" />
                            <Image src={product.images && product.images.length > 0 ? `http://localhost:8000/${product.images[0].image_url}` : "/storage/images/products/default.jpg"} alt={product.title} className={"relative z-10 h-full w-full object-cover drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"} />
                            {/* Discount */}
                            {hasDiscount && (
                                <Badge className="absolute left-5 top-5 z-20 rounded-full px-3 py-1.5">
                                    {product.discount_type === "percentage" ? `- ${product.discount_value}% ` : `- ${Number(product.discount_value).toFixed(2)}€`}
                                </Badge>
                            )}
                            {/* Wishlist */}
                            <ProductWish product={product} liked={liked} setLiked={setLiked} />
                        </div>
                        {/* Thumbnail images */}
                        {product.images &&
                            product.images.length > 0 && (
                                <div className="mt-4 flex gap-3 overflow-x-auto">
                                    {product.images.map(
                                        (image) => (
                                            <Button
                                                key={image.id}
                                                type="button"
                                                className="size-20 shrink-0 overflow-hidden rounded-lg border bg-muted transition hover:border-primary"
                                            >
                                                <Image src={image.image_url} alt={product.title} className="h-full w-full object-cover" />
                                            </Button>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                </div>
                {/* Product information */}
                <div className="flex flex-col">
                    {/* Tags */}
                    {product.tags &&
                        product.tags.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {product.tags.slice(0, 4).map((tag) => (
                                    <Link key={tag.id} href={`/tags/${tag.slug}`}>
                                        <Badge variant="secondary" className="rounded-full">
                                            {tag.name}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        )}
                    {/* Title */}
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                        {product.title}
                    </h1>
                    {/* Author */}
                    {product.authors &&
                        product.authors.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-base">
                                <span className="text-muted-foreground">
                                    by
                                </span>
                                {product.authors.map(
                                    (author, index) => (
                                        <Link key={author.id} href={`/authors/${author.slug}`}>
                                            <span className="font-medium">
                                                {author.name}
                                                {index < product.authors!.length - 1 && ", "}
                                            </span>
                                        </Link>
                                    )
                                )}
                            </div>
                        )}
                    {/* Rating */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(
                                (star) => (
                                    <Star key={star} className={`size - 4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} `} />
                                )
                            )}
                        </div>
                        <span className="text-sm font-medium">
                            {averageRating > 0 ? averageRating.toFixed(1) : "No rating"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            ({product.reviews?.length ?? 0}{" "}reviews)
                        </span>
                    </div>
                    <Separator className="my-6" />
                    {/* Price */}
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold tracking-tight">
                            {finalPrice.toFixed(2)}€
                        </span>
                        {hasDiscount && (
                            <span className="pb-1 text-lg text-muted-foreground line-through">
                                {Number(product.price).toFixed(2)}€
                            </span>
                        )}
                    </div>
                    {/* Description */}
                    {product.description && (
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                            {product.description}
                        </p>
                    )}
                    {/* Availability */}
                    <div className="mt-6 flex items-center gap-2">
                        <span className={`size - 2.5 rounded - full ${isInStock ? "bg-green-500" : "bg-red-500"} `} />
                        <span className={`text - sm font - medium ${isInStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} `}>
                            {isInStock ? product.stock && product.stock < 10 ? `Only ${product.stock} left in stock` : "In stock" : "Out of stock"}
                        </span>
                    </div>
                    {/* Cart */}
                    <ProductAddToCartView product={product} isInStock={isInStock} stock={product.stock} added={added} setAdded={setAdded} quantity={quantity} setQuantity={setQuantity} />
                    {/* Product meta */}
                    <Card className="mt-8 overflow-hidden rounded-xl border bg-muted/20 shadow-none">
                        <CardContent className="p-0">
                            <ProductDetailsView product={product} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Details / Reviews */}
            <div className="mt-16">
                <Tabs defaultValue="description">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent px-4 pb-3 data-[state=active]:border-primary">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent px-4 pb-3 data-[state=active]:border-primary">
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent px-4 pb-3 data-[state=active]:border-primary">
                            Reviews ({product.reviews?.length ?? 0})
                        </TabsTrigger>
                    </TabsList>
                    {/* Description */}
                    <TabsContent value="description" className="max-w-4xl pt-8">
                        <div className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                            {product.description ? (
                                <p>
                                    {product.description}
                                </p>
                            ) : (
                                <p>
                                    No description available
                                    for this product.
                                </p>
                            )}
                        </div>
                    </TabsContent>
                    {/* Details */}
                    <TabsContent value="details" className="max-full pt-8">
                        <div className="divide-y rounded-xl border">
                            <ProductDetailsView product={product} />
                        </div>
                    </TabsContent>
                    {/* Reviews */}
                    <TabsContent value="reviews" className="pt-8">
                        {product.reviews &&
                            product.reviews.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {product.reviews.map(
                                    (review) => (
                                        <Card key={review.id} className="shadow-none">
                                            <CardContent className="p-5">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="font-medium">
                                                            {review.user?.name ?? "Customer"}
                                                        </p>

                                                        {review.verified_purchase && (
                                                            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                                                Verified
                                                                purchase
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5,].map(
                                                            (star) => (
                                                                <Star key={star} className={`size - 3.5 ${star <= Number(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} `} />
                                                            ))}
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                                    {review.comment}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed p-10 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No reviews yet.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}