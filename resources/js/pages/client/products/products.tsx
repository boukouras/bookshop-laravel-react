import { ProductsList } from "@/components/custom/products/products-list";
import { Product } from "@/types";

export default function Products({ products}: { products: Product[] }) {
    return (
        <section className="px-10 py-10">
            {products && (
                <ProductsList products={products} baseUrl={`products`} />
            )}
        </section>
    )
}