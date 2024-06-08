
//logica xD
document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit-answer');
    const progressBar = document.getElementById('progress-bar');
    const carElement = document.getElementById('car');
    const timerElement = document.getElementById('timer');
    const resultsElement = document.getElementById('results');
    const playerSelection = document.getElementById('player-selection');
    const questionContainer = document.getElementById('question-container');
    const progressContainer = document.getElementById('progress-container');
    const gameResults = document.getElementById('game-results');
    const restartButton = document.getElementById('restart-game');
    const onePlayerButton = document.getElementById('one-player');
    const twoPlayersButton = document.getElementById('two-players');
    const startGameButton = document.getElementById('start-game');
    const gameObjective = document.getElementById('game-objective');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeElapsed = 0;
    let gameType = 'single'; // 'single' or 'multi'
    let playerScores = [{ score: 0, time: 0 }, { score: 0, time: 0 }];
    let currentPlayer = 0;

    const questions = [
        {
            question: "¿Qué significa una señal de stop?",
            options: ["Detenerse completamente", "Acelerar", "Cambiar de carril"],
            correctAnswer: 0
        },
        {
            question: "¿Qué significa una señal de ceda el paso?",
            options: ["Detenerse completamente", "Ceder el paso a otros vehículos", "Cambiar de carril"],
            correctAnswer: 1,
        },
        {
            question: "¿Cuál es la velocidad máxima permitida en una zona escolar?",
            options: ["40 km/h", "60 km/h", "80 km/h"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué significa una señal de zona de obras?",
            options: ["Reduzca la velocidad", "No entre en la zona de obras", "Siga a la velocidad normal"],
            correctAnswer: 0,
        },
        {
            question: "¿Cuál es la distancia mínima que debes mantener detrás de un vehículo en movimiento?",
            options: ["1 metro", "2 metros", "3 segundos de distancia"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué significa una señal de prohibido estacionar?",
            options: ["Puedes estacionar aquí", "No estacionar en esta área", "Estacionamiento gratuito"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de cinturón de seguridad obligatorio?",
            options: ["Debes abrocharte el cinturón", "Puedes conducir sin cinturón", "Solo para pasajeros traseros"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué significa una luz roja en un semáforo?",
            options: ["Detenerse", "Acelerar", "Precaución"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué significa una luz amarilla en un semáforo?",
            options: ["Detenerse inmediatamente", "Acelerar", "Prepararse para detenerse"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué significa una luz verde en un semáforo?",
            options: ["Detenerse", "Avanzar", "Precaución"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer si ves una señal de cruce de peatones?",
            options: ["Acelerar", "Ceder el paso a los peatones", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Cuál es la velocidad máxima permitida en una autopista?",
            options: ["80 km/h", "100 km/h", "120 km/h"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué debes hacer al ver una señal de curva peligrosa?",
            options: ["Acelerar", "Reducir la velocidad", "Cambiar de carril"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de prohibido adelantar?",
            options: ["Puedes adelantar", "No puedes adelantar", "Adelantamiento permitido solo de noche"],
            correctAnswer: 1,
        },
        {
            question: "¿Cuál es la velocidad máxima permitida en una zona urbana?",
            options: ["40 km/h", "50 km/h", "60 km/h"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué significa una señal de doble mano?",
            options: ["Tránsito en un solo sentido", "Tránsito en ambos sentidos", "Solo vehículos grandes"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer si ves una señal de cruce de ferrocarril?",
            options: ["Acelerar", "Detenerse y ceder el paso", "Ignorar la señal"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué significa una señal de no girar a la izquierda?",
            options: ["Puedes girar a la izquierda", "No puedes girar a la izquierda", "Gira a la derecha"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer si ves una señal de peatonal?",
            options: ["Ceder el paso a los peatones", "Acelerar", "Cambiar de carril"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué indica una señal de velocidad máxima?",
            options: ["La velocidad mínima", "La velocidad máxima", "La velocidad recomendada"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de curva pronunciada?",
            options: ["Curva leve", "Curva peligrosa", "Camino recto"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de animales sueltos?",
            options: ["Acelerar", "Reducir la velocidad y estar atento", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de ciclovía?",
            options: ["Solo bicicletas", "Solo autos", "Solo peatones"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué significa una señal de no estacionar?",
            options: ["Puedes estacionar", "No puedes estacionar", "Estacionamiento permitido solo de noche"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de giro obligatorio a la derecha?",
            options: ["Girar a la derecha", "Seguir derecho", "Girar a la izquierda"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué indica una señal de no girar en U?",
            options: ["Puedes girar en U", "No puedes girar en U", "Solo girar a la derecha"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de tránsito pesado?",
            options: ["Solo vehículos livianos", "Vehículos pesados permitidos", "Prohibido el tránsito de vehículos pesados"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué debes hacer si ves una señal de desvío?",
            options: ["Continuar por el camino principal", "Seguir el desvío indicado", "Detenerse"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué indica una señal de fin de autopista?",
            options: ["Comienza la autopista", "Termina la autopista", "Zona de descanso"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de paso peatonal?",
            options: ["No hay peatones", "Cruce de peatones", "Prohibido el paso de peatones"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de cruce de niños?",
            options: ["Acelerar", "Reducir la velocidad y estar atento", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de hospital?",
            options: ["Prohibido estacionar", "Hospital cercano", "Zona de obras"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de prohibido usar bocina?",
            options: ["Puedes usar bocina", "No puedes usar bocina", "Solo en emergencias"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de máxima velocidad 60 km/h?",
            options: ["No superar los 60 km/h", "Superar los 60 km/h", "Mantener 60 km/h exactos"],
            correctAnswer: 0,
        },
        {
            question: "¿Qué significa una señal de estacionamiento exclusivo para discapacitados?",
            options: ["Cualquiera puede estacionar", "Solo discapacitados pueden estacionar", "Estacionamiento gratuito"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de gasolinera?",
            options: ["Prohibido detenerse", "Gasolinera cercana", "Zona de descanso"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de no adelantar en curvas?",
            options: ["Puedes adelantar", "No puedes adelantar en curvas", "Adelantar solo de noche"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer si ves una señal de puente angosto?",
            options: ["Acelerar", "Reducir la velocidad y estar atento", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de cruce de ganado?",
            options: ["Acelerar", "Reducir la velocidad y estar atento", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de estacionamiento medido?",
            options: ["Estacionamiento gratuito", "Estacionamiento con costo", "No estacionar"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de calle sin salida?",
            options: ["Continuar derecho", "Detenerse", "Buscar una ruta alternativa"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué significa una señal de zona de derrumbes?",
            options: ["Prohibido pasar", "Precaución por posibles derrumbes", "Zona segura"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de aeropuerto cercano?",
            options: ["Prohibido estacionar", "Precaución por aviones bajos", "Zona de descanso"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de pavimento resbaladizo?",
            options: ["Camino seco", "Precaución por camino resbaladizo", "Zona de descanso"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué debes hacer al ver una señal de doble curva?",
            options: ["Acelerar", "Reducir la velocidad y estar atento", "Ignorar la señal"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué significa una señal de velocidad mínima?",
            options: ["Velocidad máxima", "Velocidad recomendada", "Velocidad mínima permitida"],
            correctAnswer: 2,
        },
        {
            question: "¿Qué debes hacer si ves una señal de no usar celular mientras conduces?",
            options: ["Usar el celular", "No usar el celular", "Usar solo en emergencias"],
            correctAnswer: 1,
        },
        {
            question: "¿Qué indica una señal de salida de emergencia?",
            options: ["Prohibido pasar", "Solo en emergencias", "Zona de descanso"],
            correctAnswer: 1,
        },
    ];

    const TOTAL_QUESTIONS = 10; // Número total de preguntas que deben responder los jugadores

    function startGame() {
        gameObjective.style.display = 'none';
        playerSelection.style.display = 'block';
    }

    function selectPlayers(type) {
        gameType = type;
        currentPlayer = 0;
        playerScores = [{ score: 0, time: 0 }, { score: 0, time: 0 }];
        playerSelection.style.display = 'none';
        questionContainer.style.display = 'block';
        progressContainer.style.display = 'block';
        startTimer();
        showQuestion();
    }

    function showResults() {
        clearInterval(timer);
        questionContainer.style.display = 'none';
        progressContainer.style.display = 'none';
        gameResults.style.display = 'block';
        if (gameType === 'multi') {
            const winner = playerScores[0].score > playerScores[1].score ? 0 : (playerScores[0].score < playerScores[1].score ? 1 : (playerScores[0].time < playerScores[1].time ? 0 : 1));
            resultsElement.innerHTML = `<p>Jugador 1: ${playerScores[0].score} respuestas correctas, tiempo: ${formatTime(playerScores[0].time)}</p>
                                    <p>Jugador 2: ${playerScores[1].score} respuestas correctas, tiempo: ${formatTime(playerScores[1].time)}</p>
                                    <p>¡El ganador es el Jugador ${winner + 1}!</p>`;
        } else {
            resultsElement.innerHTML = `<p>Tu puntuación es: ${score} de ${TOTAL_QUESTIONS}</p>`;
        }
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            if (answer === questions[currentQuestionIndex].correctAnswer) {
                score++;
                playerScores[currentPlayer].score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                if (gameType === 'multi') {
                    currentPlayer = (currentPlayer + 1) % 2;
                    if (currentPlayer === 0) {
                        showResults();
                        return;
                    } else {
                        currentQuestionIndex = 0;
                        showQuestion();
                    }
                } else {
                    if (score === TOTAL_QUESTIONS) {
                        showResults();
                        return;
                    } else {
                        showResults();
                        return; 
                    }
                }
            }
            updateProgressBar();
        } else {
            alert('Por favor, selecciona una opción.');
        }
    }
    

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="option" id="option${index}" value="${index}">
                <label for="option${index}">${String.fromCharCode(65 + index)}) ${option}</label>
            `;
            optionsElement.appendChild(li);
        });
    }

    function updateProgressBar() {
        const progress = (score / TOTAL_QUESTIONS) * 100;
        progressBar.style.width = `${progress}%`;
        carElement.style.left = `${progress}%`;
    }

    function restartGame() {
        score = 0;
        currentQuestionIndex = 0;
        timeElapsed = 0;
        gameResults.style.display = 'none';
        gameObjective.style.display = 'block';
    }

    function startTimer() {
        timerElement.textContent = 'Tiempo: 00:00';
        timeElapsed = 0;
        timer = setInterval(() => {
            timeElapsed++;
            timerElement.textContent = `Tiempo: ${formatTime(timeElapsed)}`;
            if (gameType === 'multi') {
                playerScores[currentPlayer].time = timeElapsed;
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    submitButton.addEventListener('click', checkAnswer);
    restartButton.addEventListener('click', restartGame);
    startGameButton.addEventListener('click', startGame);
    onePlayerButton.addEventListener('click', () => selectPlayers('single'));
    twoPlayersButton.addEventListener('click', () => selectPlayers('multi'));
});
