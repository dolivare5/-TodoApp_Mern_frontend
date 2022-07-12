import { useState, useEffect, createContext } from "react";
import clienteAxios, {configHeader} from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

import modalFormularioTags from "../components/ModalFormularioTags";

const TareasContext = createContext();

const TareasProviders = ({children}) => {
    const [tareas, setTareas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [tarea, setTarea] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTag, setModalFormularioTag] = useState(false);
    const [tag, setTag] = useState({});
    const [buscador, setBuscador ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token');
            try {
                if(token){
                    const { data } = await clienteAxios('/tareas', configHeader(token));
                    await setTareas(data);
                }
            }catch (e) {
                console.log(e)
            }
        }

        obtenerProyectos();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta(alerta);
        setTimeout( () => {
            setAlerta({});
        }, 5000);
    }

    const submitTarea = async tarea => {
        const token = localStorage.getItem('token');
        if(token){
            if(tarea.id){
                await editarTarea(tarea, token);
            }else{
                await nuevaTarea(tarea, token);
            }
            // Mostrar Alerta
            setTimeout(() => {
                setAlerta({});
                navigate('/tareas');
            }, 3000);
        }

    }

    const obtenerTarea = async id => {
        try {
            setCargando(true);
            const token = localStorage.getItem('token');
            if(token){
                const { data } = await clienteAxios(`/tareas/${id}`, configHeader(token));
                setTarea(data);
            }
        }catch (e) {
            console.log(e)
        } finally {
            setCargando(false)
        }
    }

    const editarTarea = async (tarea, token) => {
        try {
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, configHeader(token));
            // Sincronizar el state
            const tareasActualizadas = tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
            setTareas(tareasActualizadas);
            setAlerta({
                msg: 'Tarea actualizada correctamente',
                error: false
            })
        }catch (e) {
            console.log(e);
        }
    }

    const nuevaTarea = async (tarea, token) => {
        try {
            const {data} = await clienteAxios.post('/tareas', tarea, configHeader(token));
            setTareas([...tareas, data]);
            setAlerta({
                msg: 'Tarea creada correctamente',
                error: false
            })
        }catch (e) {
            console.log(e);
        }
    }

    const eliminarTarea = async id => {
        try {
            const token = localStorage.getItem('token');
            if(token){
                const {data} = await clienteAxios.delete(`/tareas/${id}`, configHeader(token));
                // Sincronizar el state
                const tareasActualizadas = tareas.filter(tareaState => id !== tareaState._id);
                setTareas(tareasActualizadas);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const handleModalTag = () => {
        setModalFormularioTag(!modalFormularioTag);
        setTag({});
    }

    const crearTag = async (tag, token) => {
        try {
            const { data } = await clienteAxios.post('/items', tag, configHeader(token));
            // Agrega el tag al state
            const tareasActualizadas = { ...tarea }
            tareasActualizadas.items= [...tarea.items, data]
            setTarea(tareasActualizadas);
        }catch (e) {
            console.log(e)
        }
    }

    const editarTag = async (tag, token) => {
        try {
            const { data } = await clienteAxios.put(`/items/${tag.id}`, tag, configHeader(token));
            const tareaActualizada = { ...tarea};
            tareaActualizada.items = tareaActualizada.items.map( tagState => tagState._id === data._id ? data : tagState );
            setTarea(tareaActualizada);
        }catch (e) {
            console.log(e)
        }
    }

    const submitTag = async tag => {
        const token = localStorage.getItem('token');
        if(! token) return

        if(tag?.id){
            await editarTag(tag, token)
        }else{
            await crearTag(tag, token)
        }
        setAlerta({});
        handleModalTag();
    }

    const handleModalEditarTag = tag => {
        handleModalTag();
        setTag(tag);
    }

    const eliminarTag = async tag => {
        try {
            setTag(tag);
            const token = localStorage.getItem('token');
            if(!token) return
            const { data } = await clienteAxios.delete(`/items/${tag._id}`, configHeader(token));
            const tareaActualizada = {...tarea};
            tareaActualizada.items = tareaActualizada.items.filter(tagState => tagState._id !== tag._id);
            setTarea(tareaActualizada)
        }catch (e) {
            console.log(e)
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            const { data } = await clienteAxios.post(`/items/estado/${id}`, {}, configHeader(token));
            const tareaActualizada = {...tarea};
            tareaActualizada.items = tareaActualizada.items.map(itemState => itemState._id === data._id ? data : itemState);
            setTarea(tareaActualizada);
            setTag({})
        }catch (e) {
            console.log(e.response)
        }
    }

    const handleBuscador = async  () => {
        setBuscador(!buscador);
    }

    const cerrarSesionTareas = () => {
        setTareas([])
        setTarea({})
        setAlerta({})

    }

    return (
        <TareasContext.Provider
            value={{
                tareas,
                setTareas,
                mostrarAlerta,
                alerta,
                submitTarea,
                obtenerTarea,
                tarea,
                cargando,
                eliminarTarea,
                handleModalTag,
                modalFormularioTag,
                submitTag,
                handleModalEditarTag,
                tag,
                eliminarTag,
                completarTarea,
                buscador,
                handleBuscador,
                cerrarSesionTareas
            }}
        >
            {children}
        </TareasContext.Provider>
    )
}

export { TareasContext };

export default TareasProviders;

