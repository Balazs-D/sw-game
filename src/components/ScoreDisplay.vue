<template>
  <div class="rounded pt-2 px-2 text-3xl bg-black text-white">
    SCORE: {{ score }}
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
}
</script>
