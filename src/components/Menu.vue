<template>
  <div class="hero is-fullheight">
    <div class="hero-body">

      <div v-if="option == 'menu'" class="container">
        <p class="title">MENU:</p>

        <div class="control extra-margin">
          <div class="field">
            <a @click="option = 'custom'" class="button is-large is-primary is-fullwidth">Custom Phrase</a>
          </div>
        </div>

      </div>

      <enter-phrase v-if="option == 'custom'" :goBack="goBack"></enter-phrase>


    </div>
  </div>
</template>

<script>

    import EnterPhrase from './EnterPhrase.vue';

    export default {
      components: {
        'enter-phrase': EnterPhrase
      },

      name: "Menu",

      data () {
        return {
          phrase: '',
          option: 'menu'
        }
      },

      methods: {

        goBack: function () {
          this.option = 'menu';
        }

      }

    };
</script>

<style>

</style>
