<template>
  <button
    class="relative border border-white font-classic text-5xl grid place-items-center grayscale hover:grayscale-0"
    @click="selectSide(currText)"
  >
    <img
      :alt="currText"
      :src="currImg"
      class="h-full"
      :class="`${isSith ? '-scale-x-100' : ''}`"
    />
    <span
      class="absolute top-2 text-white"
      :class="`${isSith ? 'right-4' : 'left-4'}`"
      >{{ currText }}</span
    >
  </button>
</template>

<script lang="ts">
import { OptionalSide } from '../types/types'
export default {
  props: { img: String, text: OptionalSide },

  computed: {
    isSith(props) {
      return props.text === OptionalSide.SITH
    },
    currText(props) {
      return props.text
    },
    currImg(props) {
      return props.img
    },
  },
  methods: {
    selectSide(side: OptionalSide) {
      this.$accessor.setSelectedSide(side)
    },
  },
}
</script>

<style scoped></style>
