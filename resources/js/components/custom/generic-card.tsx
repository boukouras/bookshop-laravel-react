import { Card, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "@inertiajs/react"
import { Image } from "./image"
export function GenericCard({ logo, slug, name, description, totalProducts, baseUrl }: { logo:string, slug:string, name:string, description:string, totalProducts: number, baseUrl: string }) {
    return (
        <Card className=" group mx-auto w-full max-w-sm overflow-hidden border-border/60 bg-background py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src={`http://localhost:8000/${logo}`} alt={name} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                {/* Gradient */}
                <div className=" pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10 " />
            </div>
            {/* ===================================================== CONTENT ====================================================== */}
            <CardContent className="space-y-4 px-5 pt-5">
                <Link href={`/${baseUrl}/${slug}`} className="space-y-1">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <h3 className="line-clamp-1 text-base font-semibold tracking-tight">
                            {name}
                        </h3>
                        {description && (
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        )
                        }
                    </div>
                </Link>
                <Separator />
            </CardContent>
            {/* ===================================================== FOOTER ====================================================== */}
            <CardFooter className="px-5 pb-5 pt-0">{totalProducts && totalProducts > 0 &&
                <p className="text-xs font-medium text-destructive">{totalProducts} Books</p>
            }
            </CardFooter>
        </Card>
    )
}