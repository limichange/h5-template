<template lang="html">
  <transition name="fade">
    <div class="loadingPage page" @click="click">
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loadingPage',
  data () {
    return {
      num: 0
    }
  },
  computed: {
    progressStyle () {
      return {
        height: `${this.num * 2.5}px`
      }
    }
  },
  mounted () {
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="css" scoped>
.loadingPage {
}
</style>
