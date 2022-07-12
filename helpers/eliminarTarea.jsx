import Swal from "sweetalert2";
import useTareas from "../src/hooks/useTareas";

const handleClickEliminar = async (tarea) => {
    const { eliminarTarea} = useTareas();
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
            await eliminarTarea(tarea)
            await Swal.fire('Solicitud exitosa', 'Tarea eliminada correctamente', 'success');
        }
    })
}

export default handleClickEliminar;