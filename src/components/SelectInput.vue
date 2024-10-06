<template>
  <div :class="$attrs['root-class']">
    <div :class="$attrs['container-class']">
      <label v-if="label" :class="$attrs['label-class']">{{ label }}</label>
      <select
        v-bind="$attrs"
        :class="$attrs['select-class']"
        :value="modelValue"
        @change="(event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
      >
        <option v-if="placeholder" disabled value="">
          {{ placeholder }}
        </option>
        <option
          v-for="option of options"
          :key="option"
          :selected="modelValue == option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
const props = defineProps<{
  modelValue: string | number | null;
  options: Array<string | number>;
  label?: string;
  placeholder?: string | number;
}>();
const { modelValue, options, label, placeholder } = toRefs(props);
const emit = defineEmits<{ (e: "update:modelValue", payload: any): void }>();
</script>
