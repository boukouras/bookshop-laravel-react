"use client"

import { useState } from "react"
import {
    Check,
    Heart,
    Plus,
    ShoppingBag,
    Star,
} from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import { useMemo } from "react"
import { Link } from "@inertiajs/react"
import { ProductWish } from "./product-wish"
import { ProductQuickAddCard, ProductAddCard } from "./product-add-to-cart"
import { Image } from "../image"
export function ProductCard({ product, baseUrl }: { product: Product, baseUrl: string }) {
    const [added, setAdded] = useState(false)
    const [liked, setLiked] = useState(false)

    const reviews = product.reviews ?? []
    const rating = useMemo(() => {
        if (reviews.length === 0) { return 0 }
        const total = reviews.reduce((sum, review) =>
            sum + Number(review.rating), 0)
        return total / reviews.length
    },
        [reviews])

    const price = Number(product.price)
    const discount = useMemo(() => {
        if (product.discount_type === null || product.discount_value === null) { return 0 }
        if (product.discount_type === "percentage") { return product.discount_value }
        if (product.discount_type === "fixed") {
            return price > 0 ? (product.discount_value / price) * 100 : 0
        } return 0
    }, [product.discount_type, product.discount_value, price,])

    const finalPrice = useMemo(() => {
        if (product.discount_type === null || product.discount_value === null) { return price }
        if (product.discount_type === "percentage") {
            return price - (price * product.discount_value) / 100
        }
        if (product.discount_type === "fixed") {
            return Math.max(0, price - product.discount_value)
        }
        return price
    }, [product.discount_type, product.discount_value, price,])

    const hasDiscount = finalPrice < price
    const handleWishlist = () => {
        setLiked((current) => !current)
        // TODO:
        // toggleWishlist(product)
    }

    return (
        <Card className=" group mx-auto w-full max-w-sm overflow-hidden border-border/60 bg-background py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src={product.images && product.images.length > 0 ? `http://localhost:8000/${product.images[0].image_url}` : "/storage/images/products/default.jpg"} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                {/* Gradient */}
                <div className=" pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10 " />
                {/* ================================================= TOP LEFT BADGES ================================================== */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {product.is_featured && (
                        <Badge className=" border-0 bg-primary px-2.5 py-1 text-xs font-semibold shadow-sm " > Featured </Badge>
                    )}
                    {hasDiscount && (
                        <Badge variant="destructive" className=" px-2.5 py-1 text-xs font-semibold shadow-sm " > -{Math.round(discount)}% </Badge>
                    )}
                    {product.tags?.slice(0, product.is_featured ? 1 : 2).map((tag) => (
                        <Badge key={tag.id} variant="secondary" className=" border-0 bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur " > {tag.name} </Badge>
                    ))}
                </div>
                {/* ================================================= WISHLIST ================================================== */}
                <ProductWish product={product} liked={liked} setLiked={handleWishlist} />
                {/* ================================================= RATING ================================================== */}
                <div className="absolute bottom-4 left-4">
                    <div className=" flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
                        <Star className=" size-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{rating > 0 ? rating.toFixed(1) : "New"}</span>
                        {reviews.length > 0 && (
                            <span className="text-muted-foreground">({reviews.length})</span>
                        )}
                    </div>
                </div>
                {/* ================================================= QUICK ADD ================================================== */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ProductQuickAddCard product={product} quantity={1} added={added} setAdded={setAdded} />
                </div>
            </div>
            {/* ===================================================== CONTENT ====================================================== */}
            <CardContent className="space-y-4 px-5 pt-5">
                <Link href={`/${baseUrl}/${product.slug}`} className="space-y-1">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <h3 className="line-clamp-1 text-base font-semibold tracking-tight">
                            {product.title}
                        </h3>
                        {product.description && (
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {product.description}
                            </p>
                        )
                        }
                    </div>
                    {/* ================================================= STARS ================================================== */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const filled = star <= Math.round(rating)
                                return (
                                    <Star key={star} className={`size-4 transition-colors ${filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/25"}`} />
                                )
                            }
                            )
                            }
                        </div>
                        <span className="text-xs text-muted-foreground">{reviews.length > 0 ? `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}` : "No reviews yet"}</span>
                    </div>
                </Link>
                <Separator />
                {/* ================================================= PRICE ================================================== */}
                <div className="flex items-end justify-between">
                    <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold tracking-tight">
                                {finalPrice.toFixed(2)}€
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-muted-foreground line-through">{price.toFixed(2)}€</span>)}
                        </div>
                    </div>
                    {/* ================================================= ADD BUTTON ================================================== */}
                    <ProductAddCard product={product} quantity={1} added={added} setAdded={setAdded} />
                </div>
            </CardContent>
            {/* ===================================================== FOOTER ====================================================== */}
            <CardFooter className="px-5 pb-5 pt-0">{product.stock === 0 ? (
                <p className="text-xs font-medium text-destructive">Out of stock</p>
            ) : product.stock !== null && product.stock <= 5 ? (
                <p className="text-xs font-medium text-orange-600">Only {product.stock} left in stock </p>
            ) : (
                <p className="text-xs text-muted-foreground">Free shipping on orders over 50€</p>
            )
            }
            </CardFooter>
        </Card>
    )
}