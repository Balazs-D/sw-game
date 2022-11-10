<template>
  <div
    class="flex h-screen flex-1 grow flex-col bg-cover bg-no-repeat overflow-hidden"
    :class="gameScreen ? 'bg-fight cursor-cell' : 'bg-stars'"
  >
    <AppNav />
    <Nuxt class="p-2" />
  </div>
</template>

<script lang="ts">
import AppNav from '../components/AppNav.vue'
import { OptionalGameStatus } from '../types/types'

export default {
  components: { AppNav },
  computed: {
    gameScreen() {
      return (
        this.$accessor.gameSettings.gameStatus ===
        OptionalGameStatus.DIFF_CHOSEN
      )
    },
  },
  mounted() {
    if (this.$accessor.allCharacters.length !== 0) return
    this.$accessor.getAllCharacters()
  },
}
</script>

<style scoped></style>
