<template>
  <div class="hero is-fullheight">
    <div class="hero-body">

      <div v-if="option == 'menu'" class="container">
        <p class="title">MENU:</p>

        <div class="control extra-margin">
          <div class="field">
            <a @click="option = 'custom'" class="button is-large is-primary is-fullwidth">Custom Phrase</a>
          </div>
          <div class="field">
            <a @click="goToQod" class="button is-large is-primary is-fullwidth">Quote of the Day</a>
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
          this.$router.push({ path: '/'});
        },

        goToQod: function() {
          if (localStorage.getItem('day') != this.today && !localStorage.getItem('phrase')) {
            $.get("https://quotes.rest/qod", (res) => {
              localStorage.setItem('copyright', res.contents.copyright);
              localStorage.setItem('phrase', res.contents.quotes[0].quote);
              localStorage.setItem('author', res.contents.quotes[0].author);
              localStorage.setItem('day', new Date().getDay());
              this.$router.push({path: '/phrase-wall', query: {copy: 'true'}});
            });
          } else {
            this.$router.push({path: '/phrase-wall', query: {copy: 'true'}});
          }
        }

      },

      computed: {
        today: function() {
          return new Date().getDay();
        }
      },

      mounted: function() {
        this.option = this.$router.currentRoute.query.menu || 'menu';
      }

    };
</script>

<style>

</style>
