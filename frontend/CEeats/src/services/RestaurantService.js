import Axios from "@/services/APIService.js";

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
    return 1;
}

let getRestaurantByCategory = async (category_id) => {
    return Axios.get(`/restaurants/categories/${category_id}`);
}


export const RestaurantService = {
    getAllRestaurants,
    getRestaurant,
    getAllCategories,
    getRestaurantMenues,
    getMenueArticles,
    getRestaurantByCategory
}
