import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Jobs from "../pages/Jobs.vue";
import NotFound from "../pages/NotFound.vue";
import Job from "../pages/Job.vue";
import AddJob from "../pages/AddJob.vue";
import EditJob from "../pages/EditJob.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/jobs",
            name: "jobs",
            component: Jobs,
        },
        {
            path: "/jobs/:id",
            name: "job",
            component: Job
        },
        {
            path: "/jobs/add",
            name: "addJob",
            component: AddJob
        },
        {
            path: "/jobs/edit/:id",
            name: "editJob",
            component: EditJob
        },
        {
            path: '/:catchAll(.*)',
            name: 'notFound',
            component: NotFound
        },
    ],
});

export default router