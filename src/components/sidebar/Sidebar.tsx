import { AiOutlineHome, AiOutlineInteraction, AiOutlinePieChart, AiOutlineLeft } from "react-icons/ai";
import { SidebarMenuItem } from "./SidebarMenuItem";
import Image from "next/image";

const menuItems = [
    {
        path: '/backoffice',
        icon: <AiOutlineHome size={20} />,
        title: 'Panel',
    },
    {
        path: '/actividad',
        icon: <AiOutlineInteraction size={20} />,
        title: 'Actividad'
    },
    {
        path: '/reportes',
        icon: <AiOutlinePieChart size={20} />,
        title: 'Reportes'
    }
]

export const Sidebar = () => {

    return (
        <div
            id="menu"
            style={{ width: '300px' }}
            className="absolute min-h-screen z-10 text-slate-300 w-64 left-0 overflow-hidden bg-neutral-800"
        >
            <div id="logo" className="mt-6 ml-6 flex justify-center">
                <Image src={'/megapix_logo.png'} priority width={100} height={100} alt="Logo" style={{
                    width: 'auto',
                    height: 'auto'
                }} />
            </div>
            <div className="mt-6 px-5 py-5">
                <span className="text-sm md:text-base font-bold">
                    Categorías
                </span>
            </div>
            <div id="nav" className="w-full px-6">
                {menuItems.map(navItem => (
                    <SidebarMenuItem key={navItem.path} {...navItem} />
                ))}
                <hr className="mt-8 border-gray-600" />
                <span
                    className={`cursor-pointer w-full px-2 inline-flex space-x-2 items-center py-4 mt-2 hover:bg-white/5 rounded-md transition ease-linear duration-150`}
                >
                    <div>
                        <AiOutlineLeft />
                    </div>
                    <div className="flex flex-col m-3">
                        <span className="text-md ml-1 leading-5 text-white">Colapsar</span>
                    </div>
                </span>
            </div>
        </div >
    )
}