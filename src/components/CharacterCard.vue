<template>
  <NuxtLink :to="`/character/${props.character.id}`">
    <div
      class="border border-orange-900 bg-gradient-to-r from-neutral-700 to-black h-[380px] overflow-hidden flex flex-col justify-end relative"
    >
      <img
        alt="props.character.name"
        :src="props.character.image"
        class="object-cover object-top h-[380px] w-[100%] absolute z-0"
      />
      <div
        class="bg-black relative z-1 p-2 m-2 text-white font-episode rounded"
      >
        {{ props.character.name }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Character } from '~/src/types/types'

interface Props {
  character: Character
}

const props = defineProps<Props>()
</script>

<style scoped></style>
