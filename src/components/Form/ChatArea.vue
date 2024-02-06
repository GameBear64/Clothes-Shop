<script setup>
  import { emojiParser } from '@utils/utils';

  const props = defineProps(['label', 'class', 'modelValue'])
  const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <textarea
    :id="props.label?.toLowerCase().replace(/ /g, '-')"
    :name="props.label"
    :value="modelValue"
    :class="props.class"
    v-bind="$attrs"
    class="h-10 resize-none overflow-hidden p-2 outline-none"
    @input="emit('update:modelValue', emojiParser($event.target.value))"
  />
</template>