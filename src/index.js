const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards()

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  function isLocked(card) {
    return card.classList.contains("blocked")
  }

  function lock(card) {
    card.classList.add("blocked")
    return card
  }

  function unlock(card) {
    card.classList.remove("blocked")
    return card
  }

  function lockBoard() {
    document.querySelectorAll('.card:not(.turned)').forEach((faceDownCard) => {
      lock(faceDownCard)
    })
  }

  function unLockBoard() {
    document.querySelectorAll('.card:not(.turned)').forEach((faceDownCard) => {
      unlock(faceDownCard)
    })
  }

  function turn(card) {
    card.classList.toggle("turned")
    return card
  }

  function increment(counter) {
    document.getElementById(counter).innerText++
  }

  function resetGame() {
    document.querySelectorAll('.card').forEach((card) => {
      unlock(turn(card))
    })
    document.getElementById("pairs-clicked").innerHTML = 0
    document.getElementById("pairs-guessed").innerHTML = 0
  }

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if (isLocked(card)) return

      let otherCard = document.querySelector(".card.turned:not(.blocked)")

      if (otherCard) {
        const card1 = card.getAttribute("data-card-name")
        const card2 = otherCard.getAttribute("data-card-name")
        lockBoard()
        increment("pairs-clicked");

        if (memoryGame.checkIfPair(card1, card2)) {
          unLockBoard()
          lock(card)
          lock(otherCard)
          increment("pairs-guessed");

          if (memoryGame.checkIfFinished()) {
            setTimeout(resetGame, 3000);
          }
        } else {
          setTimeout(() => {
            turn(card)
            turn(otherCard)
            unLockBoard()
          }, 1500)
         }
      }

      turn(card)
    });
  });
});
