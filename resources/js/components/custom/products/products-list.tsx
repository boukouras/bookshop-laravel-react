"use client"
import { useMemo, useState } from "react"
import type { Product } from "@/types"
import { ProductCard } from "@/components/custom/products/product-card"
import { ProductSort, type ProductSort as ProductSortValue, } from "@/components/custom/products/product-sort"
import { ProductFilterState, ProductFilters, } from "./product-filters"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

const defaultFilters: ProductFilterState = {
    categories: [],
    authors: [],
    publishers: [],
    tags: [],
    languages: [],
    priceRange: [0, 100],
    rating: null,
    availability: "all",
    discount: false,
    releaseDate: {
        from: null,
        to: null,
    },
}
export function ProductsList({
    products,
    baseUrl,
}: { products: Product[], baseUrl: string | null }) {

    /*
     * --------------------------------------------------
     * FILTER OPTIONS
     * --------------------------------------------------
     */

    const categories = useMemo(() => {
        const map = new Map()

        products.forEach((product) => {
            product.categories?.forEach((category) => {
                map.set(category.id, category)
            })
        })

        return Array.from(map.values())
    }, [products])

    const authors = useMemo(() => {
        const map = new Map()

        products.forEach((product) => {
            product.authors?.forEach((author) => {
                map.set(author.id, author)
            })
        })

        return Array.from(map.values())
    }, [products])

    const publishers = useMemo(() => {
        const map = new Map()

        products.forEach((product) => {
            product.publishers?.forEach((publisher) => {
                map.set(publisher.id, publisher)
            })
        })

        return Array.from(map.values())
    }, [products])

    const tags = useMemo(() => {
        const map = new Map()

        products.forEach((product) => {
            product.tags?.forEach((tag) => {
                map.set(tag.id, tag)
            })
        })

        return Array.from(map.values())
    }, [products])

    const languages = useMemo(() => {
        const map = new Map()

        products.forEach((product) => {
            product.languages?.forEach((language) => {
                map.set(language.id, language)
            })
        })

        return Array.from(map.values())
    }, [products])

    /*
     * --------------------------------------------------
     * PRICE RANGE
     * --------------------------------------------------
     */

    const { minPrice, maxPrice } = useMemo(() => {
        if (products.length === 0) {
            return {
                minPrice: 0,
                maxPrice: 0,
            }
        }

        const prices = products.map((product) =>
            Number(product.price)
        )

        return {
            minPrice: Math.floor(Math.min(...prices)),
            maxPrice: Math.ceil(Math.max(...prices)),
        }
    }, [products])

    /*
     * --------------------------------------------------
     * STATE
     * --------------------------------------------------
     */

    const [filters, setFilters] =
        useState<ProductFilterState>({
            ...defaultFilters,
            priceRange: [minPrice, maxPrice],
        })

    const [sort, setSort] =
        useState<ProductSortValue>("newest")

    /*
     * --------------------------------------------------
     * FILTER PRODUCTS
     * --------------------------------------------------
     */

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {

            /*
             * Category
             */

            if (
                filters.categories.length > 0 &&
                !product.categories?.some((category) =>
                    filters.categories.includes(category.id)
                )
            ) {
                return false
            }

            /*
             * Author
             */

            if (
                filters.authors.length > 0 &&
                !product.authors?.some((author) =>
                    filters.authors.includes(author.id)
                )
            ) {
                return false
            }

            /*
             * Publisher
             */

            if (
                filters.publishers.length > 0 &&
                !product.publishers?.some((publisher) =>
                    filters.publishers.includes(publisher.id)
                )
            ) {
                return false
            }

            /*
             * Tags
             */

            if (
                filters.tags.length > 0 &&
                !product.tags?.some((tag) =>
                    filters.tags.includes(tag.id)
                )
            ) {
                return false
            }

            /*
             * Languages
             */

            if (
                filters.languages.length > 0 &&
                !product.languages?.some((language) =>
                    filters.languages.includes(language.id)
                )
            ) {
                return false
            }

            /*
             * Price
             */

            const price = Number(product.price)

            if (
                price < filters.priceRange[0] ||
                price > filters.priceRange[1]
            ) {
                return false
            }

            /*
             * Rating
             */

            if (filters.rating !== null) {
                const rating = getAverageRating(product)

                if (rating < filters.rating) {
                    return false
                }
            }

            /*
             * Availability
             */

            if (filters.availability === "in_stock") {
                if (!product.stock || product.stock <= 0) {
                    return false
                }
            }

            if (filters.availability === "out_of_stock") {
                if (
                    product.stock !== null &&
                    product.stock > 0
                ) {
                    return false
                }
            }

            /*
             * Discount
             */

            if (filters.discount) {
                const hasDiscount =
                    product.discount_type !== null &&
                    product.discount_value !== null &&
                    Number(product.discount_value) > 0

                if (!hasDiscount) {
                    return false
                }
            }

            /*
             * Release date
             */

            if (filters.releaseDate.from) {
                if (!product.release_date) {
                    return false
                }

                const releaseDate =
                    new Date(product.release_date)

                const fromDate =
                    new Date(filters.releaseDate.from)

                if (releaseDate < fromDate) {
                    return false
                }
            }

            if (filters.releaseDate.to) {
                if (!product.release_date) {
                    return false
                }

                const releaseDate =
                    new Date(product.release_date)

                const toDate =
                    new Date(filters.releaseDate.to)

                if (releaseDate > toDate) {
                    return false
                }
            }

            return true
        })
    }, [products, filters])

    /*
     * --------------------------------------------------
     * SORT PRODUCTS
     * --------------------------------------------------
     */

    const sortedProducts = useMemo(() => {
        const result = [...filteredProducts]

        switch (sort) {
            case "price_asc":
                return result.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                )

            case "price_desc":
                return result.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                )

            case "newest":
                return result.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )

            case "oldest":
                return result.sort(
                    (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                )

            case "rating":
                return result.sort((a, b) => {
                    const ratingA =
                        getAverageRating(a)

                    const ratingB =
                        getAverageRating(b)

                    return ratingB - ratingA
                })

            case "best_selling":
                // TODO:
                // sales_count
                return result

            default:
                return result
        }
    }, [filteredProducts, sort])

    /*
     * --------------------------------------------------
     * RENDER
     * --------------------------------------------------
     */

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {sortedProducts.length} products
                    </p>
                </div>
            </div>

            {/* Toolbar */}

            <div className="flex items-center justify-between gap-4">
                <div>
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="capitalize">
                                    <Menu />
                                    Filters
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="left"
                                className="flex w-full flex-col sm:max-w-md"
                            >
                                <SheetHeader>
                                    <div className="flex items-center justify-between">
                                        <SheetTitle>Filters</SheetTitle>

                                        <SheetClose asChild>
                                            <Button variant="outline" size="icon">
                                                <X />
                                            </Button>
                                        </SheetClose>
                                    </div>

                                    <SheetDescription>
                                        Filter the products by category, author, publisher, price and more.
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="no-scrollbar flex-1 overflow-y-auto px-4">
                                    <ProductFilters
                                        filters={filters}
                                        onChange={setFilters}
                                        categories={categories}
                                        authors={authors}
                                        publishers={publishers}
                                        tags={tags}
                                        languages={languages}
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>


                <ProductSort value={sort} onChange={setSort} />
            </div>

            {/* Content */}

            <div className="flex gap-8">

                {/* Desktop Filters */}

                <aside className="hidden w-64 shrink-0 lg:block">
                    <ProductFilters
                        filters={filters}
                        onChange={setFilters}
                        categories={categories}
                        authors={authors}
                        publishers={publishers}
                        tags={tags}
                        languages={languages}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
                </aside>

                {/* Products */}

                <div className="min-w-0 flex-1">

                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    baseUrl={'products'}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
                            <p className="text-sm text-muted-foreground">
                                No products found.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}


/*
 * --------------------------------------------------
 * HELPERS
 * --------------------------------------------------
 */

function getAverageRating(product: Product) {
    const reviews = product.reviews ?? []
    if (reviews.length === 0) { return 0 }
    const total = reviews.reduce((sum, review) => sum + Number(review.rating), 0)
    return total / reviews.length
}