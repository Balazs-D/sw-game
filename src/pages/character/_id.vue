<template>
  <div class="flex w-4/5 border border-slate-100 m-auto bg-zinc-900 p-0">
    <img
      :alt="character.name"
      :src="character.image"
      class="w-auto h-[650px] border-r border-r-slate-100"
    />
    <div class="flex flex-col text-white p-6">
      <div class="text-4xl font-bold">{{ character.name }}</div>
      <div class="text-3xl">
        {{ capitalizeFirstLetterSpecies }} {{ isJediOrSith }}
      </div>

      <div class="text-xl font-bold mt-6 mb-2">Affiliations</div>
      <div v-for="affiliation in character.affiliations" :key="affiliation">
        {{ affiliation }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Character } from '~/src/types/types'

interface Data {
  id: string
}
export default defineComponent({
  data(): Data {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    character(): Character | undefined {
      return this.$accessor.allCharacters.find(
        (char) => char.id === Number(this.id)
      )
    },
    isJediOrSith(): string | undefined {
      let result = ''
      if (!this.character) return result

      for (let i = 0; i < this.character.affiliations.length; i++) {
        if (this.character.affiliations.includes('Sith')) {
          result = '| Sith'
        } else if (this.character.affiliations.includes('Jedi Order')) {
          result = '| Jedi'
        }
      }

      return result
    },
    capitalizeFirstLetterSpecies(): string {
      return (
        this.character!.species.charAt(0).toUpperCase() +
        this.character!.species.slice(1)
      )
    },
  },
})
</script>
