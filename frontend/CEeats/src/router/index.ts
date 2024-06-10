import {createRouter, createWebHistory} from 'vue-router'
import MainView from '@/views/MainView.vue'
import ExploreView from '@/views/customer/ExploreView.vue'
import ResultsView from '@/views/customer/ResultsView.vue'
import RestaurantView from '@/views/customer/RestaurantView.vue'
import OrdersView from "@/views/customer/OrdersView.vue";

//TODO : ici la méthode qui sera utilisée pour faire une requête au serveur d'authentification afin de vérifier la connexion de l'utilisateur
function authenticateUser(): boolean {
    return false;
}

//TODO : ici la méthode qui sera utilisée pour faire une requête au serveur d'authentification afin de vérifier les permissions de l'utilisateurs
function authenticateAdmin(): boolean {
    return false;
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'test',
            component: MainView
        },
        { 
          path: '/parcourir', 
          name: 'parcourir', 
          component: ExploreView,
        },
        // correspond au 'restaurants' dans ces routes
        {
          path: '/resultats', 
          name: 'resultats', 
          component: ResultsView 
        },
        // FIXME: temporaire le temps de tester. se mettre d'accord sur le nom des routes.
        // ---------------------------------------------------------------- //
        { path: '/resultats/:id_category', component: ResultsView },
        { path: '/restaurants/:id', name: 'restaurant', component: RestaurantView },
        { path: '/users/:id/orders', name: 'orders', component: OrdersView },
        // ---------------------------------------------------------------- //

        {
            path: '/users',
            name: 'users',
            component: MainView, //TODO : changer le composant pour que ce soit la liste des utilisateurs accessible uniquemnet par les administrateurs
            children: [
                {
                    path: '/:id/orders',
                    name: 'users_orders',
                    component: OrdersView,
                    beforeEnter: (to, from, next): void => {
                        let isAdmin: boolean = authenticateAdmin();
                        if (isAdmin) {
                            return next(to)
                        }
                    }
                },
                {
                    path: '/:id',
                    component: MainView, //TODO : changer le composant pour que ce soit la vue d'un utilisateur unique. Utiliser la variable "isAdmin" pour valider ou invalider la requête
                    beforeEnter: (to, from, next) => {
                        let isAdmin: boolean = authenticateAdmin();
                        if (isAdmin) {
                            return next(to)
                        }
                    }
                }
            ]
        },
        {
            path: '/articles',
            component: MainView, //TODO : changer le composant vers la vue de tout les articles
            name: 'articles',
            children: [
                {
                    path: '/:id',
                    name: 'specific_article',
                    component: MainView,
                    beforeEnter: (to, from, next) => {
                        let isAllowed: boolean = authenticateUser();
                        if (isAllowed) {
                            return next(to)
                        }
                    }
                }
            ]
        },
        {
            path: '/menus',
            name: 'menus_view',
            component: MainView, //FIXME : Changer le composant pour le vrai composant
            children: [
                {
                    path: '/:id',
                    name: 'specific_menu',
                    component: MainView
                }
            ]
        },
        {
            path: '/restaurants',
            name: 'restaurants_list_view',
            component: ResultsView,
            children: [
                {
                    path: '/:id',
                    component: RestaurantView,
                    name: "specific_restaurant",
                    children: [
                        {
                            path: '/orders',
                            name: "specific_restaurant_orders",
                            component: MainView,
                        },
                        {
                            path: '/statistics',
                            name: 'specific_restaurant_statistics',
                            component: MainView,

                        }
                    ]
                }
            ]
        },
        {
            path: '/categories',
            name: 'categories_view',
            component: ExploreView,
        }
    ]
})

export default router
