<template>
  <button @click="$emit('onShoot')">
    <div
      class="border border-blue-900 bg-gradient-to-r from-neutral-700 to-black h-[380px] overflow-hidden flex flex-col justify-end relative transition-all duration-300"
      :class="generateCardClass"
    >
      <img
        alt="props.character.name"
        :src="character.image"
        class="object-cover object-top h-[380px] w-[100%] absolute z-0"
      />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GameCharacter } from '~/src/components/GameScreen.vue'

export enum CardState {
  FAIL = 'FAIL',
  GOTCHA = 'GOTCHA',
  IN_GAME = 'IN_GAME',
  HIDDEN = 'HIDDEN',
}

export default defineComponent({
  props: {
    character: {
      type: Object as PropType<GameCharacter>,
      required: true,
    },
    cardState: {
      type: String as PropType<CardState>,
      default: CardState.HIDDEN,
      required: true,
    },
  },
  data() {
    return {
      showCard: false,
    }
  },
  computed: {
    generateCardClass() {
      let res: string = ''
      switch (this.cardState) {
        case CardState.HIDDEN: {
          res = 'opacity-0 translate-y-4'
          break
        }
        case CardState.IN_GAME: {
          res = 'opacity-1 translate-y-0'
          break
        }
        case CardState.FAIL: {
          res =
            'opacity-1 translate-y-0 border-5 border-red-500 shadow-2xl shadow-red-500'
          break
        }
        case CardState.GOTCHA: {
          res = 'opacity-0 -translate-y-4'
          break
        }
      }
      return res
    },
  },
})
</script>

<style scoped></style>
