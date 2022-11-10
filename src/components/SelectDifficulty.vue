<template>
  <div
    class="flex flex-col align-center justify-center flex-grow h-full w-full"
  >
    <button
      v-for="difficulty in difficulties"
      :key="difficulty"
      class="text-4xl font-distorted p-4 pt-6 rounded-xl text-white border w-64 mx-auto my-6 bg-black shadow-red-900 hover:shadow-xl hover:bg-red-900"
      @click="setDifficulty(difficulty)"
    >
      {{ difficulty }}
    </button>
    <button
      class="text-4xl font-distorted p-4 pt-6 rounded-xl text-white w-64 mx-auto my-6 hover:text-red-900"
      @click="backToSideSelection"
    >
      Back
    </button>
  </div>
</template>

<script lang="ts">
import { OptionalDifficulty, OptionalGameStatus } from '../types/types'

export default {
  data() {
    return {
      difficulties: [
        OptionalDifficulty.EASY,
        OptionalDifficulty.MEDIUM,
        OptionalDifficulty.HARD,
      ],
    }
  },
  methods: {
    setDifficulty(diff: OptionalDifficulty) {
      this.$accessor.setSelectedDifficulty(diff)
    },
    backToSideSelection() {
      this.$accessor.setGameState(OptionalGameStatus.START)
    },
  },
}
</script>
