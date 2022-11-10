<template>
  <div class="h-full relative">
    <SelectSide v-if="selectScreen" />
    <SelectDifficulty v-else-if="difficultyScreen" />
    <GameScreen v-else-if="gameScreen" />
    <GameEndScreen v-else-if="gameEndScreen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { OptionalGameStatus } from '../types/types'
export default Vue.extend({
  computed: {
    selectScreen() {
      return this.$accessor.gameSettings.gameStatus === OptionalGameStatus.START
    },
    difficultyScreen() {
      return (
        this.$accessor.gameSettings.gameStatus ===
        OptionalGameStatus.SIDE_CHOSEN
      )
    },
    gameScreen() {
      return (
        this.$accessor.gameSettings.gameStatus ===
        OptionalGameStatus.DIFF_CHOSEN
      )
    },
    gameEndScreen() {
      return (
        this.$accessor.gameSettings.gameStatus === OptionalGameStatus.GAME_END
      )
    },
  },
  mounted() {
    this.$accessor.resetGame()
  },
})
</script>
