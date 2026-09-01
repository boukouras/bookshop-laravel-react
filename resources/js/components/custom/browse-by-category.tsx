import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
interface HorizontalSliderProps {
    items: Category[];
    baseUrl?: string;
}
export function BrowseByCategory({ items, baseUrl = "", }: HorizontalSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);
    function checkScroll() {
        const element = sliderRef.current;
        if (!element) return;
        setHasScroll(element.scrollWidth > element.clientWidth);
    }
    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => { window.removeEventListener("resize", checkScroll); };
    }, [items]);
    function scroll(direction: "left" | "right") {
        sliderRef.current?.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth", });
    }
    return (
        <section className="relative w-full py-20">
            <h2 className="px-10 text-xl">Browse by Category</h2>
            <div className="relative w-full py-20">
                {hasScroll && (
                    <Button size="icon" variant="outline" className="absolute left-2 top-1/2 z-10 rounded-full" onClick={() => scroll("left")}>
                        <ChevronLeft />
                    </Button>
                )}
                <div ref={sliderRef} className={`flex gap-4 overflow-x-auto scroll-smooth px-10 py-4 scrollbar-hide ${!hasScroll && `justify-between`}`}>
                    {items.map((item) => (
                        <Link key={item.id} href={`https://localhost:8000/categories/${item.slug}`} className="group relative min-w-[210px] h-[220px] shrink-0 overflow-hidden rounded-2xl border bg-card">
                            <img src={item.image ?? "/storage/images/products/default.jpg"} alt={item.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/40 p-4 text-center backdrop-blur-sm">
                                <span className="text-lg font-semibold text-white">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                {hasScroll && (
                    <Button size="icon" variant="outline" className="absolute right-2 top-1/2 z-10 rounded-full" onClick={() => scroll("right")}>
                        <ChevronRight />
                    </Button>
                )}
            </div>
        </section>
    )
}