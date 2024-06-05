import {createRouter, createWebHistory} from 'vue-router'
import MainView from '@/views/MainView.vue'
import TagView from '@/views/customer/TagsView.vue'

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
            component: TagView
        },
        {
            path: '/users',
            name: 'users',
            component: MainView, //TODO : changer le composant pour que ce soit la liste des utilisateurs accessible uniquemnet par les administrateurs
            children: [
                {
                    path: '/:id/orders',
                    name: 'users_orders',
                    component: MainView,
                    beforeEnter: (to, from, next): void => {
                        let isAdmin: boolean = false;
                        if (isAdmin) {
                            return next(to)
                        }
                    }
                },
                {
                    path: '/:id',
                    component: MainView, //TODO : changer le composant pour que ce soit la vue d'un utilisateur unique. Utiliser la variable "isAdmin" pour valider ou invalider la requête
                    beforeEnter: (to, from, next) => {
                        let isAdmin: boolean = false;
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
                        let isAllowed: boolean = false;
                        if (isAllowed) {
                            return next(to)
                        }
                    }
                }
            ]
        }
    ]
})

export default router
