<template>
  <div class="flex flex-col">
    <div class="text-3xl text-white mx-auto m-24 font-episode">
      Select your side
    </div>
    <div class="grid-cols-2 grid gap-4 h-full">
      <SelectSideButton
        :text="jedi"
        :img="require('../assets/images/jedi.jpeg')"
        >{{ jedi }}</SelectSideButton
      >
      <SelectSideButton
        :text="sith"
        :img="require('../assets/images/sith.jpg')"
        >{{ sith }}</SelectSideButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { OptionalSide } from '../types/types'

export default Vue.extend({
  computed: {
    jedi() {
      return OptionalSide.JEDI
    },
    sith() {
      return OptionalSide.SITH
    },
  },
})
</script>
