import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Warehouse,
    Megaphone,
    ChartBar,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, adminProductsIndex, adminCategoriesIndex, adminTagsIndex, adminPublishersIndex, adminAuthorsIndex, adminReviewsIndex, adminOrdersIndex, adminCouponsIndex, adminCustomersIndex } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems = [
    {
        title: 'Dashboard',
        icon: LayoutGrid,
        href: dashboard(),
    },

    {
        title: 'Catalog',
        icon: Package,
        items: [
            {
                title: 'Products',
                href: adminProductsIndex(),
            },
            {
                title: 'Categories',
                href: adminCategoriesIndex(),
            },
            {
                title: 'Tags',
                href: adminTagsIndex(),
            },
            {
                title: 'Publishers',
                href: adminPublishersIndex(),
            },
            {
                title: 'Authors',
                href: adminAuthorsIndex(),
            },
            {
                title: 'Reviews',
                href: adminReviewsIndex(),
            },
        ],
    },

    {
        title: 'Sales',
        icon: ShoppingCart,
        items: [
            {
                title: 'Orders',
                href: adminOrdersIndex(),
            },
            {
                title: 'Coupons',
                href: adminCouponsIndex(),
            },
        ],
    },

    {
        title: 'Customers',
        icon: Users,
        items: [
            {
                title: 'Customers List',
                href: adminCustomersIndex(),
            },
        ],
    },

    {
        title: 'Marketing',
        icon: Megaphone,
        items: [
            {
                title: 'Discounts',
                href: '/discounts',
            },
            {
                title: 'Banners',
                href: '/banners',
            },
            {
                title: 'Newsletter',
                href: '/newsletter',
            },
        ],
    },

    {
        title: 'Analytics',
        icon: ChartBar,
        items: [
            {
                title: 'Sales Reports',
                href: '/reports/sales',
            },
            {
                title: 'Product Reports',
                href: '/reports/products',
            },
        ],
    },

    {
        title: 'Settings',
        icon: Settings,
        items: [
            {
                title: 'General',
                href: '/settings',
            },
            {
                title: 'Products',
                href: '/settings/products',
            },
            {
                title: 'Orders',
                href: '/settings/orders',
            },
            {
                title: 'Customers',
                href: '/settings/customers',
            },
            {
                title: 'Payments',
                href: '/settings/payments',
            },
            {
                title: 'Shipping',
                href: '/settings/shipping',
            },
            {
                title: 'Appearance',
                href: '/settings/appearance',
            },
            {
                title: 'Marketing',
                href: '/settings/marketing',
            },
            {
                title: 'Notifications',
                href: '/settings/notifications',
            },
            {
                title: 'Users & Permissions',
                href: '/settings/users-&-permissions',
            },
            {
                title: 'System',
                href: '/settings/system',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <div className="overflow-x-hidden overflow-y-auto">
                    <NavMain items={mainNavItems} />
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
