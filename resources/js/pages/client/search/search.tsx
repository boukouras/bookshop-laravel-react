import { Product } from "@/types"
import { ProductsList } from "@/components/custom/products/products-list"
export default function Search({ products }: { products: Product[] }) {
    return (
        // <ProductsList products={products} baseUrl={'/search'} />
        products.length > 0 ?
            <section className="px-10 py-10">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Search
                        </h2>
                    </div>
                </div>
                <ProductsList products={products} baseUrl={null} />
            </section>
            : ('No Product found')
    )
}