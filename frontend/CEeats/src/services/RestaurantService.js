import Axios from "@/services/APIService.js";

export let getAllRestaurants = async () => {
    return Axios.get('/restaurants')
}

export const RestaurantService = {
    getAllRestaurants,
}
