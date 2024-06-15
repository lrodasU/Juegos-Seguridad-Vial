const questions = [
  {
    image: "../images/bicis.png",
    description: "La señal indica circulacion exclusiva de bicicletas",
    answer: true
  },
  {
    image: "../images/animales_sueltos.png",
    description: "La señal indica animales sueltos (vacas)",
    answer: true
  },
  {
    image: "../images/contramano.jpg",
    description: "La señal de tránsito en contramano indica que está prohibido circular en sentido contrario al tráfico.",
    answer: true
  },
  {
    image: "../images/cruce_peatonal.jpg",
    description: "La señal indica que hay un cruce peatonal que indican dónde los peatones pueden cruzar la calle de manera segura",
    answer: true
  },
  {
    image: "../images/escolares.jpg",
    description: "La señal alerta a los conductores sobre la presencia de una zona escolar",
    answer: true
  },
  {
    image: "../images/estacionamiento_exclusivo.jpg",
    description: "La señal indica Estacionamiento Exclusivo, solo se permite estacionar vehículos autorizados en esa área ",
    answer: true
  },
  {
    image: "../images/estrechamiento_calzada.jpg",
    description: "La señal indica Estrechamiento de la Calzada, la vía se reduce en anchura",
    answer: true
  },
  {
    image: "../images/hombres_trabajando.jpg",
    description: "La señal advierte a los conductores sobre la presencia de trabajadores en la vía",
    answer: true
  },
  {
    image: "../images/no_adelantar.png",
    description: "La señal indica No Adelantar, prohibido pasar a otros vehículos en ese tramo de la carretera",
    answer: true
  },
  {
    image: "../images/no_avanzar.jpg",
    description: "La señal indica No Avanzar, conductores que deben detenerse completamente y no proseguir más allá de ese punto",
    answer: true
  },
  {
    image: "../images/no_cambio_de_carril.png",
    description: "La señal indica No Cambiar de Carril",
    answer: true
  },
  {
    image: "../images/no_detenerse.jpg",
    description: "La señal indica No estacionar Ni detenerse",
    answer: true
  },
  {
    image: "../images/no_estacionar.jpg",
    description: "La señal indica la prohibicion de estacionar",
    answer: true
  },
  {
    image: "../images/no_girar.jpg",
    description: "La señal indica no girar, en este caso, a la izquierda",
    answer: true
  },
  {
    image: "../images/no_u.png",
    description: "La señal indica no girar en U",
    answer: true
  },
  {
    image: "../images/permitido_girar.jpg",
    description: "La señal indica que esta permitido girar, en este caso, a la izquierda",
    answer: true
  },
  {
    image: "../images/puesto_sanitario.jpg",
    description: "La señal indica la presencia de un puesto sanitario",
    answer: true
  },
  {
    image: "../images/transito_pesado.png",
    description: "La señal indica que los vehiculos de transporte pesado deben circular por el carril extremo",
    answer: true
  },
  {
    image: "../images/velocidad_maxima.jpg",
    description: "La señal indica el máximo de velocidad a que se puede circular en el tramo señalizado.",
    answer: true
  }
];

let score = 0;

const trafficSign = document.getElementById('traffic-sign');
const description = document.getElementById('question-text');
const result = document.getElementById('result');
const scoreValue = document.getElementById('score-value');
const modal = document.getElementById('pop-modal');
const modalText = document.getElementById('modal-text');
const closeModalButton = document.querySelector('.close');

let currentImageIndex = 0;
let currentDescriptionIndex = 0;
let correctAnswer = false;

// Función para obtener un índice aleatorio de un array
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayQuestion() {
  closeModal();
  currentImageIndex = getRandomIndex(questions);
  currentDescriptionIndex = getRandomIndex(questions);

  const currentImage = questions[currentImageIndex].image;
  const currentDescription = questions[currentDescriptionIndex].description;
  correctAnswer = questions[currentDescriptionIndex].answer && questions[currentImageIndex].description === currentDescription;

  trafficSign.src = currentImage;
  description.textContent = currentDescription;
}

function evaluateAnswer(answer) {
  if (answer === correctAnswer) {
    modalText.textContent = "Respuesta correcta";
    score++; // Aumentar el puntaje solo si la respuesta es correcta
  } else {
    const correctDescription = questions[currentImageIndex].description;
    modalText.textContent = `Respuesta incorrecta. La respuesta correcta es: "${correctDescription}"`;
  }
  scoreValue.textContent = score;
  modal.style.display = "block"; // Mostrar el modal
  displayQuestion(); // Mostrar la siguiente pregunta
}

function closeModal() {
  modal.style.display = "none";
}

// Mostrar la primera pregunta al cargar el juego
displayQuestion();
