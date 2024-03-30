'use client'

import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ClientToast, DocumentModal, RejectedClientModal } from "./utils";

import { createClient } from '@/utils/supabase/client';

interface UserData {
    id: number;
    fecha_hora: string;
    nombre_apellido: string;
    telefono: string;
    estado: string;
    fecha_nacimiento: string,
    genero: string,
    dni_numero: string,
    dni_img_frente?: string,
    dni_img_dorso?: string,
    motivo_rechazo?: string
}

export const Table = () => {

    const [data, setData] = useState<UserData[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const client = createClient();
        const fetchData = async () => {
            const { data, error } = await client
                .from('usuarios')
                .select('*')
            if (error) console.log('error', error);
            setData(data || []);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const client = createClient();
        const fetchData = async () => {
            const { count, error } = await client
                .from('usuarios')
                .select('id', { count: 'exact' })
            if (error) console.log('error', error);
            setCount(count || 0);
        }
        fetchData();
    }, []);

    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [showClientRejectedModal, setShowClientRejectedModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, type: '' });

    const closeDocumentModal = () => {
        setShowDocumentModal(false);
    };

    const closeClientRejectedModal = () => {
        setShowClientRejectedModal(false);
    }

    const closeToast = () => {
        setShowToast({ show: false, type: '' })
    }

    const toggleViewDocument = () => {
        setShowDocumentModal(true);
        setShowDropdown(false);
    }

    const toggleClientRejected = () => {
        setShowClientRejectedModal(true);
        setShowDropdown(false);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleShowToast = (type: string) => {
        setShowDropdown(false);
        setShowToast({ show: true, type: type });
    }

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
                                {data.map((item, index) => (
                                    <tr key={index} className="bg-neutral-900 text-white">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{item.id}</td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {`${item.fecha_hora.split('T')[0]} ${item.fecha_hora.split('T')[1].split(':')[0]}:${item.fecha_hora.split('T')[1].split(':')[1]}`}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.nombre_apellido}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.telefono.replace(/^\+?549?/, '').replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap capitalize">
                                            {item.estado}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <HiOutlineIdentification onClick={() => setShowDocumentModal(true)} size={20} className="cursor-pointer mr-2 text-teal-500" />
                                                {item.dni_numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                                            <td className="absolute right-40 mt-4 mr-3 w-56 rounded-md bg-neutral-600 shadow-lg z-10">
                                                <div className="py-1">
                                                    <a onClick={toggleViewDocument} className="block px-4 py-2 text-sm text-white cursor-pointer">Ver documento</a>
                                                    <hr className="mr-4 ml-4 border-grey-300" />
                                                    <a onClick={() => toggleShowToast('success')} className="block px-4 py-2 text-sm text-white ">Aprobar cliente</a>
                                                    <hr className="mr-4 ml-4 border-grey-300" />
                                                    <a onClick={toggleClientRejected} className="block px-4 py-2 text-sm text-white ">Denegar cliente</a>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
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
                                </div>
                                <p className="ml-6">Siguiente</p>
                                <MdKeyboardDoubleArrowRight size={25} className="ml-5" />
                            </div>
                            <div className="flex justify-end">
                                <p className="text-white mr-3">{count} item(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showDocumentModal ? (
                    <DocumentModal closeModal={closeDocumentModal} />
                ) : null
            }
            {
                showToast.show && (
                    <ClientToast type={showToast.type} closeToast={closeToast} />
                )
            }
            {
                showClientRejectedModal ? (
                    <RejectedClientModal closeModal={closeClientRejectedModal} />
                ) : null
            }
        </div>
    )
}
