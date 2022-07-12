import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import {AuthProvider} from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import Tareas from "./pages/Tareas";
import NuevaTarea from "./pages/NuevaTarea";
import TareasProviders from "./context/TareasProvider";
import Tarea from "./pages/Tarea";
import EditarTarea from "./pages/EditarTarea";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <TareasProviders>
                    <Routes>
                        <Route path="/" element={<AuthLayout/>}>
                            <Route index element={<Login/>} />
                            <Route path="registrar" element={<Registrar/>} />
                        </Route>

                        <Route path="/tareas" element={<RutaProtegida/>}>
                            <Route index element={<Tareas/>} />
                            <Route path="nueva-tarea" element={<NuevaTarea/>} />
                            <Route path=":id" element={<Tarea/>} />
                            <Route path="editar/:id" element={<EditarTarea/>} />
                        </Route>
                    </Routes>
                </TareasProviders>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
