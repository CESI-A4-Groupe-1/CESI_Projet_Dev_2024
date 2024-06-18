import {createRouter, createWebHistory} from 'vue-router'
import MainView from '@/views/MainView.vue'
import ExploreView from '@/views/customer/ExploreView.vue'
import ResultsView from '@/views/customer/ResultsView.vue'
import RestaurantView from '@/views/customer/RestaurantView.vue'
import OrdersView from "@/views/customer/OrdersView.vue";
import RestorerhomeView from "@/views/restorer/RestorerhomeView.vue";
import AccountView from "@/views/customer/AccountView.vue";
import SettingsView from "@/views/customer/SettingsView.vue";
import HelpView from "@/views/customer/HelpView.vue";
import NameFormView from "@/views/customer/NameFormView.vue";
import PhoneFormView from "@/views/customer/PhoneFormView.vue";
import EmailFormView from "@/views/customer/EmailFormView.vue";
import PasswordFormView from "@/views/customer/PasswordFormView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import deliverer_view from "@/views/deliverer/deliverer_view.vue"


function authenticateUser(): any {

    const myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc0OTI5OTcsImlhdCI6MTcxNzQ5Mjg3N30.tjQyobhQMvrtqmEloqEnBHsg8KokJQP6huOXPmkOmMQ");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };
    let global_result: boolean = false;

    //FIXME : changer l'url par la bonne url ici

    fetch("localhost:3000/authenticate", requestOptions)

        .then((response) => response.text())
        .then((result) => {

            //TODO : performer la validation ici en fonction de la réponse du serveur
            let MesCouillesSurTonFrontEstVrai: boolean = false

            if (MesCouillesSurTonFrontEstVrai) {

                global_result = true;

            } else {

                global_result = false

            }
        })
        .catch((error) => console.error(error));

    return global_result;
}

function authenticateAdmin(): boolean {
    const myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc0OTI5OTcsImlhdCI6MTcxNzQ5Mjg3N30.tjQyobhQMvrtqmEloqEnBHsg8KokJQP6huOXPmkOmMQ");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };
    let global_result: boolean = false;

    //FIXME : changer l'url par la bonne url ici

    fetch("localhost:3000/authenticate", requestOptions)

        .then((response) => response.text())
        .then((result) => {

            //TODO : performer la validation ici en fonction de la réponse du serveur
            let MesCouillesSurTonFrontEstVrai: boolean = false

            if (MesCouillesSurTonFrontEstVrai) {

                global_result = true;

            } else {

                global_result = false

            }
        })
        .catch((error) => console.error(error));

    return global_result;
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
        {path: '/login', component: LoginView},
        {path: '/resultats/:id_category', component: ResultsView},
        {path: '/restaurants/:id', name: 'restaurant', component: RestaurantView},
        {path: '/users/:id/orders', name: 'commandes', component: OrdersView},
        {path: '/users/:id/account', name: 'profil', component: AccountView},

        {path: '/users/:id/account/update/name', name: 'updateFormName', component: NameFormView},
        {path: '/users/:id/account/update/phone', name: 'updateFormPhone', component: PhoneFormView},
        {path: '/users/:id/account/update/email', name: 'updateFormEmail', component: EmailFormView},
        {path: '/users/:id/account/update/password', name: 'updateFormPassword', component: PasswordFormView},

        {path: '/users/:id/settings', name: 'parametres', component: SettingsView},
        {path: '/help', name: 'aide', component: HelpView},
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
            path: '/restaurants',
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
        },
        {
            path: '/restaurateurs',
            name: 'categories_view',
            component: RestorerhomeView,
        },
        {
            path: "/deliveries",
            name: "deliveries_view",
            component: null,
            children: [
                {
                    path: "{id}",
                    name: "specific_delivery",
                    component: deliverer_view
                }
            ]
        }

    ]
})

export default router
