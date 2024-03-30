'use client'

import Image from "next/image";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Modal = ({ closeModal }: any) => {
    return (
        <div className="bg-slate-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center absolute top-16 right-0 bottom-0 left-0 w-full">
            <div className="bg-neutral-900 rounded-md text-center h-96 w-96">
                <div className="flex justify-between w-full items-center">
                    <h3 className="text-white p-3 text-md">Documento frente y dorso</h3>
                    <p className="text-white p-3 cursor-pointer" onClick={closeModal}>x</p>
                </div>
                <hr className="border-gray-600 mb-3" />
                <p className="text-white pl-3 text-xs text-left">Fotografía DNI frontal</p>
                <Image src={'/ui/registro/DNI_frontal.png'} width={100} height={100} style={{ width: '50%' }} className="mx-auto mt-3" alt="DNI frontal" />
                <p className="text-white pl-3 text-xs text-left mt-3 mb-3">Fotografía DNI dorsal</p>
                <Image src={'/ui/registro/DNI_dorsal.png'} width={100} height={100} style={{ width: '50%' }} className="mx-auto mt-3" alt="DNI dorsal" />
            </div>
        </div>
    )
}

export const Table = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleViewDocument = () => {
        setShowModal(true);
        setShowDropdown(false);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl">
                        <div className="flex justify-between p-5 bg-neutral-900">
                            <h1 className="text-white">Solicitudes clientes</h1>
                            <div className="flex items-center">
                                <h4 className="text-white text-sm mr-1">Ver todos</h4>
                                <FaChevronRight size={15} className="text-white" />
                            </div>
                        </div>
                        <hr />
                        <table className="min-w-full overflow-x-hidden">
                            <thead className="bg-neutral-900">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        ID solicitud
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Fecha / hora
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Nombre y apellido
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Teléfono
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Estado
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Documento
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                        Motivo
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-neutral-900 text-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#100</td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        01-02-24 14:30
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        Franco Campaiola
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        11 2334 3422
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        Pendiente
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <HiOutlineIdentification onClick={() => setShowModal(true)} size={20} className="cursor-pointer mr-2 text-teal-500" />
                                            40.644.122
                                        </div>
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                        -
                                    </td>
                                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap text-end">
                                        <button onClick={toggleDropdown} className="text-gray-400 hover:text-white">
                                            <CiMenuKebab size={20} className="cursor-pointer" />
                                        </button>
                                    </td>
                                    {showDropdown && (
                                        <div className="absolute right-40 mt-4 mr-3 w-56 rounded-md bg-neutral-600 shadow-lg z-10">
                                            <div className="py-1">
                                                <a onClick={toggleViewDocument} className="block px-4 py-2 text-sm text-white cursor-pointer">Ver documento</a>
                                                <hr className="mr-4 ml-4 border-grey-300" />
                                                <a href="#" className="block px-4 py-2 text-sm text-white ">Aprobar cliente</a>
                                                <hr className="mr-4 ml-4 border-grey-300" />
                                                <a href="#" className="block px-4 py-2 text-sm text-white ">Denegar cliente</a>
                                            </div>
                                        </div>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full bg-neutral-900 p-3 mt-1 rounded-xl">
                        <div className="flex items-center">
                            <div className="ml-3"></div>
                            <div className="flex mx-auto text-gray-300 justify-center items-center">
                                <MdKeyboardDoubleArrowLeft size={25} className="mr-5" />
                                <p className="mr-6">Anterior</p>
                                <div className="flex gap-3">
                                    <div className="border-solid border-2 border-white rounded-md">
                                        <p className="ml-3 mr-3">1</p>
                                    </div>
                                    <p>2</p>
                                    <p>3</p>
                                </div>
                                <p className="ml-6">Siguiente</p>
                                <MdKeyboardDoubleArrowRight size={25} className="ml-5" />
                            </div>
                            <div className="flex justify-end">
                                <p className="text-white mr-3">1/3 | 18 items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal ? (
                    <Modal closeModal={closeModal} />
                ) : null
            }
        </div>
    )
}
