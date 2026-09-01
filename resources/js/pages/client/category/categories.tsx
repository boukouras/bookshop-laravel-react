import { Category } from "@/types"
import { GenericCard } from "@/components/custom/generic-card"
export default function Categories({ categories }: { categories: Category[] }) {
    return (
        <section className="px-10 py-10">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        Categories
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    categories.length > 0 ? (
                        categories.map((item) => (
                            <GenericCard totalProducts={item.products?.length ?? 0} slug={item.slug} logo={item.image ?? ""} description={item.description ?? ""} name={item.name} baseUrl="categories" />
                        ))
                    ) : (
                        'Theres no Category'
                    )
                }
            </div>
        </section>
    )

}