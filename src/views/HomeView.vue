<template>
  <h3 class="text-2xl text-green-800 mb-3">Pagination</h3>
  <div
    class="w-full bg-green-50 rounded-md py-10 px-24 my-10 flex justify-center items-center"
  >
    <pagination-nav
      v-if="totalPages"
      :page="page"
      @changePage="changePage"
      :total-pages="totalPages"
      :paginationNumbers="paginationNumbers"
    />

    <template v-if="totalPages">
      <p class="px-2 text-green-700">Show</p>
      <select-input
        v-model="limit"
        :options="limitOptions"
        container-class="relative cursor-pointer after:content-['\2304'] after:absolute after:text-green-800 after:top-0 after:right-2 "
        select-class=" py-1 px-2 cursor-pointer w-16 appearance-none rounded-md outline-green-800 focus:outline-green-500 focus:outline-2 text-green-800 outline"
      />
    </template>
  </div>

  <div class="w-full bg-green-50 rounded-md py-10 px-24 my-10">
    <template v-if="loading"><p class="text-center">Loading...</p></template>
    <p
      v-else
      class="w-3/5 p-2 bg-green-800 text-green-200 text-center rounded-lg my-4 mx-auto"
      v-for="data of dataResult.results"
      :key="`${data.name}--${uuidv4()}`"
    >
      {{ data.name }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import SelectInput from "../components/SelectInput.vue";
import PaginationNav from "../components/PaginationNav.vue";
import useQueryApi from "../useQueryApi";

const baseUrl: string = "https://pokeapi.co/api/v2/pokemon";
const {
  changePage,
  page,
  totalPages,
  paginationNumbers,
  data: dataResult,
  loading,
  limit,
  limitOptions,
} = useQueryApi(baseUrl);
</script>
