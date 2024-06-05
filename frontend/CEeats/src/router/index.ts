import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import CustomerView from '@/views/customer/CustomerView.vue'
import ResultsView from "@/views/customer/ResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      { path: '/', name: 'test', component: MainView },
      { path: '/parcourir', name: 'parcourir', component: CustomerView },
      { path: '/resultats', name: 'resultats', component: ResultsView },
  ]
})

export default router
