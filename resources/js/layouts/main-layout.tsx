import { Nav } from "@/components/global/nav";
import { Footer } from "@/components/global/footer";
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
