import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#play',
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
  el: '#prev',
  data: {
  },
  methods: {
    prevSong: function (event) {
      console.log('prevSong')
    }
  }
})

new Vue({
  el: '#next',
  data: {
  },
  methods: {
    nextSong: function (event) {
      console.log('nextSong')
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
