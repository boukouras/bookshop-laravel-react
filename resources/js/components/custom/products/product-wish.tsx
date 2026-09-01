import { Button } from "@/components/ui/button"
import { ArrowBigUpDash, Heart, LogIn } from "lucide-react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Link, router, usePage } from "@inertiajs/react"
import { cartAdd, wishlistDelete, wishlistStore } from "@/routes"
import { Product } from "@/types"

export function ProductWish({ product, liked, setLiked }: { product:Product, liked: boolean, setLiked: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { auth } = usePage().props
    const handleWishlist = () => {
        if(!auth.user){return}
        if(liked){
            router.delete(wishlistDelete(product.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setLiked(false)
                }
            })
            return
        }
        router.post(wishlistStore(product.id),
            {},
        {
            preserveScroll: true,
            onSuccess: () => {
                setLiked(true)
            }
        })
    }
    return (
        !auth.user ? (
            <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute right-5 top-5 z-20 size-11 rounded-full shadow-md backdrop-blur"
                    >
                        <Heart className={`size-5 transition-all`} />
                        <span className="sr-only">
                            Add to wishlist
                        </span>
                    </Button >
                </HoverCardTrigger>
                <HoverCardContent className="flex w-64 flex-col gap-0.5">
                    <div className="font-semibold">No User</div>
                    <div className="mt-1 text-xs text-muted-foreground">You have to login to add this product as wish.</div>
                    <div className="font-semibold">
                        <Link href={'/login'} className="flex items-center gap-1">Login <LogIn/></Link>
                    </div>
                </HoverCardContent>
            </HoverCard>
        ) : (
            <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={handleWishlist}
                className="absolute right-5 top-5 z-20 size-11 rounded-full shadow-md backdrop-blur"
            >
                <Heart className={`size-5 transition-all ${liked ? "scale-110 fill-red-500 text-red-500" : ""} `} />
                <span className="sr-only">
                    Add to wishlist
                </span>
            </Button >
        )
    )
}