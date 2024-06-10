import Categorie_API from "@/services/Categorie_API";

export default class Categorie {
    API_obj: Categorie_API;

    constructor() {
        this.API_obj = new Categorie_API();
    }

}