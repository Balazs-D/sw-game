<template>
  <div
    class="bg-white rounded text-black mx-auto w-3/4 p-12 mx-auto font-classic text-2xl flex"
  >
    <div class="relative flex flex-col">
      <div>instructions</div>
      <div class="font-anakin my-4 text-xl mt-12 mb-16">
        Select all enemies based on the side of your choice. There are no
        enemies to see click on the "move on" button if you think.
      </div>

      <div class="grid grid-cols-2 gap-8 mt-8">
        <div v-for="d in data" :key="d.side" class="flex flex-col">
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
    <img alt="yoda" src="../assets/images/yoda.png" class="h-auto relative" />
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
