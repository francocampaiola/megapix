import Image from "next/image"
import { DocumentModalProps, RejectedClientModalProps, ToastProps } from "../interfaces"

const DocumentModal = ({ closeModal, dniImgFrente, dniImgDorso }: DocumentModalProps) => {
    return (
        <div className="bg-slate-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center absolute top-16 right-0 bottom-0 left-0 w-full">
            <div className="bg-neutral-900 rounded-md text-center" style={{
                width: '700px'
            }}>
                <div className="flex justify-between w-full items-center">
                    <h3 className="text-white p-3 text-md">Documento frente y dorso</h3>
                    <p className="text-white p-3 cursor-pointer" onClick={closeModal}>x</p>
                </div>
                <hr className="border-gray-600 mb-3" />
                <p className="text-white pl-3 text-xs text-left">Fotografía DNI frontal</p>
                <Image src={dniImgFrente} width={100} height={100} style={{ width: '50%' }} className="mx-auto mt-3" alt="DNI frontal" />
                <p className="text-white pl-3 text-xs text-left mt-3 mb-3">Fotografía DNI dorsal</p>
                <Image src={dniImgDorso} width={100} height={100} style={{ width: '50%' }} className="mx-auto mt-3 mb-3" alt="DNI dorsal" />
            </div>
        </div>
    )
}

const RejectedClientModal = ({ closeModal }: RejectedClientModalProps) => {
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
                <form action="">
                    <div className="mt-6 space-y-8 pl-6 pr-3">
                        <p className="text-white text-left">Al denegar al cliente no podrá usar servicios, en la tabla se visualizará con el estado rechazado.</p>
                        <div>
                            <p className="text-white text-left mb-2">Motivo</p>
                            <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Indicar motivo" />
                        </div>
                        <button className="h-9 px-3 w-44 justify-center flex text-black bg-cyan-300 hover:bg-cyan-200 active:bg-cyan-200 focus:bg-cyan-200 transition duration-500 rounded-md items-center">
                            Enviar solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ClientToast = ({ type, closeToast }: ToastProps) => {
    return (
        type === 'success' ? (
            <div id="toast-success" className="flex items-center w-full max-w-xs ml-8 p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div>
                    <div className="ms-3 text-sm font-normal">Cliente aprobado</div>
                    <div className="ms-3 text-xs font-normal">Se aprobó el cliente con éxito</div>
                </div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={closeToast}>
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        ) : (
            <div id="toast-danger" className="flex items-center w-full max-w-xs ml-8 p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">Item has been deleted.</div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close" onClick={closeToast}>
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        )
    );
}

export { DocumentModal, RejectedClientModal, ClientToast }; 