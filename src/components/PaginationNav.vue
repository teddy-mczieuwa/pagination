<template>
  <nav class="px-2">
    <div
      class="flex justify-center items-center py-2 px-4 rounded-4xl gap-1 md:gap-2"
    >
      <button
        class="text-green-500 disabled:bg-green-200 hover:bg-green-900 flex items-center justify-center w-8 h-8 leading-10 text-center select-none cursor-pointer rounded-full transition-all ease-linear"
        :disabled="page === 1"
        @click="emit('changePage', page - 1)"
      >
        <span class="inline-block scale-y-125">&#x276E;</span>
      </button>
      <button
        :class="{
          'bg-green-900': page === pageNumber,
          'hover:bg-green-900': pageNumber !== '...',
        }"
        @click="emit('changePage', pageNumber)"
        class="text-green-500 disabled:bg-green-700 flex items-center justify-center w-8 h-8 leading-10 text-center select-none cursor-pointer rounded-full transition-all ease-linear"
        v-for="pageNumber in paginationNumbers"
        :key="`${pageNumber}--${uuidv4()}`"
      >
        {{ pageNumber }}
      </button>
      <button
        class="text-green-500 disabled:bg-green-200 hover:bg-green-900 flex items-center justify-center w-8 h-8 leading-10 text-center select-none cursor-pointer rounded-full transition-all ease-linear"
        :disabled="page === totalPages"
        @click="emit('changePage', page + 1)"
      >
        <span class="inline-block scale-y-125">&#x276F;</span>
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<{
  page: number;
  paginationNumbers: Array<string | number>;
  totalPages: number;
}>();
const { page, totalPages, paginationNumbers } = toRefs(props);
const emit = defineEmits<{ (event: "changePage", pageNumbe: any): void }>();
</script>
