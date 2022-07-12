import axios from 'axios';

const clienteAxios = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
});

export const configHeader = token => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
}


export default clienteAxios;