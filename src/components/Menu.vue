<template>
  <div class="hero is-fullheight">
    <div class="hero-body">

      <div v-if="option == 'menu'" class="container">
        <p class="title">MENU:</p>

        <div class="control extra-margin">
          <div class="field">
            <a @click="goToCustom" class="button is-large is-primary is-fullwidth">Custom Phrase</a>
          </div>
          <div class="field">
            <a @click="goToQod" :class="{'is-loading': loading}" class="button is-large is-primary is-fullwidth">Quote of the Day</a>
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
          option: 'menu',
          loading: false
        }
      },

      methods: {

        goBack: function () {
          this.option = 'menu';
          this.$router.push({ path: '/'});
        },

        goToQod: function() {
          this.loading = true;
          if (localStorage.getItem('day') != this.today) {
            $.get("https://quotes.rest/qod", (res) => {
              localStorage.setItem('copyright', res.contents.copyright);
              localStorage.setItem('qod', res.contents.quotes[0].quote);
              localStorage.setItem('author', res.contents.quotes[0].author);
              localStorage.setItem('day', new Date().getDay());
              // this.loading = false;
              this.$router.push({path: '/phrase-wall', query: {qod: 'true'}});
            });
          } else {
            // this.loading = false;
            this.$router.push({path: '/phrase-wall', query: {qod: 'true'}});
          }
        },

        goToCustom: function() {
          this.option = 'custom';
          this.$router.push({path: '/', query: {menu: 'custom'}});
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
