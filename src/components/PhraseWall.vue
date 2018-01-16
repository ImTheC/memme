<template>
  <div class="container">
    <div class="hero is-fullheight">
        <p class="copyright">Quote courtesy: {{copyright}}</p>
        <div class="hero-head">
          <div class="section">
            <a @click="goBack" class="button is-info word-check"><< Go Back</a>
            <a @click="checkIt" class="button is-medium is-primary word-check">Check Order</a>
            <div v-for="word in words" class="word-container">
              <p class="title word-card init-transition">{{word}}</p>
            </div>
          </div>
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

    name: 'PhraseWall',

    data () {
      return {
        success: false
      }
    },

    methods: {
      goBack: function () {
        this.$router.push({ path: '/'});
      },

      parsePhrase: function() {
        this.$nextTick(function () {

          const cards = document.querySelectorAll('.word-card'),
          bounds = document.querySelector('.hero').getBoundingClientRect();

          cards.forEach(function (card) {
            const cardBounds = card.getBoundingClientRect();

            const x = Math.floor(Math.random() * (bounds.width - cardBounds.width - cardBounds.x + 1));
            const y = Math.floor(Math.random() * (bounds.height - cardBounds.width -  cardBounds.y + 1));

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
          this.$router.push({ path: '/', query: { menu: 'custom' }});
        } else {
          alert("Try again!");
        }
      }

    },

    computed: {
      words: function() {
        const wordsArr = this.phrase.split(' ');
        wordsArr.push("- " + localStorage.getItem('author'));
        return wordsArr;
      },
      phrase: function() {
        return localStorage.getItem('phrase');
      },
      copyright: function() {
        return localStorage.getItem('copyright');
      }
    },

    mounted: function() {
      this.parsePhrase();
    }
  }
</script>

<style scoped>
  .word-container {
    display: inline-block;
  }

  .word-card {
    display: inline-block;
    z-index: 10;

    color: black;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.125;

    padding: 15px 25px;
    margin-right: 10px;
    border: 1px solid rgb(33, 33, 33);
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

  .copyright {
    position: fixed;
    top: 10px;
    right: 15px;
    color: white;
  }
</style>
