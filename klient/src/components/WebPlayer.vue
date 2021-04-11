<template>
  <div id="main">

    <h1>Tytuł piosenki: {{ msg }}</h1>

    <div id="button-container">

      <div id="prev">
        <button @click="prevSong">
          <img class="controls" src="http://localhost:3000/prevSong.svg" />
        </button>
      </div>

      <div id="play">
        <button v-if="!playing" @click="play">
          <img class="controls" src="http://localhost:3000/play.svg" />
        </button>

        <button v-if="playing" @click="pause">
          <img class="controls" src="http://localhost:3000/pause.svg" />
        </button>
      </div>

      <div id="next">
        <button @click="nextSong">
          <img
            class="controls"
            style="transform: rotate(180deg)"
            src="http://localhost:3000/prevSong.svg"
          />
        </button>
      </div>

    </div>

    <div id="input-container">
      <div id="progress">
        <input id="inputProgress" class="slider" value="0" step="1" type="range" @change="changeProgress" @mousedown="pause" @mouseup="play">
      </div>

      <div id="volume">
        <input id="inputVolume" class="slider" value="1" step="0.01" min="0" max="1" type="range" @mousemove="changeVolume">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WebPlayer',
  props: { msg: String },
  data() { return { playing: false, } },
  methods: {
    play: async function (event) {
      this.playing = !this.playing;
      console.log('playing')

      document.getElementById('audio').play()

      while (this.playing) {
        await new Promise((r) => window.setTimeout(r, 10))
        document.getElementById('inputProgress').value = parseInt(
          document.getElementById('audio').currentTime)

          if (document.getElementById('audio').currentTime === document.getElementById('audio').duration) {
            document.getElementById('inputProgress').value = 0
            this.playing = !this.playing
            console.log('stopped')
          }
      }
    },
    pause: function() {
      this.playing = !this.playing
      console.log('paused')

      document.getElementById('audio').pause()
    },
    nextSong: function() { console.log('nextSong') },
    prevSong: function() { console.log('prevSong') },
    changeProgress: function() {
      document.getElementById('audio').currentTime = document.getElementById('inputProgress').value
    },
    changeVolume: function() {
      document.getElementById('audio').volume = document.getElementById('inputVolume').value
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
