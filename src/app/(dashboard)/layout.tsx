import { Sidebar, Navbar } from '@/components';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex">
                <Navbar />
                <Sidebar />
                <div className="w-full text-slate-900 z-1 p-24 pl-96">
                    {children}
                </div>
            </div>
        </div>
    );
}