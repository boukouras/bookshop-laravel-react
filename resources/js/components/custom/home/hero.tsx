import { Product } from "@/types";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { ProductCard } from "../products/product-card";
import { HeroCarousel } from "./hero-carousel";
export function Hero({ products }: { products: Product[] }) {
    return (
        <section className="flex w-full items-center justify-center">
            <div className="w-full">
                <div className='relative overflow-hidden'>
                    <div className='relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-16 lg:py-20 xl:flex-row xl:items-start'>
                        {/* Left Content */}
                        <div className='mx-auto max-w-xl text-center lg:mx-0 xl:text-left'>
                            <div className='border-primary/20 bg-primary/5 text-primary inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm'>
                                Freatured Bookes {new Date().getFullYear()}
                            </div>
                            <h1 className='text-foreground mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl'>
                                Experience the Future of{' '}
                                <span className='from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent'>
                                    Fantasy
                                </span>
                            </h1>
                            <p className='text-muted-foreground mt-8 text-lg'>
                                Discover premium quality products designed for your everyday life. Experience the perfect blend of style,
                                comfort, and innovation with our exclusive collection.
                            </p>
                            <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start'>
                                <Button size='lg' className='group relative cursor-pointer overflow-hidden px-8 py-6 text-base font-medium'>
                                    <span className='relative z-10 flex items-center gap-2'>
                                        Shop Now
                                        <ArrowRight className='transition-transform group-hover:translate-x-1' />
                                    </span>
                                    <span className='bg-primary/5 absolute inset-0 -z-0 opacity-0 transition-opacity group-hover:opacity-100'></span>
                                </Button>
                                <Button
                                    variant='outline'
                                    size='lg'
                                    className='group relative cursor-pointer overflow-hidden px-8 py-6 text-base font-medium'
                                >
                                    <span className='relative z-10 flex items-center gap-2'>
                                        <ShoppingBag />
                                        View Offers
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Right Content - Product Showcase */}
                        <div className='w-full max-w-2xl lg:mt-0'>
                            <div className='px-5'>
                                {/* {products.map(product => (
                                    <ProductCard product={product} baseUrl={`categories/${'fantasy'}`} />
                                ))} */}
                                
                                <HeroCarousel featureds={products} />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className='bg-primary/10 absolute -top-32 -right-32 size-96 rounded-full blur-3xl' />
                    <div className='bg-secondary/30 absolute -bottom-32 -left-32 size-96 rounded-full blur-3xl' />
                </div>
            </div>
        </section>
    )
}