import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data: {
    playing: false,
  },
  methods: {
    play: async function (event) {
      playBt.playing = !playBt.playing
      console.log('playing')

      document.getElementById('audio').play()

      while (playBt.playing) {
        await new Promise(r => window.setTimeout(r, 10))
        document.getElementById('input').value = parseInt(document.getElementById('audio').currentTime)
      }
    },
    pause: function (event) {
      playBt.playing = !playBt.playing
      console.log('paused')

      document.getElementById('audio').pause()
    }
  }
})

new Vue({
  data: { },
  methods: {
    prevSong: function (event) {
      console.log('prevSong')
    }
  }
})

new Vue({
  data: { },
  methods: {
    nextSong: function (event) {
      console.log('nextSong')
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
