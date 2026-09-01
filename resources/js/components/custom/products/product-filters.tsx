"use client"

import { useMemo } from "react"
import { RotateCcw } from "lucide-react"
import type { Author, Category, Language, Publisher, Tag } from "@/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export interface ProductFilterState {
    categories: number[]
    authors: number[]
    publishers: number[]
    tags: number[]
    languages: number[]
    priceRange: [number, number]
    rating: number | null
    availability: "all" | "in_stock" | "out_of_stock"
    discount: boolean
    releaseDate: {
        from: string | null
        to: string | null
    }
}

interface ProductFiltersProps {
    filters: ProductFilterState
    onChange: (filters: ProductFilterState) => void
    categories?: Category[]
    authors?: Author[]
    publishers?: Publisher[]
    tags?: Tag[]
    languages?: Language[]
    minPrice?: number
    maxPrice?: number
}

export function ProductFilters({filters,onChange,categories = [],authors = [],publishers = [],tags = [],languages = [],minPrice = 0,maxPrice = 100,}: ProductFiltersProps) {
    const activeFilterCount = useMemo(() => {
        let count = 0
        count += filters.categories.length
        count += filters.authors.length
        count += filters.publishers.length
        count += filters.tags.length
        count += filters.languages.length
        if (filters.rating !== null) count++
        if (filters.availability !== "all") count++
        if (filters.discount) count++
        if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) {count++}
        if (filters.releaseDate.from || filters.releaseDate.to) {count++}
        return count
    }, [filters, minPrice, maxPrice])

    const toggleArrayValue = (
        key:
            | "categories"
            | "authors"
            | "publishers"
            | "tags"
            | "languages",
        value: number
    ) => {
        const current = filters[key]
        const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
        onChange({...filters,[key]: next,})
    }

    const resetFilters = () => {
        onChange({
            categories: [],
            authors: [],
            publishers: [],
            tags: [],
            languages: [],
            priceRange: [minPrice, maxPrice],
            rating: null,
            availability: "all",
            discount: false,
            releaseDate: {
                from: null,
                to: null,
            },
        })
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                            Filters
                        </h3>
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Refine your products
                    </p>
                </div>

                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 gap-1.5 text-xs"
                    >
                        <RotateCcw className="size-3.5" />
                        Reset
                    </Button>
                )}
            </div>

            <Separator />

            <Accordion
                type="multiple"
                defaultValue={["categories","price","rating","availability",]}
                className="w-full"
            >
                {/* Categories */}
                {categories.length > 0 && (
                    <AccordionItem value="categories">
                        <AccordionTrigger>
                            Category
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={filters.categories.includes(category.id)}
                                            onCheckedChange={() => toggleArrayValue("categories",category.id)}
                                        />

                                        <Label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* Authors */}
                {authors.length > 0 && (
                    <AccordionItem value="authors">
                        <AccordionTrigger>
                            Author
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="space-y-3">
                                {authors.map((author) => (
                                    <div key={author.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`author-${author.id}`}
                                            checked={filters.authors.includes(author.id)}
                                            onCheckedChange={() =>toggleArrayValue("authors",author.id)}
                                        />

                                        <Label htmlFor={`author-${author.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                                            {author.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* Publishers */}
                {publishers.length > 0 && (
                    <AccordionItem value="publishers">
                        <AccordionTrigger>
                            Publisher
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="space-y-3">
                                {publishers.map((publisher) => (
                                    <div key={publisher.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`publisher-${publisher.id}`}
                                            checked={filters.publishers.includes(publisher.id)}
                                            onCheckedChange={() =>toggleArrayValue("publishers",publisher.id)}
                                        />

                                        <Label htmlFor={`publisher-${publisher.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                                            {publisher.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                    <AccordionItem value="tags">
                        <AccordionTrigger>
                            Tags
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => {
                                    const selected = filters.tags.includes(tag.id)
                                    return (
                                        <Button
                                            key={tag.id}
                                            type="button"
                                            size="sm"
                                            variant={selected? "default": "outline"}
                                            onClick={() =>toggleArrayValue("tags",tag.id)}
                                            className="h-8 rounded-full text-xs"
                                        >
                                            {tag.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <AccordionItem value="languages">
                        <AccordionTrigger>
                            Language
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="space-y-3">
                                {languages.map((language) => (
                                    <div key={language.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`language-${language.id}`}
                                            checked={filters.languages.includes(language.id)}
                                            onCheckedChange={() => toggleArrayValue("languages",language.id)}
                                        />

                                        <Label htmlFor={`language-${language.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                                            {language.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {/* Price */}
                <AccordionItem value="price">
                    <AccordionTrigger>
                        Price
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="space-y-5 px-1">
                            <Slider
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                                value={filters.priceRange}
                                onValueChange={(value) => onChange({...filters,priceRange: [value[0],value[1],],})}
                            />

                            <div className="flex items-center justify-between text-sm">
                                <div className="rounded-md border bg-muted/40 px-3 py-1.5">
                                    {filters.priceRange[0]}€
                                </div>

                                <span className="text-muted-foreground">
                                    —
                                </span>

                                <div className="rounded-md border bg-muted/40 px-3 py-1.5">
                                    {filters.priceRange[1]}€
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Rating */}
                <AccordionItem value="rating">
                    <AccordionTrigger>
                        Rating
                    </AccordionTrigger>

                    <AccordionContent>
                        <RadioGroup
                            value={filters.rating?.toString() ??"all"}
                            onValueChange={(value) => onChange({...filters,rating:value === "all"? null: Number(value),})}
                            className="space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="all" id="rating-all" />
                                <Label htmlFor="rating-all" className="cursor-pointer text-sm font-normal">
                                    All ratings
                                </Label>
                            </div>

                            {[4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />

                                    <Label htmlFor={`rating-${rating}`} className="cursor-pointer text-sm font-normal">
                                        {rating}+ stars
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>

                {/* Availability */}
                <AccordionItem value="availability">
                    <AccordionTrigger>
                        Availability
                    </AccordionTrigger>

                    <AccordionContent>
                        <RadioGroup
                            value={filters.availability}
                            onValueChange={(value) => onChange({...filters,availability:value as ProductFilterState["availability"],})}
                            className="space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="all" id="availability-all" />
                                <Label htmlFor="availability-all" className="cursor-pointer text-sm font-normal">
                                    All products
                                </Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="in_stock" id="availability-in-stock" />
                                <Label htmlFor="availability-in-stock" className="cursor-pointer text-sm font-normal">
                                    In stock
                                </Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="out_of_stock" id="availability-out-of-stock"/>
                                <Label htmlFor="availability-out-of-stock" className="cursor-pointer text-sm font-normal">
                                    Out of stock
                                </Label>
                            </div>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>

                {/* Discount */}
                <AccordionItem value="discount">
                    <AccordionTrigger>
                        Offers
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="discount"
                                checked={filters.discount}
                                onCheckedChange={(checked) =>onChange({...filters,discount:checked === true,})}
                            />

                            <Label htmlFor="discount" className="cursor-pointer text-sm font-normal">
                                On sale
                            </Label>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Release date */}
                <AccordionItem value="release-date">
                    <AccordionTrigger>
                        Release date
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="release-from" className="text-xs text-muted-foreground">
                                    From
                                </Label>

                                <input
                                    id="release-from"
                                    type="date"
                                    value={filters.releaseDate.from ?? ""}
                                    onChange={(event) => onChange({...filters,releaseDate: {...filters.releaseDate,from:event.target.value ||null,},})}
                                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="release-to" className="text-xs text-muted-foreground">
                                    To
                                </Label>
                                <input
                                    id="release-to"
                                    type="date"
                                    value={filters.releaseDate.to ?? ""}
                                    onChange={(event) => onChange({...filters,releaseDate: {...filters.releaseDate,to:event.target.value ||null,},})}
                                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}