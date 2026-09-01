import { Head } from '@inertiajs/react';
import { HomeDetail } from '@/components/custom/home/details';
import { BrowseByCategory } from '@/components/custom/browse-by-category';
import { Hero } from '@/components/custom/home/hero';
import { Category, Product } from '@/types';
export default function Welcome({featureds, categories} : {featureds:Product[], categories:Category[]}) {
    return (
        <>
            <Head title="Welcome" />
            <Hero products={featureds} />
            <HomeDetail />
            <BrowseByCategory items={categories} baseUrl='/' />
        </>
    );
}
