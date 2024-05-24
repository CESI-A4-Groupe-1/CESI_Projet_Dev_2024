import {createRouter, createWebHistory} from "vue-router";
import Test from "@/views/Test.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/test',
            name: 'test',
            component: Test
        }
        ]
});

export default router;