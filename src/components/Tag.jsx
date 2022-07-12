import {formatearFecha} from "../../helpers/formatearFechas";
import useTareas from "../hooks/useTareas";
import Swal from "sweetalert2";
const Tag = ({tag}) => {
    const { handleModalEditarTag, eliminarTag, completarTarea } = useTareas();
    const { descripcion, nombre, prioridad, fechaLimite, _id, estado } = tag;

    const handleClickEliminar = async () => {
        Swal.fire({
            title: 'Advertencia',
            text: '¿Deseas eliminar este tag?',
            icon: 'error',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Si',
            confirmButtonColor: "#0d9488"
        }).then( async response => {
            if(response.isConfirmed){
                await eliminarTag(tag)
                await Swal.fire('Solicitud exitosa', 'Tag eliminado correctamente', 'success');
            }
        })
    }

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="text-xl mb-2">{nombre}</p>
                <p className="text-sm text-gray-500 uppercase mb-2">{descripcion}</p>
                <p className="text-sm mb-2">{formatearFecha(fechaLimite)}</p>
                <p className="text-gray-600 mb-2">Prioridad: {prioridad}</p>
            </div>
            <div className="flex gap-4">
                <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEditarTag(tag)}
                >Editar</button>

                <button
                    onClick={() => completarTarea(_id)}
                    className={`${ estado ? 'bg-sky-600' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                >{estado ? 'Completa' : 'Incompleta '}</button>

                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={handleClickEliminar}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Tag;