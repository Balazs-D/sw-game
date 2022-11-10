<template>
  <div class="overflow-y-scroll scrollbar-none grid grid-cols-5 gap-4">
    <CharacterCard
      v-for="character in allCharacters"
      :key="character.name"
      :character="character"
    />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      allCharacters: this.$accessor.allCharacters,
    }
  },
}
</script>

<style scoped></style>
