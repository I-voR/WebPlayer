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
        <input
          id="inputProgress"
          class="slider"
          value="0"
          step="1"
          type="range"
          @change="changeProgress"
          @mousedown="pauseProgress"
          @mouseup="playProgress"
        />
      </div>

      <div id="volume">
        <input
          id="inputVolume"
          class="slider"
          value="1"
          step="0.01"
          min="0"
          max="1"
          type="range"
          @mousemove="changeVolume"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebPlayer",
  props: { msg: String },
  data() {
    return { playing: false, playingDuringCLick: false };
  },
  mounted() {
    //akcja
    this.$store.dispatch("getPostsAction");
    console.log("comp mounted", new Date().getMilliseconds())
  },
  methods: {
    play: async function () {
      this.playing = true;
      this.playingDuringCLick = true;
      console.log("playing");

      document.getElementById("audio").play();
    },
    pause: function () {
      this.playing = false;
      this.playingDuringCLick = false;
      console.log("paused");

      document.getElementById("audio").pause();
    },
    nextSong: function () {
      console.log("nextSong");
    },
    prevSong: function () {
      console.log("prevSong");
    },
    changeProgress: function () {
      document.getElementById("audio").pause();
      document.getElementById("audio").currentTime = document.getElementById(
        "inputProgress"
      ).value;
      document.getElementById("audio").play();
    },
    prevSong: function () {
      console.log("prevSong");
    },
    changeProgress: function () {
      document.getElementById("audio").currentTime = document.getElementById(
        "inputProgress"
      ).value;
    },
    pauseProgress: function () {
      if (!this.playingDuringCLick) {
        document.getElementById("audio").pause();
        this.playing = false;
      }
    },
    playProgress: function () {
      if (this.playingDuringCLick) {
        this.playing = true;
        document.getElementById("audio").play();
      }
    },
    changeVolume: function () {
      document.getElementById("audio").volume = document.getElementById(
        "inputVolume"
      ).value;
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
