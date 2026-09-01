import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Category } from "@/types";
import { Link } from "@inertiajs/react";
export function CategoryDropdown({categories}:{categories:Category[]}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex">
                    <Menu />
                    Categories
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {categories.length > 0 && categories.map((category) => (
                    <DropdownMenuItem key={category.slug}>
                        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}