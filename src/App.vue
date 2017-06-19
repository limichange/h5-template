<template>
<div id="app">
  <indexPage @updatePage="updatePage" @click="page='game'" v-if="page === 'index'"/>
  <loadingPage @updatePage="updatePage" v-show="page === 'loading'"/>
</div>
</template>

<script>
import gta from './gta'
import loadingPage from './pages/loadingPage'
import indexPage from './pages/indexPage'

export default {
  name: 'app',
  data () {
    return {
      page: 'loading'
    }
  },
  watch: {
    page (val) {
      gta.event({
        category: 'page',
        action: `${val}`
      })
    }
  },
  components: {
    indexPage,
    loadingPage
  },
  methods: {
    updatePage (page) {
      this.page = page
    }
  }
}
</script>

<style>
</style>
