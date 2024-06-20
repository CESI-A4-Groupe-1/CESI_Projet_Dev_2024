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
import SignUpView from "@/views/auth/SignUpView.vue";
import deliverer_view from "@/views/deliverer/deliverer_view.vue"
import RestorerhistoryView from "@/views/restorer/RestorerhistoryView.vue";
import CommercialView from "@/views/commercial/CommercialView.vue";
import TechnicalView from "@/views/technical/TechnicalView.vue";


import {AccountService} from "@/services";

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainView,
        meta: { requiresAuth: false }
    },
    {
        path: '/parcourir',
        name: 'parcourir',
        component: ExploreView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/resultats',
        name: 'resultats',
        component: ResultsView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/resultats/:id_category',
        name: 'resultats_categorie',
        component: ResultsView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/restaurants/:id',
        name: 'restaurant',
        component: RestaurantView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/orders',
        name: 'commandes',
        component: OrdersView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/account',
        name: 'profil',
        component: AccountView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/account/update/name',
        name: 'updateFormName',
        component: NameFormView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/account/update/phone',
        name: 'updateFormPhone',
        component: PhoneFormView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/account/update/email',
        name: 'updateFormEmail',
        component: EmailFormView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/account/update/password',
        name: 'updateFormPassword',
        component: PasswordFormView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/users/:id/settings',
        name: 'parametres',
        component: SettingsView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/help',
        name: 'aide',
        component: HelpView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: MainView,
        meta: { requiresAuth: true, roles: [1, 2] }
    },
    {
        path: '/restaurateurs',
        name: 'restaurateurs',
        component: RestorerhomeView,
        meta: { requiresAuth: true, roles: [3] }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/home'
    },
    {
        path: '/categories',
        name: 'categories_view',
        component: ExploreView,
    },
    {
        path: '/restaurateurs',
        name: 'restaurateurs',
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
    },
    {
        path: '/techservice',
        name: 'technical',
        component: TechnicalView,
    },
    {
        path: '/commercial',
        name: 'commercial',
        component: CommercialView,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isLogged = AccountService.isLogged();
    const userRole = localStorage.getItem('user_role');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogged) {
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            // Assertion de type pour éviter l'erreur de TypeScript
            const matchedRoutes = to.matched as Array<{ meta: { roles?: number[] } }>;

            const allowedRoles = matchedRoutes.flatMap(route => route.meta.roles || []);
            if (allowedRoles.length > 0 && !allowedRoles.includes(Number(userRole))) {
                next({ path: '/home' });
            } else {
                next()
            }
        }
    } else {
        next();
    }
});

export default router