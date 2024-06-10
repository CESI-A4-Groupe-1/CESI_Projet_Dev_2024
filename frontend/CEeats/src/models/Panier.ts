import Panier_API from "@/services/Panier_API";
import Articles from "./Articles"

export default class Panier {
    API_obj: Panier_API;
    liste_articles: Array<Articles>;

    constructor() {
        this.API_obj = new Panier_API()
        this.liste_articles = [];
    }
}