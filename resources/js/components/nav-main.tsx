import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function NavMain({ items = [] }: any) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                        {item.items ? (
                            <Collapsible
                                defaultOpen={item.items.some((sub: any) =>
                                    isCurrentUrl(sub.href),
                                )}
                                className="group/collapsible"
                            >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenu className="mt-1 ml-5">
                                        {item.items.map((sub: any) => (
                                            <SidebarMenuItem key={sub.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isCurrentUrl(
                                                        sub.href,
                                                    )}
                                                >
                                                    <Link href={sub.href}>
                                                        <span>{sub.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                            >
                                <Link href={item.href}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
