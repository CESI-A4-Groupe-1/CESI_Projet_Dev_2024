import Articles_API from "@/services/Articles_API";

export default class Articles {
    API_obj: Articles_API;

    constructor() {
        this.API_obj = new Articles_API();
    }

    public getAll() {
        //FIXME : attention à bien définir des filtres si nécessaries
        return this.API_obj.read();
    }
}