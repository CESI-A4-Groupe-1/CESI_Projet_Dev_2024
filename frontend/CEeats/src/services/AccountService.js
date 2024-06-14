import Axios from "@/services/APIService.js";

let login = (credentials) => {
    console.log(credentials);
    return Axios.post('login', credentials);
}

let logout = () => {
    // TODO : faire fonction logout
    localStorage.removeItem('token');
}

let saveToken = (token) => {
    // TODO : stocker le token d'authentification
    localStorage.setItem('token', token);
}

let isLogged = () => {
    // TODO verifier que l'utilisateur est connecté (voir si il y a un token)
    let token = localStorage.getItem('token');
    return !!token;
}

export const AccountService = {
    login,
    logout,
    saveToken,
    isLogged
}