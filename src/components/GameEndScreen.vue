<template>
  <div
    class="w-3/4 h-3/4 mt-12 grid place-items-center font-mono bg-black/80 text-white mx-auto"
  >
    <div>Your Score: {{ details.score }}</div>
    <div class="text-5xl" :class="result.className">
      {{ result.result }}
    </div>
    <button
      class="border border:blue-500 p-4 rounded hover:bg-blue-200 hover:text-blue-500 active:bg-blue-700"
      @click="restart"
    >
      RESTART
    </button>
  </div>
</template>

<script>
import { GameEnd, OptionalGameStatus } from '../types/types'

export default {
  data() {
    return {
      details: this.$accessor.gameEndDetails,
    }
  },
  computed: {
    result() {
      const className =
        this.details.result === GameEnd.LOSER
          ? 'text-red-700 font-distorted'
          : 'text-yellow-500 font-anakin'

      const result =
        this.details.result === GameEnd.LOSER ? 'YOU LOST!' : 'YOU WON!'

      return { result, className }
    },
  },
  methods: {
    restart() {
      this.$accessor.resetGame()
      this.$accessor.setGameState(OptionalGameStatus.START)
    },
  },
}
</script>
