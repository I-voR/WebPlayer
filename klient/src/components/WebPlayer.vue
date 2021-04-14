<template>
  <div id="main">
    <h1>Tytuł piosenki: {{ title }}</h1>
    <div id="albums">
      <div class="album" v-for="(dir, i) in listTracks.dirs" v-bind:key="i">
        <button class="albumButton" @click="print(listTracks.files[i], listTracks.dirs[i])">
          <img
            class="cover"
            v-bind:src="'http://localhost:3000/' + listTracks.dirs[i] + '.jpg'"
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
        <button @click="songSwitch('prev')">
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
        <button @click="songSwitch('next')">
          <img
            class="controls"
            style="transform: rotate(180deg)"
            src="http://localhost:3000/prevSong.svg"
          />
        </button>
      </div>

      <div id="timer">{{ time }}</div>
    </div>

    <div id="progress-container">
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
    </div>
    <div id="input-container">
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
      title: "",
      time: "00:00",
    };
  },
  mounted() {
    //akcja
    this.$store.dispatch("getPostsAction");
    console.log("comp mounted", new Date().getMilliseconds());
  },
  methods: {
    songSwitch: function (direction) {
      let songBefore = this.title + ".mp3";
      if (
        songBefore != ".mp3" &&
        this.songlist.songs != undefined &&
        this.songlist.songs != []
      ) {
        this.time = "00:00";
        let counter = this.songlist.songs.indexOf(songBefore);
        var songName;
        switch (direction) {
          case "prev":
            console.log("prev");
            if (counter == 0) {
              counter = this.songlist.songs.length - 1;
            } else {
              counter--;
            }

            songName = this.songlist.songs[counter];
            this.title = songName.split(".")[0];
            this.playing = false;
            document.getElementById("audio").src =
              "http://localhost:3000/" + this.songlist.album + "/" + songName;
            document.getElementById("audio").load();
            break;
          case "next":
            if (counter == this.songlist.songs.length - 1) {
              counter = 0;
            } else {
              counter++;
            }
            //console.log(counter);
            //console.log(this.songlist.songs);
            //console.log(this.songlist.songs[counter]);

            songName = this.songlist.songs[counter];
            this.title = songName.split(".")[0];
            this.playing = false;
            document.getElementById("audio").src =
              "http://localhost:3000/" + this.songlist.album + "/" + songName;
            document.getElementById("audio").load();
            break;
        }
      }

      this.playing = true;
      this.playingDuringCLick = true;
      console.log("playing");

      document.getElementById("audio").play();

      document
        .getElementById("audio")
        .addEventListener(
          "timeupdate",
          () =>
            (this.time = timer(
              document.getElementById("audio").currentTime.toFixed()
            ))
        );
    },
    setMusicUrl: function (songName) {
      this.time = "00:00";
      this.title = songName.split(".")[0];
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
        return this.songlist.songs[num].file + ` [${Math.round(this.songlist.songs[num].size * 100 / 1048576) / 100}MB]`;
      }
    },
    play: async function () {
      function timer(input) {
        let time = parseInt(input);
        let minutes = Math.trunc(time / 60);
        let seconds = time % 60;
        seconds = seconds.toString();
        minutes = minutes.toString();
        if (minutes == undefined) {
          minutes = 0;
        }
        if (minutes.length == 1) {
          minutes = "0" + minutes;
        }
        if (seconds.length == 1) {
          seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
      }

      this.playing = true;
      this.playingDuringCLick = true;
      console.log("playing");

      document.getElementById("audio").play();

      document
        .getElementById("audio")
        .addEventListener(
          "timeupdate",
          () =>
            (this.time = timer(
              document.getElementById("audio").currentTime.toFixed()
            ))
        );
    },
    pause: function () {
      this.playing = false;
      this.playingDuringCLick = false;
      console.log("paused");

      document.getElementById("audio").pause();
    },
    changeProgress: function () {
      document.getElementById("audio").pause();
      document.getElementById("audio").currentTime = document.getElementById(
        "inputProgress"
      ).value;
      document.getElementById("audio").play();
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
