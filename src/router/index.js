// Composables
import { createRouter, createWebHistory } from "vue-router";
import SurveyView from "@/views/survey-view.vue";
import HomeView from "@/views/home-view.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/:id",
    component: SurveyView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
