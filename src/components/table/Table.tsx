'use client'

import { RejectedUserModalProps } from "./interfaces";
import { UserToast, DocumentModal } from "./utils";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

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

    // ESTADOS
    const [data, setData] = useState<UserData[]>([]);
    const [count, setCount] = useState(0);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [showUserRejectedModal, setShowUserRejectedModal] = useState(false);
    const [showDropdownIndex, setShowDropdownIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState({ show: false, type: '' });
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    // Actualización de los usuarios registrados a mostrar
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

    // Actualización de cantidad de items en la tabla
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

    // Cierre automático del dropdown cuando un modal se abre
    useEffect(() => {
        if (showDocumentModal || showUserRejectedModal) {
            setShowDropdownIndex(null);
        }
    }, [showDocumentModal, showUserRejectedModal]);

    // HANDLERS
    const closeUserRejectedModal = () => {
        setShowUserRejectedModal(false);
    }

    const closeToast = () => {
        setShowToast({ show: false, type: '' })
    }

    // TOGGLES
    const toggleViewDocument = (userData: UserData) => {
        setSelectedUser(userData);
        setShowDocumentModal(true);
        setShowDropdownIndex(null);
    }

    const toggleUserRejected = (id: number) => {
        const userToReject = data.find(user => user.id === id);
        setSelectedUser(userToReject || null);
        setShowUserRejectedModal(true);
        setShowDropdownIndex(null);
    }

    const toggleDropdownIndex = (index: number) => {
        setShowDropdownIndex(showDropdownIndex === index ? null : index);
    };

    const toggleShowToast = (type: string) => {
        setShowDropdownIndex(null);
        setShowToast({ show: true, type: type });
    }

    // FUNCIONES
    const aprobarUsuario = useCallback(async (id: number) => {
        try {
            const res = await fetch('/api/approveUser', {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                throw new Error('Error al aprobar cliente');
            }

            const data = await res.json();
            toggleShowToast('success');
        }
        catch (error) {
            console.log(error);
            toggleShowToast('error');
        }
    }, []);

    const denegarUsuario = useCallback(async (id: number, motivo_rechazo: string) => {
        try {
            const res = await fetch('/api/denyUser', {
                method: 'POST',
                body: JSON.stringify({ id, motivo_rechazo }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                throw new Error('Error al denegar cliente');
            }

            const data = await res.json();
            toggleShowToast('success');
        }
        catch (error) {
            console.log(error);
            toggleShowToast('error');
        }
    }, []);

    const RejectedUserModal = ({ closeModal, rejectUser }: RejectedUserModalProps) => {
        const [motivoRechazo, setMotivoRechazo] = useState('');

        const handleMotivoChange = (e: ChangeEvent<HTMLInputElement>) => {
            setMotivoRechazo(e.target.value);
        };

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                await rejectUser(selectedUser!.id, motivoRechazo);
                setShowUserRejectedModal(false);
            } catch (error) {
                console.error('Error al denegar cliente:', error);
            }
        };

        return (
            <div className="bg-slate-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center absolute top-16 right-0 bottom-0 left-0 w-full">
                <div className="bg-neutral-900 rounded-md text-center" style={{
                    width: '800px',
                    height: '300px'
                }}>
                    <div className="flex justify-between w-full items-center">
                        <h3 className="text-white p-3 text-md">Denegar cliente</h3>
                        <p className="text-white p-3 cursor-pointer" onClick={closeModal}>x</p>
                    </div>
                    <hr className="border-gray-600" />
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 space-y-8 pl-6 pr-3">
                            <p className="text-white text-left">Al denegar al cliente no podrá usar servicios, en la tabla se visualizará con el estado rechazado.</p>
                            <div>
                                <p className="text-white text-left mb-2">Motivo</p>
                                <input
                                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                    placeholder="Indicar motivo"
                                    value={motivoRechazo}
                                    onChange={handleMotivoChange}
                                />
                            </div>
                            <button type="submit" className="h-9 px-3 w-44 justify-center flex text-black bg-cyan-300 hover:bg-cyan-200 active:bg-cyan-200 focus:bg-cyan-200 transition duration-500 rounded-md items-center">
                                Enviar solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
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
                                                <HiOutlineIdentification onClick={() => toggleViewDocument(item)} size={20} className="cursor-pointer mr-2 text-teal-500" />
                                                {item.dni_numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            </div>
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.motivo_rechazo || '-'}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap text-end">
                                            <button onClick={() => toggleDropdownIndex(index)} className="text-gray-400 hover:text-white">
                                                <CiMenuKebab size={20} className="cursor-pointer" />
                                            </button>
                                        </td>
                                        {showDropdownIndex === index && (
                                            <td className="absolute right-40 mt-4 mr-3 w-56 rounded-md bg-neutral-600 shadow-lg z-10">
                                                <div className="py-1">
                                                    <a onClick={() => toggleViewDocument(item)} className="block px-4 py-2 text-sm text-white cursor-pointer">Ver documento</a>
                                                    <hr className="mr-4 ml-4 border-grey-300" />
                                                    <a onClick={() => aprobarUsuario(item.id)} className="block px-4 py-2 text-sm text-white ">Aprobar cliente</a>
                                                    <hr className="mr-4 ml-4 border-grey-300" />
                                                    <a onClick={() => toggleUserRejected(item.id)} className="block px-4 py-2 text-sm text-white ">Denegar cliente</a>
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
                showDocumentModal && selectedUser && (
                    <DocumentModal
                        dniImgFrente={selectedUser.dni_img_frente || ''}
                        dniImgDorso={selectedUser.dni_img_dorso || ''}
                        closeModal={() => setShowDocumentModal(false)}
                    />
                )}
            {
                showToast.show && (
                    <UserToast type={showToast.type} closeToast={closeToast} />
                )
            }
            {
                showUserRejectedModal ? (
                    <RejectedUserModal
                        closeModal={closeUserRejectedModal}
                        rejectUser={denegarUsuario}
                    />
                ) : <></>
            }
        </div>
    )
}
