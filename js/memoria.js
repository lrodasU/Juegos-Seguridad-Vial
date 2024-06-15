document.addEventListener('DOMContentLoaded', () => {
    console.log("Working");
    //list all card options
    const cardArray = [
      {
        name: 'cruce caminos',
        img: '../images/Memoria/cruce de caminos.png'
      },
      {
        name: 'stop',
        img: '../images/Memoria/stop.png'
      },
      {
        name: 'giro u',
        img: '../images/Memoria/uturn.png'
      },
      {
        name: 'cruz San Andres',
        img: '../images/Memoria/cruz de san andres.png'
      },
      {
        name: 'curva peligrosa',
        img: '../images/Memoria/curva.png'
      },
      {
        name: 'gomeria',
        img: '../images/Memoria/gomeria.png'
      },
      {
        name: 'cruce caminos',
        img: '../images/Memoria/cruce de caminos.png'
      },
      {
        name: 'stop',
        img: '../images/Memoria/stop.png'
      },
      {
        name: 'giro u',
        img: '../images/Memoria/uturn.png'
      },
      {
        name: 'cruz San Andres',
        img: '../images/Memoria/cruz de san andres.png'
      },
      {
        name: 'curva peligrosa',
        img: '../images/Memoria/curva.png'
      },
      {
        name: 'gomeria',
        img: '../images/Memoria/gomeria.png'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.getElementById('grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', '../images/Memoria/images.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', '../images/Memoria/images.png')
        cards[optionTwoId].setAttribute('src', '../images/Memoria/images.png')
        alert ('Seleccionaste dos veces la misma carta')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        alert('Haz encontrado un par')
        cards[optionOneId].setAttribute('src', '../images/Memoria/blanco.png')
        cards[optionTwoId].setAttribute('src', '../images/Memoria/blanco.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', '../images/Memoria/images.png')
        cards[optionTwoId].setAttribute('src', '../images/Memoria/images.png')
        alert('Intentalo de nuevo')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = '¡Felicitaciones, has encontrado todas!'
      }
    }
  
    let busy= false
    //flip your card
    function flipCard() {
      if (busy) return;
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 350)
      }
      busy= false;
    }
  
    createBoard()
  })