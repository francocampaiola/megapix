'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

interface Props {
    path: string,
    icon: JSX.Element,
    title: string
}

export const SidebarMenuItem = ({ path, icon, title }: Props) => {

    const pathName = usePathname();

    return (
        <Link
            href={path}
            className={`w-full px-2 inline-flex space-x-2 items-center py-4 mt-2 hover:bg-white/5 rounded-md hover:border-l-4 hover:border-violet-300 hover:transition hover:ease-linear duration-150 ${(pathName === path) && 'bg-neutral-700 border-l-4 border-teal-300'}`}
        >
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-md ml-1 leading-5 text-white">{title}</span>
            </div>
        </Link>
    )
}
