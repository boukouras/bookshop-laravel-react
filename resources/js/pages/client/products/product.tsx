import type { Author, Category, Product, Publisher } from "@/types"
import { ProductView } from "@/components/custom/products/product-view"
export default function Product({product, type, parent}:{product:Product, type?: "products" | "categories" | "authors" | "publishers", parent?: Category | Publisher | Author}){
    return(
        <ProductView product={product} type={type && type} parent={parent && parent}  />
    )
}