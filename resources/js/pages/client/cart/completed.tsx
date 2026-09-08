import { Link } from '@inertiajs/react'
import { ArrowRight, CheckCircle2, CreditCard, Mail, MapPin, Package, Phone, ReceiptText, ShoppingBag, Truck, User, WalletCards } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Order } from '@/types'
import { Image } from '@/components/custom/image'
import { Badge } from '@/components/ui/badge'
export default function Completed({ order }: { order: Order }) {
    const shippingAddress = order.addresses?.find(
        (address) => address.type === 'shipping'
    )

    const billingAddress = order.addresses?.find(
        (address) => address.type === 'billing'
    )
    console.log(order)
    const formatPrice = (value: number) => { return new Intl.NumberFormat('el-GR', { style: 'currency', currency: order.currency ?? 'EUR', }).format(Number(value)) }
    return (
        <section className="min-h-svh bg-muted/30">
            <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-12 sm:px-6 lg:px-8">
                {/* Success */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="size-9 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Order completed!
                    </h1>
                    <p className="mt-3 max-w-lg text-muted-foreground">
                        Thank you for your purchase. Your order has been
                        successfully placed.
                    </p>
                    <div className="mt-4 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                        Order #{order.id}
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main order */}
                    {order.items && order.items.length > 0 && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>
                                    Here are the details of your order.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                {/* Items */}
                                <div className="flex flex-col gap-4">
                                    {order.items.map((item) => (
                                        <Link key={item.id} href={`/products/${item.product?.slug}`}>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                        <Image src={item.product && item.product.images && item.product.images[0].image_url} alt={item.product?.title} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-medium">
                                                            {item.product_name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.quantity} ×{' '}
                                                            {formatPrice(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="shrink-0 font-medium">
                                                    {formatPrice(item.amount)}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Separator />
                                {/* Totals */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>
                                        <span>
                                            {formatPrice(order.subtotal_amount,)}
                                        </span>
                                    </div>
                                    {Number(order.discount_amount) > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span>
                                                - {formatPrice(order.discount_amount,)}
                                            </span>
                                        </div>
                                    )}
                                    {Number(order.shipping_amount) > 0 ? (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Shipping
                                            </span>
                                            <span>
                                                {formatPrice(order.shipping_amount,)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Shipping
                                            </span>
                                            <span className="font-medium text-green-600">
                                                Free
                                            </span>
                                        </div>
                                    )}
                                    {order.payments && order.payments[0] && order.payments[0].payment_method && (
                                        Number(order.payments[0].payment_method.cost > 0) ? (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Cost of Payment
                                                </span>
                                                <span>
                                                    {formatPrice(order.payments[0].payment_method.cost,)}
                                                </span>
                                            </div>
                                        )
                                            : (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Cost of Payment
                                                    </span>
                                                    <span className="font-medium text-green-600">
                                                        Free
                                                    </span>
                                                </div>
                                            )
                                    )}
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {formatPrice(order.amount)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {/* Information */}
                    <div className="flex flex-col gap-6">
                        {order.info && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Customer Information
                                    </CardTitle>
                                    <CardDescription>
                                        Contact details associated with this order.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <User className="size-4 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    First Name
                                                </p>
                                                <p className="truncate text-sm font-medium">
                                                    {order.info.fname ?? '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <User className="size-4 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Last Name
                                                </p>
                                                <p className="truncate text-sm font-medium">
                                                    {order.info.lname ?? '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <Mail className="size-4 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Email
                                                </p>
                                                <p className="truncate text-sm font-medium">
                                                    {order.info.email ?? '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <Phone className="size-4 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Phone
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {order.info.phone ?? '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Order Information
                                </CardTitle>
                                <CardDescription>
                                    Shipping, payment and delivery details.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-5">
                                {/* Shipping Method */}
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                        <Truck className="size-4 text-muted-foreground" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">
                                            Shipping Method
                                        </p>
                                        <p className="text-sm font-medium">
                                            {order.shipping_method?.name ?? '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                        <CreditCard className="size-4 text-muted-foreground" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">
                                            Payment Method
                                        </p>
                                        <p className="text-sm font-medium">
                                            {order.payments?.[0]?.payment_method?.name ?? '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                        <WalletCards className="size-4 text-muted-foreground" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">
                                            Payment Status
                                        </p>

                                        <div className="mt-1">
                                            <Badge
                                                variant={
                                                    order.payments?.[0]?.status === 'paid'
                                                        ? 'default'
                                                        : order.payments?.[0]?.status === 'failed'
                                                            ? 'destructive'
                                                            : 'secondary'
                                                }
                                                className="capitalize"
                                            >
                                                {order.payments?.[0]?.status ?? 'Unknown'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipment Status */}
                                {order.shipments && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <Package className="size-4 text-muted-foreground" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-muted-foreground">
                                                Shipment Status
                                            </p>

                                            <div className="mt-1">
                                                {order.shipments.map((shipment) => (
                                                    <Badge
                                                        key={shipment.id}
                                                        variant={
                                                            shipment.status === 'delivered'
                                                                ? 'default'
                                                                : shipment.status === 'failed'
                                                                    ? 'destructive'
                                                                    : 'secondary'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {shipment.status ?? 'Pending'}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Addresses
                                </CardTitle>
                                <CardDescription>
                                    Billing and shipping addresses for this order.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="grid gap-8 sm:grid-cols-2">
                                {/* Shipping Address */}
                                {shippingAddress && (
                                    <div>
                                        <div className="mb-5 flex items-center gap-2">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                                                <MapPin className="size-4 text-muted-foreground" />
                                            </div>

                                            <h3 className="text-sm font-semibold">
                                                Shipping Address
                                            </h3>
                                        </div>

                                        <div className="grid gap-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Street
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {shippingAddress?.address ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Number
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {shippingAddress?.number ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    City
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {shippingAddress?.city ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Postal Code
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {shippingAddress?.postal_code ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Country
                                                </p>
                                                <p className="text-sm font-medium uppercase">
                                                    {shippingAddress?.country ?? '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Billing Address */}
                                {billingAddress && (
                                    <div>
                                        <div className="mb-5 flex items-center gap-2">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                                                <ReceiptText className="size-4 text-muted-foreground" />
                                            </div>

                                            <h3 className="text-sm font-semibold">
                                                Billing Address
                                            </h3>
                                        </div>

                                        <div className="grid gap-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Street
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {billingAddress?.address ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Number
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {billingAddress?.number ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    City
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {billingAddress?.city ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Postal Code
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {billingAddress?.postal_code ?? '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Country
                                                </p>
                                                <p className="text-sm font-medium uppercase">
                                                    {billingAddress?.country ?? '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col gap-3 pt-6">
                                <Button asChild className="w-full">
                                    <Link href="/products">
                                        Continue Shopping
                                        <ArrowRight data-icon="inline-end" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/orders/${order.id}`}>
                                        View Order
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* Bottom */}
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <ShoppingBag className="size-4" />
                    <span>Thank you for shopping with us.</span>
                </div>
            </div>
        </section>
    )
}