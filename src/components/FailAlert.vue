<template>
  <div class="absolute w-full text-white flex justify-center text-3xl -top-8">
    <div
      v-for="fail in fails"
      :key="fails.indexOf(fail)"
      class="mx-8 bg-red-700 rounded-xl p-4"
    >
      {{ fail }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fails() {
      return Array(Math.floor(Math.random() * (7 - 2 + 1)) + 2).fill('FAIL')
    },
  },
}
</script>
