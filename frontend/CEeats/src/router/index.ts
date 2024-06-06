import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ExploreView from '@/views/customer/ExploreView.vue'
import ResultsView from "@/views/customer/ResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      { path: '/', name: 'test', component: MainView },
      { path: '/parcourir', name: 'parcourir', component: ExploreView },
      { path: '/resultats', name: 'resultats', component: ResultsView },
  ]
})

export default router
