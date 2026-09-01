"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type ProductSort =
    | "rating"
    | "newest"
    | "oldest"
    | "best_selling"
    | "price_asc"
    | "price_desc"

interface ProductSortProps {
    value: ProductSort
    onChange: (value: ProductSort) => void
}

export function ProductSort({
    value,
    onChange,
}: ProductSortProps) {
    return (
        <Select
            value={value}
            onValueChange={(value) =>
                onChange(value as ProductSort)
            }
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="rating">
                    Rating
                </SelectItem>

                <SelectItem value="newest">
                    Newest
                </SelectItem>

                <SelectItem value="oldest">
                    Oldest
                </SelectItem>

                <SelectItem value="best_selling">
                    Best selling
                </SelectItem>

                <SelectItem value="price_asc">
                    Price: Low → High
                </SelectItem>

                <SelectItem value="price_desc">
                    Price: High → Low
                </SelectItem>
            </SelectContent>
        </Select>
    )
}