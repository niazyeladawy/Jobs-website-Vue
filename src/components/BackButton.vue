<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <button
        @click="goBack"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="pi pi-arrow-left mr-2"></i> Back to Job Listings
      </button>
    </div>
  </section>
</template>
