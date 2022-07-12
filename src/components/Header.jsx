import {Link} from 'react-router-dom';
import useTareas from "../hooks/useTareas";
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth";
const Header = () => {

    const { handleBuscador, cerrarSesionTareas } = useTareas();

    const { cerrarSesionAuth} = useAuth();

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionTareas()
        localStorage.removeItem('token')
    }

    return(
        <header className="">
            <div className="flex flex-col align-center md:justify-center md:flex-row md:justify-between">
                <h2 className="text-4xl text-teal-600 font-black text-center">TodoApp</h2>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <button
                        type="button"
                        className='font-bold uppercase'
                        onClick={handleBuscador}
                    >Buscar Tarea</button>

                    <Busqueda/>
                </div>
                <div className="flex items-center gap-5">
                    <Link
                        to="/tareas"
                        className="font-bold uppercase"
                        >Tareas
                    </Link>
                    <button
                        type="button"
                        className="text-white text-sm bg-cyan-900 p-3 rounded-md font-bold uppercase"
                        onClick={handleCerrarSesion}
                        >Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    )
};

export default Header;