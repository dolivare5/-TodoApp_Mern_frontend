import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
    const { auth } = useAuth();
    return (
        <aside className="md:w-50 lg:w-60 px-5 py-10 bg-gray-200 rounded-xl md:min-h-screen mt-10">
            <p className="text-xl font-bold">Hola: {auth.nombre}</p>

            <Link
                to="nueva-tarea"
                className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
                >Nueva Tarea

            </Link>
        </aside>
    )
};

export default Sidebar;