<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body {
    background: url("./assets/brick.png") repeat;
    font-family: 'Finger Paint', cursive;
  }

  .title-heading {
    font-size: 11vh;
    color: white;
  }

  .title {
    color: white;
  }

  .button {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2rem !important;
  }

  .button.is-large {
    height: 100px;
  }

</style>
