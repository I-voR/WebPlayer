<template>
    <div id="main">
      <h1>Tytuł piosenki: {{ msg }}</h1>

      <div id="prev">
        <button v-on:click="prevSong">
          <img class="controls" src="http://localhost:3000/prevSong.svg" />
        </button>
      </div>
      <div id="play">
        <button v-if="!playing" v-on:click="play">
          <img class="controls" src="http://localhost:3000/play.svg" />
        </button>

        <button v-if="playing" v-on:click="pause">
          <img class="controls" src="http://localhost:3000/pause.svg" />
        </button>
      </div>
      <div id="next">
        <button v-on:click="nextSong">
          <img class="controls" style="transform: rotate(180deg);" src="http://localhost:3000/prevSong.svg" />
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'WebPlayer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
