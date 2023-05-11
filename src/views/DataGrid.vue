<template>
  <div>
    <call-grid :calls="callList" />
  </div>
</template>

<script>
import CallGrid from '@/components/CallGrid.vue';

export default {
  components: {
    CallGrid
  },
  data() {
    return {
      callList: [
       
       
      ]
    }
  },
  // Your view's JavaScript code here
}
</script>

<style>
/* Your view's CSS code here */
</style>
