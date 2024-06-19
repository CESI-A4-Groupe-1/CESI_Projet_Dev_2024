import Axios from "@/services/APIService.js";
import {computed} from "vue";

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

let deleteArticleFromOrder = async (order_id, article_id) => {
    return Axios.put(`/orders/${order_id}/remarticles/${article_id}`);
}

let payOrder = async (order_id) => {
    return Axios.put(`/orders/${order_id}/paid`);
}

let validateOrder = async (order_id) => {
    return Axios.put(`/orders/${order_id}/validated`);
}

let getOrderStatus = (order) => {
    if (order.paid_at && order.id_livraison === null) {
        return "En préparation";
    } else if (order.id_livraison && order.validated_at === null) {
        return "Livraison en cours";
    } else if (order.validated_at) {
        return "Livrée";
    } else if (order.paid_at === null) {
        return "Commande non validée"
    }
    return "Statut inconnu";
};

let getOrderStatusClass = (order) => {
    if (order.paid_at && order.id_livraison === null) {
        return "status-preparation";
    } else if (order.id_livraison && order.validated_at === null) {
        return "status-delivery";
    } else if (order.validated_at) {
        return "status-delivered";
    } else if (order.paid_at === null) {
        return "status-not-validated"
    }
    return "status-unknown";
};

let getTotalPrice = (commande_lists) => {
    const total = commande_lists.reduce((sum, item) => {
        return sum + (item.id_article_article.prix * item.quantite);
    }, 0);
    return total.toFixed(2);
};

export const OrderService = {
    getOrders,
    addOrder,
    addArticleToOrder,
    deleteArticleFromOrder,
    getOrderStatus,
    getOrderStatusClass,
    payOrder,
    validateOrder,
    getTotalPrice
}
