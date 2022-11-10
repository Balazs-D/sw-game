<template>
  <div class="rounded p-2 text-3xl flex flex-row" :class="countdownColor">
    Round Countdown:{{ (countDown / 60).toFixed(2) }}
  </div>
</template>

<script>
export default {
  props: {
    countDown: {
      type: Number,
      required: true,
    },
  },
  computed: {
    countdownColor() {
      if (this.countDown > 500) {
        return 'text-white bg-black'
      } else if (this.countDown > 250) {
        return 'text-red-300 bg-black'
      } else {
        return 'text-red-300 bg-red-700'
      }
    },
  },
}
</script>
