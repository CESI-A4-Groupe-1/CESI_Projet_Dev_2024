import User from "./User";

export default class Parainage {
    parrain: User;
    filleul: User;

    constructor() {
        this.parrain = new User();
        this.filleul = new User();
    }
}