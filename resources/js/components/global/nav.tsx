import { Link, usePage } from '@inertiajs/react';
import { login, dashboard, settings } from '@/routes';
import { User, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { CategoryDropdown } from './category-dropdown';
import { MobileMenu } from './mobile-menu';
import { Cart } from '../custom/cart/cart';
import { WishList } from '../custom/wish/wish-list';
import { SearchBar } from '../custom/search';
export function Nav() {
    const { auth, name, categories, cart } = usePage().props as any;
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    {name ?? 'BookShop'}
                </Link>
                {/* Search */}
                <div className="hidden flex-1 max-w-xl md:flex">
                    <div className="flex w-full gap-2">
                        <CategoryDropdown categories={categories} />
                        <SearchBar />
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2">
                    {
                        auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {auth.user.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={dashboard()}>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={settings()}>
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" asChild className="hidden sm:flex">
                                <Link href={login()}>
                                    Login
                                </Link>
                            </Button>
                        )
                    }
                    <WishList wishList={null} />
                    <Cart cart={cart} />
                    <MobileMenu />
                </div>
            </nav>
        </header>
    );
}