import type { Category, Product } from "@/types"
import { ProductsList } from "@/components/custom/products/products-list";
export default function Category({ category }: { category: Category }) {
    const products: Product[] | null = category.products ?? null;
    return (
        <section className="px-10 py-10">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        {category.name}
                    </h2>
                </div>
            </div>
            {products && (
                <ProductsList products={products} baseUrl={`products`} />
            )}
        </section>
    )
}