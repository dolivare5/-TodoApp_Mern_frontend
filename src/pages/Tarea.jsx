import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useTareas from "../hooks/useTareas";
import Swal from 'sweetalert2'
import ModalFormularioTags from "../components/ModalFormularioTags";
import Tag from "../components/Tag";

const Tarea = () => {
    const params = useParams();
    const { obtenerTarea, tarea, cargando, eliminarTarea, handleModalTag, tag} = useTareas();
    const { titulo } = tarea;
    const navigate = useNavigate();
    useEffect(() => {
        obtenerTarea(params.id)
    }, []);

    const handleClickEliminar = async () => {
        Swal.fire({
            title: 'Advertencia',
            text: '¿Deseas eliminar esta tarea?',
            icon: 'error',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
            confirmButtonColor: "#0d9488"
        }).then( async response => {
            if(response.isConfirmed){
                await eliminarTarea(params.id);
                await Swal.fire('Solicitud exitosa', 'Tarea eliminada correctamente', 'success');
                navigate('/tareas');
            }
        })
    }

    return (
         cargando ?
             (
                 <div className="p-10 flex items-center justify-center">
                     <div className="w-96 p-6 bg-white rounded-lg shadow-2xl">
                         <div className="animate-pulse">
                             <div className="flex space-x-6">
                                 <div className="h-12 w-12 bg-gray-400 rounded-lg"></div>
                                 <div className="space-y-6">
                                     <div className="w-40 h-4 bg-gray-400 rounded"></div>
                                     <div className="space-y-3">
                                         <div className="w-48 h-4 bg-gray-400 rounded"></div>
                                         <div className="w-32 h-4 bg-gray-400 rounded"></div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             ) :
             (
                 <div>
                     <div className="md:flex md:items-center md:gap-3 md:relative">
                         <Link className="flex md:flex-none justify-center md:justify-start" to={'/tareas'} >
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-13 w-12 mb-0" viewBox="0 0 20 20"
                                 fill="currentColor"
                             >
                                 <path
                                     fillRule="evenodd"
                                     d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                     clipRule="evenodd"
                                 />
                             </svg>
                         </Link>
                         <div className="block">
                             <h1 className="font-black text-4xl">{titulo}</h1>
                             <div className="md:flex md:gap-3">
                                 <Link
                                     className="flex items-center gap-2 text-white hover:bg-teal-800 transition-colors
                                 bg-teal-600 py-3 px-5 rounded-lg mt-2 relative"
                                     to={`/tareas/editar/${params}`}
                                 >
                                     <svg
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor"
                                         strokeWidth={2}
                                     >
                                         <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                         />
                                     </svg>Editar
                                 </Link>

                                 <div
                                     className="flex items-center gap-2 text-white hover:bg-red-800 transition-colors
                                 bg-red-600 py-3 px-5 rounded-lg mt-2 relative"
                                 >
                                     <svg
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                         strokeWidth={2}
                                     >
                                         <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                         />
                                     </svg>
                                     <button onClick={handleClickEliminar}>
                                         Eliminar
                                     </button>
                                 </div>

                                 <div
                                     className="flex items-center gap-2 text-white hover:bg-sky-800 transition-colors
                                 bg-sky-600 py-3 px-5 rounded-lg mt-2 relative"
                                 >
                                     <svg
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="h-8 w-8"
                                         viewBox="0 0 20 20"
                                         fill="currentColor"
                                     >
                                         <path
                                             fillRule="evenodd"
                                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                             clipRule="evenodd"
                                         />
                                     </svg>
                                     <button onClick={handleModalTag}>
                                         Nuevo tag
                                     </button>
                                 </div>
                             </div>
                         </div>
                     </div>

                    <div className="block">
                        <p className="font-bold text-xl mt-10">Tags de la tarea</p>

                        <div className="bg-white shadow mt-10 rounded-lg">
                            { tarea.items?.length
                                ? tarea.items?.map( tag => (
                                    <Tag
                                        key={tag._id}
                                        tag={tag}
                                    />
                                ))
                                : <p className="text-center my-5 p-10">No hay Tags en esta tarea</p>
                            }
                        </div>
                    </div>


                     <ModalFormularioTags/>
                 </div>



            )
    );
}

export default Tarea;