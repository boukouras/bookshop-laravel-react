import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
export function MobileMenu() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="p-6">
                    <DrawerHeader>
                        <DrawerTitle>
                            Menu
                        </DrawerTitle>
                    </DrawerHeader>
                    <nav className="flex flex-col gap-4">
                        <Link href="#">
                            Books
                        </Link>
                        <Link href="#">
                            Categories
                        </Link>
                        <Link href="#">
                            Authors
                        </Link>
                        <Link href="#">
                            Publishers
                        </Link>
                    </nav>
                </div>
            </DrawerContent>
        </Drawer>
    )
}