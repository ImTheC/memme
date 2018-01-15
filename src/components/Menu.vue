<template>
  <section class="container">
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="section">

          <p class="menu-heading">Please enter a phrase:</p>

          <div class="control extra-margin">
            <div class="field">
              <textarea class="textarea is-primary" rows="6" placeholder="Phrase..." v-model="phrase"></textarea>
            </div>
            <div class="field">
              <a @click="goToPhraseWall" :disabled="!phraseLength" class="button is-large is-primary is-fullwidth">Let's Go!</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      name: "Menu",

      data () {
        return {
          phrase: ''
        }
      },

      methods: {

        goToPhraseWall: function() {

          if (this.phrase.length) {
            localStorage.setItem("phrase", this.phrase);
            this.$router.push('/phrase-wall');
          }
        }

      },

      computed: {

        phraseLength: function() {
          return this.phrase.length;
        }

      },

      mounted: function() {
        this.phrase = localStorage.getItem('phrase');
      }
    };
</script>

<style>

</style>
