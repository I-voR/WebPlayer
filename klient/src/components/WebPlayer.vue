<template>
    <div id="main">
      <h1>Tytuł piosenki: {{ msg }}</h1>
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
