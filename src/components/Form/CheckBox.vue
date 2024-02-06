<script setup>
  const props = defineProps(['label', 'class', 'error'])

  const model = defineModel({ required: true })
</script>

<template>
  <div :class="props.class">
    <div class="flex items-center gap-2">
      <input
        :id="props.label?.toLowerCase().replace(/ /g, '-')"
        v-model="model"
        :name="props.label"
        v-bind="$attrs"
        type="checkbox"
        class="size-5 "
      >
      <label
        :for="props.label?.toLowerCase().replace(/ /g, '-')"
        class="text-sm font-medium leading-5"
      >
        {{ props.label }}
      </label>
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