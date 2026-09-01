import { Author } from "@/types"
import { GenericCard } from "@/components/custom/generic-card"
export default function Authors({ authors }: { authors: any }) {
    const data: Author[] = authors.data
    return (
        <section className="px-10 py-10">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        Authors
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    data.length > 0 ? (
                        data.map((item) => (
                            <GenericCard totalProducts={item.products?.length ?? 0} slug={item.slug} logo={item.logo} description={item.description} name={item.name} baseUrl="authors" />
                        ))
                    ) : (
                        'Theres no Authors'
                    )
                }
            </div>
        </section>
    )

}