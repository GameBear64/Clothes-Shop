<script setup>
import DangerZone from '@components/Settings/DangerZone.vue';
import Security from '@components/Settings/Security.vue';
import Themes from '@components/Settings/Themes.vue';
import User from '@components/Settings/User.vue';
</script>

<template>
  <div class="mx-auto my-4 mb-20 w-10/12 md:w-1/2 xl:w-2/6">
    <Themes />
    <User />
    <Security />
    <DangerZone />
  </div>
</template>
