import Axios from "@/services/APIService.js";

<<<<<<< HEAD
const articles = {
    "article1": {
        nom: "Bœuf Bourguignon",
        prix: 16.00,
        description: "Un bœuf bourguignon mijoté au vin rouge avec des carottes et des oignons."
    },
    "article2": {
        nom: "Escargots de Bourgogne",
        prix: 9.00,
        description: "Escargots cuits au beurre d'ail et au persil."
    },
    "article3": {
        nom: "Soufflé au fromage",
        prix: 7.00,
        description: "Un soufflé léger et aéré au fromage."
    }
};

let getAllRestaurants = async () => {
    return Axios.get('/restaurants')
}

let getRestaurant = async (id) => {
    return Axios.get(`/restaurants/${id}`);
}

let getAllCategories = async () => {
    return Axios.get('/categories');
}

let getRestaurantMenues = async (id) => {
    return ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];
    // return Axios.get('/restaurants/${id}/menus');
}

let getMenueArticles = async (id) => {
    // return Axios.get(`/articles/${id}`);
    return articles;
}


export const RestaurantService = {
    getAllRestaurants,
    getRestaurant,
    getAllCategories,
    getRestaurantMenues,
    getMenueArticles,
=======
export let getAllRestaurants = async () => {
    return Axios.get('/restaurants')
}

export const RestaurantService = {
    getAllRestaurants,
>>>>>>> cc3d11b1bf6c243ddc9449992d98b138efe9f9c7
}
