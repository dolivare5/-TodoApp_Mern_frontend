import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const {setAuth, auth} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post('/usuarios/login', {email, password} );
            setAlerta({})
            localStorage.setItem('token', data.token);
            await setAuth(data);
            navigate('/tareas');
            window.location.reload();

        }catch (e) {
            setAlerta({
                msg : e.response.data.msg,
                error: true
            })
        }
    }
    const { msg } = alerta;
    return (
        <>
            <h1 className="text-teal-600 font-black text-3xl capitalize">
                Inicie Sesión y administre sus <span className="text-slate-700">Tareas</span>
            </h1>

            {msg && <Alerta alerta={alerta}/>}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>

                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                        >Email
                    </label>
                    <input
                        type="email"
                        placeholder="Ingresar aquí su email de registro"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-5"
                        htmlFor="password"
                    >Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Ingresar aquí su contraseña de registro"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl mt-7
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-2"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 text-sm"
                    to="registrar"
                    >¿Aun no tiene cuenta en TodoApp? Regístrese aquí
                </Link>
            </nav>
        </>
    )
}

export default  Login;
