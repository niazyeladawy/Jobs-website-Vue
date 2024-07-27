<script setup lang="ts">
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Job } from "../types/job";
import BackButton from "../components/BackButton.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const router  = useRouter();
const { id } = route.params;
const toast = useToast()


const state = reactive<{
  job: Job;
  isLoading: boolean;
}>({
  job: {id: 0, title: "", type: "", description: "", location: "", salary: "", company: {name: "", description: "", contactEmail: "" ,contactPhone: ""}},
  isLoading: false,
});

onMounted(async () => {
  state.isLoading = true;
  try {
    const { data } = await axios.get(`/api/jobs/${id}`);
    state.job = data;
  } catch (error) {
  } finally {
    state.isLoading = false;
  }
});

const handleDeleteJob = async () => {
  state.isLoading = true;
  try {
    await axios.delete(`/api/jobs/${id}`);
    router.push("/jobs");
    toast.success("Job deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete job");
  } finally {
    state.isLoading = false;
  }
};

</script>

<template>

  <BackButton/>   
  <section v-if="state.isLoading" class="text-center">
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
  </section>

  <section v-else class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4"> {{ state.job.type }} </div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
              ></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>
          

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}  
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
            @click="handleDeleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
