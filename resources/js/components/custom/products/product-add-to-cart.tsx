"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"
import { cartAdd } from "@/routes"
import { Check, ShoppingBag, Plus, Minus, Loader2 } from "lucide-react"
import { Product } from "@/types"
export function ProductQuickAddCard({ product, quantity, added, setAdded }: { product: Product, quantity: number, added: boolean, setAdded: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState(false)
    const handleAddToCart = () => {
        if (added) { return } setAdded(true)
        // TODO:
        // addToCart(product)
        setTimeout(() => { setAdded(false) }, 1800)
        if (loading) return

        setLoading(true)

        router.post(cartAdd(),
            {
                product_id: product.id, quantity,
            },
            {
                preserveScroll: true,
                onSuccess: () => { setAdded(true); setTimeout(() => { setAdded(false) }, 1500) },
                onError: (errors) => { console.error(errors) },
                onFinish: () => { setLoading(false) },
            }
        )
    }
    return (
        <Button onClick={handleAddToCart} disabled={added} className=" w-full gap-2 shadow-lg">
            {loading ? (
                <>
                    <Loader2 className="size-4 animate-spin" />
                    Adding...
                </>
            ) : added ? (
                <>
                    <Check className=" size-4 animate-in zoom-in duration-200" />
                    Added to cart
                </>
            ) : (
                <>
                    <ShoppingBag className="size-4 transition-transform duration-300" />
                    Add to cart
                </>
            )}
        </Button>
    )
}

export function ProductAddCard({ product, quantity, added, setAdded }: { product: Product, quantity: number, added: boolean, setAdded: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [loading, setLoading] = useState(false)
    const handleAddToCart = () => {
        if (added) { return } setAdded(true)
        // TODO:
        // addToCart(product)
        setTimeout(() => { setAdded(false) }, 1800)
        if (loading) return

        setLoading(true)

        router.post(cartAdd(),
            {
                product_id: product.id, quantity,
            },
            {
                preserveScroll: true,
                onSuccess: () => { setAdded(true); setTimeout(() => { setAdded(false) }, 1500) },
                onError: (errors) => { console.error(errors) },
                onFinish: () => { setLoading(false) },
            }
        )
    }
    return (
        <Button size="icon" variant={added ? "default" : "outline"} onClick={handleAddToCart} disabled={added || product.stock === 0} className={` size-10 rounded-full transition-all duration-300 ${added ? "scale-110" : "hover:bg-primary hover:text-primary-foreground"}`}>
            {loading ? (
                <>
                    <Loader2 className="size-4 animate-spin" />
                    Adding...
                </>
            ) : added ? (
                <Check className=" size-4 animate-in zoom-in duration-200 " />
            ) : (
                <Plus className=" size-4 transition-transform duration-300 group-hover:rotate-90 " />
            )
            }
            <span className="sr-only">Add {product.title} to cart</span>
        </Button>
    )
}


export function ProductAddToCartView({ product, isInStock, stock, added, setAdded, quantity, setQuantity }: { product:Product, isInStock: boolean, stock: number | null, added: boolean, setAdded: React.Dispatch<React.SetStateAction<boolean>>, quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>> }) {
    const [loading, setLoading] = useState(false)
    const handleAddToCart = () => {
        if (added) { return } setAdded(true)
        // TODO:
        // addToCart(product)
        setTimeout(() => { setAdded(false) }, 1800)
        if (loading) return

        setLoading(true)

        router.post(cartAdd(),
            {
                product_id: product.id, quantity,
            },
            {
                preserveScroll: true,
                onSuccess: () => { setAdded(true); setTimeout(() => { setAdded(false) }, 1500) },
                onError: (errors) => { console.error(errors) },
                onFinish: () => { setLoading(false) },
            }
        )
    }
    return (
        <div className="mt-6 flex gap-3">
            {/* Quantity */}
            <div className="flex h-12 items-center rounded-lg border">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="size-11 rounded-none"
                >
                    <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                    {quantity}
                </span>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={!isInStock || (stock !== null && quantity >= stock)}
                    onClick={() => setQuantity((value) => value + 1)}
                    className="size-11 rounded-none"
                >
                    <Plus className="size-4" />
                </Button>
            </div>
            {/* Add to cart */}
            <Button
                type="button"
                size="lg"
                disabled={!isInStock || added}
                onClick={handleAddToCart}
                className="h-12 flex-1 gap-2"
            >
                {added ? (
                    <>
                        <Check className="size-5 animate-in zoom-in" />
                        Added to cart
                    </>
                ) : (
                    <>
                        <ShoppingBag className="size-5" />
                        Add to cart
                    </>
                )}
            </Button>
        </div>
    )
}