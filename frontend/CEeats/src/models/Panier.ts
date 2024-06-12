import Panier_API from "@/services/Panier_API";
import Articles from "./Articles"
import User from './User'


export default class Panier {
    API_obj: Panier_API;
    liste_articles: Array<Articles>;

    constructor() {
        this.API_obj = new Panier_API()
        this.liste_articles = [];
    }

    public getByUser(Input_User: User) {
        let result = this.API_obj.read()
        //TODO : utiliser un for-loop pour ne récupérer que l'objet panier intéressant et le retourner avec return
    }
}