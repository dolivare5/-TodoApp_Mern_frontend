import {useState} from 'react';
import useTareas from "../hooks/useTareas";
import PreviewTarea from "../components/PreviewTarea";
import { useNavigate } from "react-router-dom";

const Tareas = () => {

    const {tareas, eliminarTarea} = useTareas();
    const [stateCheckTareas, setStateCheckTareas] = useState({tareasSeleccionadas: []});
    const navigate = useNavigate();

    function handleCheckboxChange(id) {
        // Realizo una copia del state de tareas seleccionadas
        let tareasSelections = stateCheckTareas.tareasSeleccionadas;
        // Busco en el arreglo de tareas si ya hay una con el id que se recibe.
        let idDeTareasSelect = tareasSelections.indexOf(id);
        // Si encuentra una tarea quiere decir que el usuario la quiere deseleccionar
        if (idDeTareasSelect > -1) {
            tareasSelections.splice(idDeTareasSelect, 1)
        }
        // Caso contrario la agrego esa tarea a la selección
        else {
            tareasSelections.push(id)
        }

        setStateCheckTareas({tareasSeleccionadas: tareasSelections});
        console.log(stateCheckTareas)
    }
    const handleEliminar = async () => {
        stateCheckTareas.tareasSeleccionadas.forEach(id => {
            eliminarTarea(id);
        });

        location.reload();
    }

    return (
        <>
            <h1 className="text-4xl font-black">Tareas</h1>
            {
                stateCheckTareas.tareasSeleccionadas.length > 1 &&
                <div className="md:flex md:justify-center mt-4">
                    <button
                        type="button"
                        className="text-white text-sm bg-red-600 p-3 rounded-md font-bold uppercase"
                        onClick={handleEliminar}
                    >Eliminar tareas seleccionadas
                    </button>

                    <button
                        type="button"
                        className="text-white text-sm bg-teal-600 p-3 rounded-md font-bold uppercase ml-10"
                    >Marcar como completadas
                    </button>
                </div>
            }
            <div className="bg-white shadow mt-6 rounded-lg">
                {tareas.length
                    ? tareas.map((tarea) => (
                        <PreviewTarea
                            key={tarea._id}
                            tarea={tarea}
                            handleOnChange={() => handleCheckboxChange(tarea._id)}
                            selected={stateCheckTareas.tareasSeleccionadas.includes(tarea._id)}
                        />
                    ))
                    : <p className="text-center text-gray-600 uppercase">Aún no hay tareas registradas</p>}
            </div>
        </>
    )
}

export default Tareas;