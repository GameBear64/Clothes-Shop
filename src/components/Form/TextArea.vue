<script setup>
const props = defineProps(['label', 'class', 'error', 'modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div :class="props.class">
    <label
      :for="props.label?.toLowerCase().replace(/ /g, '-')"
      class="block text-sm font-medium leading-5"
    >
      {{ props.label }}
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <textarea
        :id="props.label?.toLowerCase().replace(/ /g, '-')"
        :name="props.label"
        :value="modelValue"
        v-bind="$attrs"
        class="default-input h-28 resize-none"
        :class="{ 'border-red-500 focus:border-red-200': props.error }"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p
      v-if="props.error"
      class="text-sm font-light text-red-500"
    >
      {{ props.error }}
    </p>
    <div
      v-else
      class="h-5"
    />
  </div>
</template>
