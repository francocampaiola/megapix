import Image from 'next/image'

export default function Registro() {
    return (
        <div className="w-full bg-gray-800 h-screen">
            <div className="bg-gradient-to-b from-gray-400 to-black-600 h-96"></div>
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
                <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-80">
                    <p className="text-2xl font-bold leading-7 text-left text-white">Solicitud de clientes</p>
                    <hr className='mt-5 border-gray-600' />
                    <form action="" method="post">
                        <div className="md:flex items-center mt-6">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="text-sm font-semibold leading-none text-gray-300">Nombre</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600" placeholder='Ingresar nombre' />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-sm font-semibold leading-none text-gray-300">Apellido</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600" placeholder='Ingresar apellido' />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-6">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Fecha de nacimiento</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600" placeholder='Ingresar fecha' />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="font-semibold leading-none text-gray-300">Género</label>
                                <select className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600">
                                    <option defaultValue={'Seleccionar'}>Seleccionar</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                    <option>Prefiero no especificarlo</option>
                                </select>
                            </div>
                        </div>
                        <div className="md:flex items-center mt-6">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Teléfono</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600" placeholder='+54 | XXXX XXXX' />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="font-semibold leading-none text-gray-300">DNI</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded placeholder-gray-600" placeholder='Ingresar DNI' />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-6">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Fotografía DNI frontal</label>
                                <div className="flex flex-col justify-center items-center text-center mt-4 border-dashed border-2 border-gray-600 rounded-3xl">
                                    <Image src={'/ui/registro/DNI_frontal.png'} width={100} height={100} className='mt-3' style={{
                                        width: '60%',
                                        height: 'auto'
                                    }} alt='DNI frontal' />
                                    <button className="mt-5 mb-4 bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-24 border border-white hover:border-transparent rounded">
                                        Subir archivo
                                    </button>
                                    <input type="file" id='getFile' accept='image/*' className='hidden' />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6">
                                <label className="font-semibold leading-none text-gray-300">Fotografía DNI dorsal</label>
                                <div className="flex flex-col justify-center items-center text-center mt-4 border-dashed border-2 border-gray-600 rounded-3xl">
                                    <Image src={'/ui/registro/DNI_dorsal.png'} width={100} height={100} className='mt-3' style={{
                                        width: '60%',
                                        height: 'auto'
                                    }} alt='DNI frontal' />
                                    <button className="mt-5 mb-4 bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-24 border border-white hover:border-transparent rounded">
                                        Subir archivo
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-black font-semibold hover:text-black py-2 px-24 hover:border-transparent rounded">
                            Enviar solicitud
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
