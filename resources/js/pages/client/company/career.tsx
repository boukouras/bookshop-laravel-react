export default function Career() {
    return (
        <section className="py-10 px-10">
            <div className="relative bg-background">
                <div className="container border-x border-y bg-background py-14 lg:py-20 px-10">
                    <div className="flex max-w-3xl flex-col gap-3">
                        <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase size-3" aria-hidden="true">
                                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                            </svg>
                            <span>Open roles</span>
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Join the team</h2>
                    </div>
                    <div className="mt-10 divide-y divide-border/60 rounded-sm border border-border/60">
                        <div className="flex flex-col gap-4 bg-background p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div className="flex min-w-0 flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold text-foreground md:text-lg">Template Designer Engineer</h3>
                                    <span data-slot="badge" data-variant="secondary" className="h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&amp;&gt;svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80 text-[10px] uppercase">Contract</span>
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">Design and create new templates</p>
                                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin size-3.5 shrink-0" aria-hidden="true">
                                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    Remote
                                </p>
                            </div>
                            <a href="#" data-slot="button" data-variant="outline" data-size="sm" className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&amp;_svg:not([className*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 outline-none group/button select-none border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 shrink-0">
                                Apply
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right size-4" aria-hidden="true">
                                    <path d="M7 7h10v10"></path>
                                    <path d="M7 17 17 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-muted-foreground">Don’t see a fit? Email <a href="#" className="font-medium text-foreground underline decoration-dotted underline-offset-4">jobs@acme.com</a> with your portfolio and what you’d like to work on.</p>
                </div>
            </div>
        </section>
    )
}