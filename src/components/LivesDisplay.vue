<template>
  <div class="rounded pt-2 px-2 text-3xl bg-black text-white">
    Possible Fails: {{ fails }}
  </div>
</template>

<script>
export default {
  props: {
    fails: {
      type: Number,
      required: true,
    },
  },
}
</script>
