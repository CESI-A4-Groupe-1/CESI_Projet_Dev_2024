import axios from "axios";
import { AccountService } from '@/services'

const Axios = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

Axios.interceptors.request.use(request => {

    // Si connecté on ajoute le token dans l'entête
    if(AccountService.isLogged()){
        request.headers.Authorization = 'Bearer '+ AccountService.getToken()
    }

    return request
})

export default Axios;