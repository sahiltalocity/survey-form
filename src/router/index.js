// Composables
import { createRouter, createWebHistory } from "vue-router";
import SurveyView from "@/views/survey-view.vue";
import HomeView from "@/views/home-view.vue";
import ErrorView from "@/views/error-view.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/survey/:id",
    component: SurveyView,
    name: "survey",
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorView,
    name: "error",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
