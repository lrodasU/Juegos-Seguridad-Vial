const questions = [
    {
        question: "¿Qué deberia hacer la camioneta naranja del medio para evitar este posible accidente?",
        answers: [
            {text: "Nada, él no se accidentaría.", correct: false},
            {text: "Luz de giro izquierda.", correct: true},
            {text: "Luz de giro derecha.", correct: false},
        ]
    },
    {
        question: "¿Y si la camioneta naranja no hiciese nada, como la camioneta azul deberia revasarla?",
        answers: [
            {text: "Revasarla rápidamente y a alta velocidad.", correct: false},
            {text: "Tocar la bocina para advertirle.", correct: false},
            {text: "Reducir la velocidad y asegurarse de que no viene nadie de la otra mano.", correct: true},
        ]
    },
    {
        question: "¿Cuál es la maniobra correcta al aproximarse a una rotonda?",
        answers: [
            {text: "Acelerar para pasar rápido.", correct: false},
            {text: "Mantener la velocidad y ceder el paso a los vehículos dentro de la rotonda.", correct: false},
            {text: "Detenerse completamente antes de entrar a la rotonda.", correct: true},
        ]
    },
    {
        question: "Si necesitas cambiar de carril rápidamente, ¿qué debes hacer?",
        answers: [
            {text: "Señalizar, mirar el espejo retrovisor y cambiar de carril con cuidado", correct: true},
            {text: "Tocar la bocina y cambiar de carril rápidamente.", correct: false},
            {text: "Cambiar de carril inmediatamente sin señalizar", correct: false},
        ]
    },
    {
        question: "¿Qué indica una luz amarilla intermitente en un semáforo?",
        answers: [
            {text: "Acelerar para cruzar antes de que cambie a rojo.", correct: false},
            {text: "Proceder con precaución, mirando ambos lados de la intersección.", correct: true},
            {text: "Detenerse completamente como si fuera una luz roja.", correct: false},
        ]
    },
    {
        question: "¿Cómo debes reaccionar ante un vehículo de emergencia con sirenas y luces encendidas?",
        answers: [
            {text: "Ignorarlo y continuar tu camino.", correct: false},
            {text: "Acelerar para no obstaculizar su paso.", correct: false},
            {text: "moverse de manera segura y permitir que pase.", correct: true},
        ]
    },
    {
        question: "Cuál es la distancia de seguridad que se debe mantener con el vehículo de adelante?",
        answers: [
            {text: "La longitud de un coche.", correct: false},
            {text: "No es necesario mantener una distancia específica.", correct: false},
            {text: "Al menos dos segundos en condiciones normales", correct: true},
        ]
    },
    {
        question: "Al conducir bajo lluvia intensa, ¿qué precauciones debes tomar?",
        answers: [
            {text: " Conducir a la misma velocidad que en condiciones secas.", correct: false},
            {text: "Reducir la velocidad, encender las luces de cruce y aumentar la distancia de seguridad.", correct: true},
            {text: "Encender las luces altas para ver mejor.", correct: false},
        ]
    },
    {
        question: "¿Cuál es la maniobra adecuada al salir de estar estacionado?",
        answers: [
            {text: "Mirar por el espejo retrovisor y salir rápidamente.", correct: false},
            {text: "Salir sin señalizar si no vienen vehículos.", correct: false},
            {text: "Señalizar, mirar por los espejos, y salir cuando sea seguro.", correct: true},
        ]
    },
    {
        question: "¿Cuál es la acción adecuada al aproximarse a un paso de peatones sin semáforo?",
        answers: [
            {text: "Reducir la velocidad y detenerse si hay peatones esperando para cruzar.", correct: true},
            {text: "Continuar a la misma velocidad si no hay peatones cruzando.", correct: false},
            {text: "Acelerar para cruzar antes de que lleguen los peatones.", correct: false},        ]
    }
];

const questionsImages = [
    '../images/preg1.png',
    '../images/preg1.png',
    '../images/preg3.png',
    '../images/preg4.png',
    '../images/preg5.png',
    '../images/preg6.png',
    '../images/preg7.jpg',
    '../images/preg8.png',
    '../images/preg9.jpg',
    '../images/preg10.jpg',
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){ //comienzo quiz
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Siguiente";
    showQuestion(); //muestra la proxima pregunta
}

function showQuestion() { //se muestra la pregunta
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add ("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    /**auto-correct after answered */
    Array.from(answerButtons.children).forEach(button=> {
        if (button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true; /**block aswwer again */
    });
    nextButton.style.display = "block"; /**sig button shows up after answered */
}

function nextImage() {
    document.getElementById('question-images').src = questionsImages[currentQuestionIndex];
    document.getElementById('next-btn').addEventListener('click', nextImage);
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntaje es  ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jugar de nuevo";
    nextButton.style.display = "block"
}

function handleNextButton(){
    nextImage();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion(); /**display next question */
    }else{
        showScore(); /**display score after finished */
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz(); /**restart quiz after finished */
    }
})

startQuiz();