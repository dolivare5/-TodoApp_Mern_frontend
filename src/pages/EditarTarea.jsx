import useTareas from "../hooks/useTareas";
import {Link, useParams} from "react-router-dom";
import FormularioTarea from "../components/FormularioTarea";
const EditarTarea = () => {
    const { tarea } = useTareas();
    const { titulo, _id } = tarea;
    return (
        <>
            <div className="flex gap-3">
                <Link to={`/tareas/${_id}`} >
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
                <h1 className="font-black text-4xl">Editar Tarea: {titulo}</h1>
            </div>

            <div className="mt-10 flex justify-center">
                <FormularioTarea/>
            </div>
        </>
    )
};

export default EditarTarea;