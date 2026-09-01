import { Button } from "@/components/ui/button"
import { ArrowBigUpDash, Heart, LogIn, ShoppingCart } from "lucide-react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Link, usePage } from "@inertiajs/react"
import { Wishlist } from "@/types"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
export function WishList({ wishList }: { wishList: Wishlist | null }) {
    const { auth } = usePage().props
    return (
        !auth.user ? (
            <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Button type="button" size="icon" variant="ghost" className="rounded-full">
                        <Heart className={`size-5 transition-all`} />
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="flex w-64 flex-col gap-0.5">
                    <div className="font-semibold">No User</div>
                    <div className="mt-1 text-xs text-muted-foreground">You have to login to add this product as wish.</div>
                    <div className="font-semibold">
                        <Link href={'/login'} className="flex items-center gap-1">Login <LogIn /></Link>
                    </div>
                </HoverCardContent>
            </HoverCard>
        ) : (
            <Sheet>
                <SheetTrigger asChild>
                    <Button type="button" size="icon" variant="ghost" className="rounded-full">
                        <Heart className={`size-5 transition-all`} />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="flex w-full flex-col sm:max-w-md"
                >
                    <SheetHeader>
                        <SheetTitle>
                            Wish List
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                            <ShoppingCart className="size-7 text-muted-foreground" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Your wish list is empty
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Add some books to your wish list.
                            </p>
                        </div>
                    </div>

                </SheetContent>
            </Sheet>
        )
    )
}