<template>
  <div class="hero is-fullheight">
    <div class="hero-head">
      <div class="container">
        <div v-for="word in words" class="word-container">
          <p class="title word-card init-transition">{{word}}</p>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div v-if="wordsLength < 0" class="container">
        <label class="label">Please enter a phrase:</label>
        <div class="control">
          <div class="field">
            <textarea class="textarea is-primary" placeholder="Phrase..." v-model="phrase"></textarea>
          </div>
          <div class="field">
            <a @click="parsePhrase" class="button is-large is-primary is-fullwidth">Let's Go!</a>
          </div>
        </div>
        <div class="control">
        </div>
      </div>
      <div v-if="wordsLength > 0" @click="checkIt" class="container">
        <a class="button is-large is-primary is-rounded word-check is-fullwidth">Check Order</a>
      </div>
    </div>
  </div>
</template>

<script>

  import * as interact from 'interactjs';

  interact('.word-card')
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({ x: 1, y: 70 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      },
      inertia: true,
      restrict: {
        restriction: "body",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,

      onend: function(event) {
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
      }

    });

  function dragMoveListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy,
        deg = Math.floor(Math.random() * (10 - (-10)) + 1) -10;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }



  export default {

    name: 'HelloWorld',

    data () {
      return {
        phrase: 'Frosted Waffle, please!',
        success: false,
        words: [],
      }
    },

    methods: {

      parsePhrase: function() {
        this.words = this.phrase.split(' ');

        this.$nextTick(function () {

          const cards = document.querySelectorAll('.word-card'),
          bounds = document.querySelector('.hero').getBoundingClientRect();

          cards.forEach(function (card) {
            const cardBounds = card.getBoundingClientRect();

            const x = Math.floor(Math.random() * (bounds.width - cardBounds.width - cardBounds.x + 1));
            let ranY = Math.floor(Math.random() * (bounds.height - cardBounds.height + 1));
            const y = ranY - (ranY % cardBounds.height); // Round in order to stay in between row lines

            // translate the element
            card.style.webkitTransform =
              card.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            card.setAttribute('data-x', x.toString());
            card.setAttribute('data-y', y.toString());
            setTimeout(function() {
              card.classList.remove("init-transition");
              card.classList.add("reg-transition");
            }, 1000);
          });
        });

      },

      checkIt: function() {
        const cards = document.querySelectorAll('.word-card');
        let cardOrder;
        const cardsMax = cards.length-1;
        let phraseCheck = '';

        cardOrder = Array.from(cards).sort(function (card1, card2) {
          const card1Pos = card1.getBoundingClientRect();
          const card2Pos = card2.getBoundingClientRect();

          if (card2Pos.y - card1Pos.y > 0) { return -1; } // card1 is before
          if (card2Pos.y - card1Pos.y === 0) {
            if (card2Pos.x - card1Pos.x >= 0) { return -1; } // card1 is before
          }
          return 1; // card1 is after
        });

        cardOrder.forEach((card, index) => {
          if ( index == cardsMax ) {
            phraseCheck += card.textContent;
          } else {
            phraseCheck += card.textContent + ' ';
          }
        });

        if (phraseCheck == this.phrase) {
          alert("YAY! You did it!");
          this.words = [];
        } else {
          alert("Try again!");
        }
      }

    },

    computed: {
      wordsLength: function() {
        return this.words.length -1;
      }
    }
  }
</script>

<style>

  body {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+41,000000+42,000000+42,ffffff+43&0.65+0,1+100 */
    background: url("../assets/brick.png") repeat;
  }

  .word-container {
    display: inline-block;
  }

  .word-card {
    padding: 15px 25px;
    margin-right: 10px;
    border: 1px solid rgb(33, 33, 33);
    display: inline-block;
    z-index: 10;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .2);

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,e5e5e5+100;White+3D */
    background: rgb(255,255,255); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(209,209,209,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(209,209,209,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(209,209,209,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }

  .init-transition {
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -ms-transition: 1s;
    -o-transition: 1s;
    transition: 1s;
  }

  .reg-transition {
    -webkit-transition: 200ms;
    -moz-transition: 200ms;
    -ms-transition: 200ms;
    -o-transition: 200ms;
    transition: 200ms;
  }

  .hero-head {
    height: 75%;
  }
</style>
