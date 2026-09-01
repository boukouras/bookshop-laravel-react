import { MessageCircle, Rocket, ShieldCheck, RefreshCw } from "lucide-react";

export function HomeDetail() {
    const list = [
        {
            name: "Free Shipping",
            description: "For all order $200",
            icon: Rocket
        },
        {
            name: "1 & 1 Returns",
            description: "Cancellation after 1 day",
            icon: RefreshCw
        },
        {
            name: "100% Secure Payments",
            description: "Gurantee secure payments",
            icon: ShieldCheck
        },
        {
            name: "24/7 Dedicated Support",
            description: "Anywhere & anytime",
            icon: MessageCircle
        },

    ]
    return (
        <section className="overflow-hidden pb-10">
            <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
                    {list.map((item) => (
                        <div key={item.name} className="flex items-center gap-4">
                            <item.icon className="size-10" />
                            <div>
                                <h3 className="font-medium text-lg text-dark">{item.name}</h3>
                                <p className="text-sm text-primary/70">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}