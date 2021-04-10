<template>
  <div id="app">
    <WebPlayer msg="<piosenka>"/>
  </div>
</template>

<script>
import WebPlayer from './components/WebPlayer.vue'

export default {
  name: 'App',
  components: {
    WebPlayer
  }
}
</script>
