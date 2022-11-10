<template>
  <div class="flex flex-col bg-black/70 rounded text-white mx-auto w-3/5">
    <div>Instructions</div>
    <div></div>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="d in data"
        :key="d.side"
        class="mx-auto font-classic text-2xl flex flex-col p-8"
      >
        <div class="mb-12">{{ d.side }}</div>
        <div
          v-for="rule in d.rules"
          :key="rule"
          class="font-anakin my-4 text-xl"
        >
          {{ rule }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          side: 'Jedi',
          rules: [
            'All enemies of a jedi you should shoot.',
            'Based on the difficulty, when you reached the number of possible fails, the game ends.',
          ],
        },
        {
          side: 'Sith',
          rules: [
            'Everyone as a sith you should shoot, expect other siths.',
            'If you shoot another sith the game ends.',
          ],
        },
      ],
    }
  },
}
</script>

<style scoped></style>
