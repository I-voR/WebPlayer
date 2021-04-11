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

      <div id="input-container">
        <input id="input" class="slider" value="0" step="1" type="range"
          @change="changeInput">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebPlayer",
  props: {
    msg: String,
  },
  data() {
    return {
      playing: false,
    };
  },
  methods: {
    play: async function (event) {
      this.playing = !this.playing
      console.log("playing")

      document.getElementById("audio").play()

      while (this.playing) {
        await new Promise((r) => window.setTimeout(r, 10))
        document.getElementById("input").value = parseInt(
          document.getElementById("audio").currentTime)

          if (document.getElementById("audio").currentTime === document.getElementById('audio').duration) {
            document.getElementById('input').value = 0
            this.playing = !this.playing
            console.log("stopped")
          }
      }
    },
    pause: function (event) {
      this.playing = !this.playing
      console.log("paused")

      document.getElementById("audio").pause()
    },
    nextSong: function (event) {
      console.log("nextSong")
    },
    prevSong: function (event) {
      console.log("prevSong")
    },
    changeInput: function () {
      document.getElementById('audio').currentTime = document.getElementById('input').value
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
