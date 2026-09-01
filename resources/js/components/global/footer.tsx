import { cn } from "@/lib/utils";
import AppLogo from "../app-logo";
export function Footer() {
    const defaultProps = {
        logo: <AppLogo />,
        description: "The Best Ecommerce BookStore.",
        sections: [
            {
                title: "Product",
                links: [
                    { name: "Categories", href: "/categories" },
                    { name: "Publishers", href: "/publishers" },
                    { name: "Authors", href: "/authors" },
                    { name: "Best Sellings", href: "#" },
                ],
            },
            {
                title: "Company",
                links: [
                    { name: "About", href: "/about" },
                    { name: "Team", href: "/team" },
                    { name: "Careers", href: "/career" },
                    { name: "Contact", href: "/contact" },
                ],
            },
            {
                title: "Support",
                links: [
                    { name: "Help center", href: "#" },
                    { name: "Documentation", href: "#" },
                    { name: "Status", href: "#" },
                    { name: "Community", href: "#" },
                ],
            },
            {
                title: "Legas",
                links: [
                    { name: "Terms & Conditions", href: "/terms" },
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "GDPR", href: "/gdpr" },
                    { name: "Data & Marketplace Protection", href: "/data" },
                ],
            },
        ],
        copyright: "© 2026 ACME INC. All rights reserved.",
        legalLinks: [
            { name: "Terms and Conditions", href: "#" },
            { name: "Privacy Policy", href: "#" },
        ],
    };

    const MAX_SECTIONS = 4;
    const { logo, description, sections, copyright, legalLinks } = {
        ...defaultProps,
    };
    const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

    return (
        <footer className="px-10 bg-accent py-10">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                <div className="col-span-2 mb-8 lg:mb-0">
                    <div className="flex items-center lg:justify-start">
                        <a href={'/'} className="flex items-center">
                            <AppLogo />
                        </a>
                    </div>
                    <p className="mt-4 text-sm font-medium text-muted-foreground">
                        {description}
                    </p>
                </div>
                {visibleSections.map((section: any, sectionIdx: number) => (
                    <div key={sectionIdx}>
                        <h3 className="mb-4 text-sm font-semibold tracking-tight">
                            {section.title}
                        </h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            {section.links.map((link: any, linkIdx: number) => (
                                <li
                                    key={linkIdx}
                                    className="font-medium hover:text-primary"
                                >
                                    <a href={link.href}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
                <p>{copyright}</p>
                <ul className="flex gap-4">
                    {legalLinks?.map((link: any, linkIdx: number) => (
                        <li key={linkIdx} className="underline hover:text-primary">
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}