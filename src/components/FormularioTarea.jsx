import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useTareas from "../hooks/useTareas";
import Alerta from "./Alerta";

const FormularioTarea = () => {
    const [titulo, setTitulo] = useState('');
    const [id, setId] = useState(null);
    const [cliente, setCliente] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const { mostrarAlerta, alerta, submitTarea, tarea } = useTareas();
    const params = useParams();

    useEffect(()=>{
        if(params.id){
            setId(tarea._id);
            setTitulo(tarea.titulo);
            setCliente(tarea.cliente);
            setDescripcion(tarea.descripcion);
        }else{
            console.log('NuevoProyecto');
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();
        if([titulo, descripcion, fechaLimite, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        // Pasar los datos hacia la BD a través de axios
        await submitTarea({id, titulo, cliente, descripcion, fechaLimite});
        setId(null);
        setTitulo('');
        setDescripcion('');
        setFechaLimite('');
        setCliente('');
    }

    const { msg } = alerta;

    return(
        <>
            <form
                className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
                onSubmit={handleSubmit}
            >

                {msg && <Alerta alerta={alerta}/>}

                <div className="mb-5">
                    <label
                        htmlFor="titulo"
                        className="text-gray-700 uppercase font-bold text-sm"
                        >Titulo:
                    </label>

                    <input
                        type="text"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        id="titulo"
                        placeholder="Titulo de la tarea"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="cliente"
                        className="text-gray-700 uppercase font-bold text-sm"
                    >¿Quién le asignó esta tarea?
                    </label>

                    <input
                        type="text"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        id="cliente"
                        placeholder="Escriba aquí quien le asigno esta tarea"
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="descripcion"
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Descripción:
                    </label>

                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        id="descripcion"
                        placeholder="Descripción de la tarea"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="fecha-limite"
                        className="text-gray-700 uppercase font-bold text-sm"
                    >Fecha limite:
                    </label>

                    <input
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        id="titulo"
                        value={fechaLimite}
                        onChange={e => setFechaLimite(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={id ? "Actualizar Tarea" : "Crear Tarea"}
                    className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-xl cursor-pointer hover:bg-sky-700 transitions-colors"
                />

            </form>
        </>
    )
}
export default FormularioTarea;