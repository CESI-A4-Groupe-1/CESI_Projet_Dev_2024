import Commandes_API from "@/services/Commandes_API";
import Articles from "./Articles";

export default class Commande {
    API_obj: Commandes_API;
    liste_articles: Array<Articles>;

    constructor() {
        this.API_obj = new Commandes_API();
        this.liste_articles = []
    }
}