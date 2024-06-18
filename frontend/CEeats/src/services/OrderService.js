import Axios from "@/services/APIService.js";

let getOrders = async (user_id) => {
    return Axios.get(`/users/${user_id}/orders`);
}

let addOrder = async (user_id, data) => {
    console.log(data);
    return Axios.post(`/users/${user_id}/orders`, data);
    // return Axios.post('/orders')
}

let addArticleToOrder = async (order_id, article_id, data) => {
    console.log("modification\n", data);
    return Axios.put(`/orders/${order_id}/addarticles/${article_id}`, data);
}

export const OrderService = {
    getOrders,
    addOrder,
    addArticleToOrder
}
