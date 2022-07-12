import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, email, password, confirmarPassword].includes('')){
            setAlerta({
                msg: "Todos los campos son obligatorios.",
                error : true
            })
            return
        }
        if (password !== confirmarPassword){
            setAlerta({
                msg: "Las contraseñas no coinciden.",
                error : true
            })
            return;
        }

        if (password.length < 8){
            setAlerta({
                msg: "Las contraseña debe tener mínimo 8 caracteres.",
                error : true
            })
            return;
        }

        // Crear el usuario a través de la API

        try {
            const { data } = await clienteAxios.post(
                `/usuarios`,
                {nombre, email, password}
            );
            setEmail('');
            setNombre('');
            setPassword('');
            setConfirmarPassword('');

            setAlerta({
                msg: data.msg,
                error: false
            });
        }catch (e) {
            setAlerta( {
                msg: e.response.data.msg,
                error: true
            });
        }
    }


    const { msg } = alerta;

    return (

        <>
            <h1 className="text-teal-600 font-black text-5xl capitalize text-center">
                Cree una cuenta y administre sus <span className="text-slate-700">Tareas</span>
            </h1>
            {msg && <Alerta alerta={alerta}/>}
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >nombre completo
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese aquí su nombre y apellido"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

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
                        placeholder="Ingresar aquí su Contraseña para el acceso a TodoApp"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-5"
                        htmlFor="password2"
                    >Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password2"
                        value={confirmarPassword}
                        onChange={e => setConfirmarPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Crear cuenta"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl mt-7
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-2"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 text-sm"
                    to="/"
                >¿Ya tienes una cuenta en TodoApp? Inicia sesión
                </Link>
            </nav>
        </>
    )
}

export default Registrar;