import { useEffect } from "react";
import {Link, useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import useTareas from "../hooks/useTareas";
const PreviewTarea = ({tarea,  handleOnChange, selected}) => {
    const { titulo, _id, descripcion, cliente } = tarea;
    const { eliminarTarea} = useTareas();


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
                await eliminarTarea(_id);
                await Swal.fire('Solicitud exitosa', 'Tarea eliminada correctamente', 'success');
            }
        })
    }
    return(
        <div className="p-5 border-b flex flex-col md:flex-row md:justify-between">
            <div className="flex gap-3 items-center mb-4">
                <input
                    type="checkbox"
                    className="w-5 h-5 rounded-full mr-3 checked:bg-teal-600 text-sky-600"
                    checked={selected}
                    onChange={handleOnChange}
                />
                <p className="flex-1">
                    {titulo}
                    <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
                </p>
            </div>

            <div className="flex justify-center">

                <button onClick={handleClickEliminar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-teal-600 mr-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>

                <Link to={`${_id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="h-8 w-8 text-teal-600" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>


        </div>
    )
}

export default PreviewTarea;