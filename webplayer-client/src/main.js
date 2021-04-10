import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

function load() {
  document.getElementById('audio').src = 'http://localhost:3000/Pawe%C5%82%20Kosza%C5%82ka/Wr%C3%B3%C4%87.mp3'
  document.getElementById('audio').load()

  document.getElementById('audio').onloadedmetadata = () => {
    document.getElementById('input').max = document.getElementById('audio').duration
  }
}

let app = new Vue({
  el: '#app',
  data: {
    title: 'Song title: '

  }
})

app.title += ' title'

let playBt = new Vue({
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

let prevBt = new Vue({
  el: '#prev',
  data: {
  },
  methods: {
    prevSong: function (event) {
      console.log('prevSong')
    }
  }
})

let nextBt = new Vue({
  el: '#next',
  data: {
  },
  methods: {
    nextSong: function (event) {
      console.log('nextSong')
    }
  }
})

load()