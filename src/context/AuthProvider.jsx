import { useState, useEffect, createContext } from "react";
import clienteAxios, {configHeader} from "../../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(token){
               try {
                   const {data} = await clienteAxios('/usuarios/perfil', configHeader(token));
                   await setAuth(data);
               } catch (e) {
                    setAuth({});
               } finally {
                   setCargando(false);
               }
            }else{
                setCargando(false);
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;