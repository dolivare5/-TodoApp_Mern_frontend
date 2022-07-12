import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    if(cargando){ return 'Cargando...' }
    return (
        <>
            {auth._id ? (
                <div className=" bg-slate-100 container m-auto rounded-xl mt-20 px-14 py-5 mb-20 min-h-screen">
                    <Header/>
                    <div className="md:flex ">
                        <Sidebar/>
                        <main className="flex-1 p-10">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ) : <Navigate to='/'/>}
        </>
    )
}

export default RutaProtegida;