"use client"
import * as React from "react"
import { Product } from "@/types";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ProductCard } from "../products/product-card";

export function HeroCarousel({ featureds }: { featureds: Product[] }) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(featureds.length)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div>
            <div className="flex items-center justify-center">
                <Carousel className="w-full" setApi={setApi}>
                    <CarouselContent>
                        {featureds.map((featured) => (
                            <CarouselItem key={featured.slug} className="basis-1/2">
                                <div className="p-1">
                                    <ProductCard product={featured} baseUrl="#" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <span className="flex items-center justify-center">{current} of {count}</span>
        </div>
    )
}

