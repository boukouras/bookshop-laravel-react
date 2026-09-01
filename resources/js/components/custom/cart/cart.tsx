"use client"

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import type { Cart as CartType } from "@/types"
import { cartItemsRemove, cartItemsUpdate } from "@/routes"

export function Cart({ cart }: { cart: CartType }) {

    const items = cart?.items ?? []

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const subtotal = items.reduce(
        (total, item) => {
            const price = Number(item.product?.price ?? 0)

            return total + price * item.quantity
        },
        0
    )

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="relative"
                >
                    <ShoppingCart className="size-5" />

                    {totalItems > 0 && (
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                            {totalItems > 99 ? "99+" : totalItems}
                        </span>
                    )}

                    <span className="sr-only">
                        Open shopping cart
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-full flex-col sm:max-w-md"
            >
                <SheetHeader>
                    <SheetTitle>
                        Shopping Cart
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                            <ShoppingCart className="size-7 text-muted-foreground" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Your cart is empty
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Add some books to your cart.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto px-5">
                        <div className="flex-1 space-y-4 overflow-y-auto py-4">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>

                        <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Subtotal
                                </span>

                                <span className="font-semibold">
                                    {subtotal.toFixed(2)}€
                                </span>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

function CartItem({
    item,
}: {
    item: NonNullable<CartType["items"]>[number]
}) {
    const product = item.product

    if (!product) {
        return null
    }

    const price = Number(product.price)

    const itemTotal = price * item.quantity

    const updateQuantity = (quantity: number) => {
        if (quantity < 1) {
            removeItem()
            return
        }

        router.patch(cartItemsUpdate(item.id),
            {
                quantity,
            },
            {
                preserveScroll: true,
            }
        )
    }

    const removeItem = () => {
        router.delete(cartItemsRemove(item.id)),
        {
            preserveScroll: true,
        }
    }

    return (
        <div className="flex gap-3">
            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                    src={product.cover_image ? `/${product.cover_image}` : "/storage/images/products/default.jpg"}
                    alt={product.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h4 className="line-clamp-2 text-sm font-medium">
                            {product.title}
                        </h4>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {price.toFixed(2)}€
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeItem}
                        className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="size-4" />

                        <span className="sr-only">
                            Remove {product.title}
                        </span>
                    </Button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-md border">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-none"
                            onClick={() =>
                                updateQuantity(item.quantity - 1)
                            }
                        >
                            <Minus className="size-3.5" />
                        </Button>

                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-none"
                            onClick={() =>
                                updateQuantity(item.quantity + 1)
                            }
                        >
                            <Plus className="size-3.5" />
                        </Button>
                    </div>

                    <span className="text-sm font-semibold">
                        {itemTotal.toFixed(2)}€
                    </span>
                </div>
            </div>
        </div>
    )
}