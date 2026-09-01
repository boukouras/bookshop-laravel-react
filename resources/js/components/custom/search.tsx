import { router } from "@inertiajs/react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search } from "lucide-react"
import { search } from "@/routes"
export function SearchBar() {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        if (!query.trim()) {
            return
        }

        router.get(search(), {
            q: query,
        })
    }

    return (
        <form onSubmit={handleSearch} className="relative flex-1">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books..." className="rounded-full pr-12" />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5" />
            </Button>
        </form>
    )
}