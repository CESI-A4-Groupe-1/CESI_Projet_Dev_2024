import Commande from "./Commande"
import Categorie from "@/models/Categorie";

export default class Restaurant {
    API_obj: string;
    Commandes_enregistrees: Array<Commande>;
    categorie: Categorie;


    constructor() {
        this.API_obj = '';
        this.Commandes_enregistrees = []
        this.categorie = new Categorie();
    }
}