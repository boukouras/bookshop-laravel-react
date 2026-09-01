import type { Publisher } from "@/types"
import { ProductsList } from "@/components/custom/products/products-list"
export default function Publisher({ publisher }: { publisher: Publisher }) {
    return (
        <section className="px-10 py-10">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        {publisher.name}
                    </h2>
                </div>
            </div>
            {publisher.products && publisher.products.length > 0 &&
                <ProductsList products={publisher.products} baseUrl={`products`} />
            }
        </section>
    )

}