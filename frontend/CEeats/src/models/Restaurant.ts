import Commande from "./Commande"
import Categorie from "@/models/Categorie";
import Restaurant_API from "@/services/Restaurant_API"

export default class Restaurant {
    API_obj: Restaurant_API;
    Commandes_enregistrees: Array<Commande>;
    categorie: Categorie;


    constructor() {
        this.API_obj = new Restaurant_API();
        this.Commandes_enregistrees = []
        this.categorie = new Categorie();
    }

    public getAll() {
        //FIXME : règles potentielles de filtrage à mettre ici plutôt que de renvoyer l'objet.
        return this.API_obj.read()
    }
}