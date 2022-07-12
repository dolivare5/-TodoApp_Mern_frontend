import FormularioTarea from "../components/FormularioTarea";

const NuevaTarea = () => {
    return(
        <>
            <h1 className="text-4xl font-black">Crear Tarea</h1>
            <div className="mt-10 flex justify-center">
                <FormularioTarea/>
            </div>
        </>
    )
}
export default NuevaTarea;