import type { Cart as CartType } from "@/types"
import { Link } from "@inertiajs/react"
import { ArrowRight, ShoppingBag, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from "@/components/custom/cart/cart"

export default function Cart({ cart }: { cart: CartType | null }) {
    const items = cart?.items ?? []
    const totalItems = items.reduce((total, item) => total + item.quantity,0)
    const subtotal = items.reduce((total, item) => {
        const price = Number(item.product?.price ?? 0)
        return total + price * item.quantity
    }, 0)
    const shipping = subtotal > 0 ? 0 : 0
    const total = subtotal + shipping
    if (items.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
                        <ShoppingBag className="size-9 text-muted-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Your cart is empty
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Looks like you haven't added any books to your cart yet.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/products">
                            Continue shopping
                            <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <p className="text-sm font-medium text-muted-foreground">
                    Shopping Cart
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
                    Your cart
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    {totalItems} {totalItems === 1 ? "item" : "items"} in your
                    cart
                </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* Cart items */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                {/* Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Order summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>
                                        {subtotal.toFixed(2)}€
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span className="font-medium text-green-600">
                                        Free
                                    </span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">
                                    Total
                                </span>
                                <span className="text-xl font-bold">
                                    {total.toFixed(2)}€
                                </span>
                            </div>
                            <div className="py-1">
                                <Link href="/cart/checkout">
                                    <Button className="w-full" size="lg">
                                        <span className="flex items-center">
                                            Proceed to checkout
                                            <ArrowRight className="ml-2 size-4" />
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link href="/products">
                                    <Button variant="outline" className="w-full">
                                        Continue shopping
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                <Tag className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <div className="text-xs text-muted-foreground">
                                    <p className="font-medium text-foreground">
                                        Have a discount code?
                                    </p>
                                    <p className="mt-1">
                                        You can apply your promo code during
                                        checkout.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    )
}