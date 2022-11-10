<template>
  <div class="w-full text-8xl flex justify-center grid col-span-5 absolute">
    {{ startCounter }}
  </div>
</template>

<script>
export default {
  props: {
    startCounter: {
      type: Number,
      required: true,
    },
  },
}
</script>
