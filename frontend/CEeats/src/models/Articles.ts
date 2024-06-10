import Articles_API from "@/services/Articles_API";

export default class Articles {
    API_obj: Articles_API;

    constructor() {
        this.API_obj = new Articles_API();
    }

}