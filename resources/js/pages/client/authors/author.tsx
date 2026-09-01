import type { Author } from "@/types"
import { ProductsList } from "@/components/custom/products/products-list"
export default function Author({ author }: { author: Author }) {
    return (
        <section className="px-10 py-10">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        {author.name}
                    </h2>
                </div>
            </div>
            {author.products && author.products.length > 0 &&
                // <AuthorProductList products={author.products} author={author} baseUrl={`authors/${author.slug}`} />
                <ProductsList products={author.products} baseUrl={`products`} />
            }
        </section>
    )

}