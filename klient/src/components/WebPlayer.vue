<template>
  <div id="main">
    <h1>Tytuł piosenki: {{ msg }}</h1>
    <div id="albums">
      <div class="album" v-for="(dir, i) in listTracks.dirs" v-bind:key="i">
        <button @click="print(listTracks.files[i], listTracks.dirs[i])">
          <img
            v-bind:src="'http://localhost:3000/' + listTracks.dirs[i] + '.jpg'"
            style="width: 225px; height: 225px"
          />
        </button>
      </div>
    </div>
    <div id="songs">
      <div class="song" v-for="(dir, i) in songs()" v-bind:key="i">
        <button class="songButton" @click="setMusicUrl(songs(i))">
          {{ songs(i) }}
        </button>
      </div>
    </div>

    <br />
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
    return {
      playing: false,
      playingDuringCLick: false,
      songlist: { show: false, songs: [], album: "" },
    };
  },
  mounted() {
    //akcja
    this.$store.dispatch("getPostsAction");
    console.log("comp mounted", new Date().getMilliseconds());
  },
  methods: {
    setMusicUrl: function (songName) {
      this.playing = false;
      console.log(
        "http://localhost:3000/" + this.songlist.album + "/" + songName
      );
      document.getElementById("audio").src =
        "http://localhost:3000/" + this.songlist.album + "/" + songName;
      document.getElementById("audio").load();
    },
    print: function (printing, albumName) {
      if (this.songlist.show && this.songlist.songs == printing) {
        this.songlist.show = false;
        this.songlist.songs = [];
        this.songlist.album = "";
      } else {
        this.songlist.show = true;
        this.songlist.songs = printing;
        this.songlist.album = albumName;
        console.log(this.songlist.show);
        console.log(this.songlist.songs);
      }
      console.log(printing);
    },
    songs: function (num) {
      if (num == null || num == undefined) {
        return this.songlist.songs;
      } else {
        return this.songlist.songs[num];
      }
    },
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
  computed: {
    listTracks() {
      return this.$store.getters.getAllPosts;
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
