// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home-view.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
