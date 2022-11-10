<template>
  <div
    class="w-[100vw] flex justify-between p-8 transition-all duration-700"
    :class="gameActive ? '-translate-y-full' : ''"
  >
    <NuxtLink
      v-for="route in routes"
      :key="route.path"
      class="bg-black border border-slate-600 text-slate-600 p-6 font-anakin hover:text-white hover:border-slate-100"
      :to="route.path"
      >{{ route.name }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Routes } from '../constants/routes'
import { OptionalGameStatus } from '../types/types'

export default {
  data() {
    return {
      routes: Routes,
    }
  },
  computed: {
    gameActive(): Boolean {
      return (
        this.$accessor.gameSettings.gameStatus ===
        OptionalGameStatus.DIFF_CHOSEN
      )
    },
  },
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply border-red-700 text-red-700;
}
</style>
