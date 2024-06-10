import User_API from "@/services/User_API";
import Panier from "@/models/Panier";

export default class User {
    API_obj: User_API;
    panier: Panier;
    nom: string;
    prenom: string;
    adresse: string;
    num_tel: string;

    constructor() {
        this.API_obj = new User_API()
        this.panier = new Panier()
        this.nom = '';
        this.prenom = '';
        this.adresse = '';
        this.num_tel = '';
    }
}