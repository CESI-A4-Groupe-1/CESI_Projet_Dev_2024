import Axios from "@/services/APIService.js";

let login = (credentials) => {
    return Axios.post('login', credentials);
}

let logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
}

let getToken = () => {
    return localStorage.getItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let saveUser = (user_id, user_role) => {
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('user_role', user_role);
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

let getUser = (id) => {
    return Axios.get(`/users/${id}`);
}

let updateUser = (id, data) => {
    return Axios.put(`/users/${id}`, data);
}

export const AccountService = {
    login,
    logout,
    getToken,
    saveToken,
    saveUser,
    isLogged,
    getUser,
    updateUser
}