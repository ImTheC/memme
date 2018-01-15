<template>
  <div class="container is-fullwidth">

    <p class="title-heading title-size-11">Please enter a phrase:</p>

    <div class="control extra-margin">
      <div class="field">
        <textarea class="textarea is-primary" rows="6" placeholder="Phrase..." v-model="phrase"></textarea>
      </div>
      <div class="field">
        <a @click="goToPhraseWall" :disabled="!phrase" class="button is-large is-primary is-fullwidth">Let's Go!</a>
      </div>
      <div class="field">
        <a @click="goBack" class="button is-info is-fullwidth"><< Go Back</a>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'enter-phrase',

    props: {
      goBack: {
        type: Function,
        required: true
      }
    },

    data () {
      return {
        phrase: localStorage.getItem('phrase')
      }
    },

    methods: {

      goToPhraseWall: function () {
        if (this.phrase.length) {
          localStorage.setItem('phrase', this.phrase);
          this.$router.push('/phrase-wall');
        }
      }

    }

  };

</script>


<style scoped>
  .extra-margin {
    margin-top: 35px;
  }

  textarea {
    resize: none;
  }
</style>
