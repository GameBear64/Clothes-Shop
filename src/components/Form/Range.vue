<script setup>
  const props = defineProps(['label', 'class', 'error'])

  const modelMin = defineModel("min", { type: Number, required: true })
  const modelMax = defineModel("max", { type: Number, required: true })
</script>

<template>
  <div :class="props.class">
    <div class="flex flex-col items-center">
      <label
        :for="props.label?.toLowerCase().replace(/ /g, '-')"
        class="my-2 text-sm font-medium leading-5"
      >
        {{ props.label }}
      </label>
      <div class="flex items-center gap-3">
        <input
          :id="props.label?.toLowerCase().replace(/ /g, '-')"
          v-model="modelMin"
          :name="props.label"
          v-bind="$attrs"
          autocomplete="on"
          type="number"
          class="default-input"
        >
        <span class="text-center">-</span>
        <input
          :id="props.label?.toLowerCase().replace(/ /g, '-')"
          v-model="modelMax"
          :name="props.label"
          v-bind="$attrs"
          autocomplete="on"
          type="number"
          class="default-input"
        >
      </div>
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