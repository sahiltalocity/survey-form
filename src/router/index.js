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
    path: "/survey/:id",
    component: SurveyView,
    name: "survey",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
