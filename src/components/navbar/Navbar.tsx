import Image from 'next/image'
import { AiOutlineSearch, AiOutlineBell, AiOutlineUpCircle } from 'react-icons/ai'

export const Navbar = () => {
    return (
        <div className="absolute w-full h-16 top-0 z-0 p-4 bg-neutral-900 shadow-2xl shadow-[#181818] text-right">
            <div className='flex justify-end items-center gap-3'>
                <button className="bg-neutral-800 hover:bg-neutral-600 text-white font-bold py-2 px-3 rounded">
                    <AiOutlineSearch />
                </button>
                <p className='text-gray-600'>|</p>
                <button className="bg-neutral-800 hover:bg-neutral-600 text-white font-bold py-2 px-3 rounded">
                    <AiOutlineBell />
                </button>
                <p className='text-gray-600'>|</p>
                <Image src={'/avatar.jpeg'} priority alt='Avatar' width={100} height={100} style={{
                    width: '1.5%'
                }} className='rounded-full overflow-hidden border-2 border-green-300' />
                <p className='text-gray-600'>|</p>
                <button className="flex items-center bg-neutral-800 hover:bg-neutral-600 transition-all ease-in-out text-white font-medium text-xs py-2 px-3 rounded gap-2">
                    Actividad cajeros
                    <AiOutlineUpCircle size={20} className={'text-teal-500'} />
                </button>
            </div>
        </div>
    )
}

