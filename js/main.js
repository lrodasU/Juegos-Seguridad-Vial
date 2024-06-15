const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".carousel-item");
const images = document.querySelectorAll(".carousel-img");
const gameName = document.getElementById("gameTitle");
const description = document.getElementById("gameDescription");
const gameAuthor = document.getElementById("gameAuthor");
const repoLink = document.getElementById("repoLink");

const games = [
    {
        name: "Desafío de señales",
        description:
            "Adivina si la descripción corresponde a la señal de tránsito mostrada. ¡Responde 'Verdadero' o 'Falso' y pon a prueba tu conocimiento vial!",
        url: "Desafio_de_senales.html",
        author: "Lara Luciano",
        repo: "https://github.com/lrodasU/Juegos-Seguridad-Vial/blob/main/html/Desafio_de_senales.html",
        img: "../images/Desafio de señales.png",
    },
    {
        name: "Quiz",
        description:
            "Se describirá una situación en la que usted se encuentra y se le presentan 3 posibles respuestas. El jugador deberá elegir una opción de respuesta la cual se le indicará si está bien o mal. Al final del juego se mostrará el puntaje obtenido junto a la opción de volver a jugar.",
        url: "quiz.html",
        author: "Alex Menéndez",
        repo: "https://github.com/lrodasU/Juegos-Seguridad-Vial/blob/main/html/quiz.html",
        img: "../images/portada_quiz.png",
    },
    {
        name: "Conductor Consciente",
        description:
            "El objetivo del juego es llegar desde tu casa hasta la universidad UADE respondiendo preguntas sobre seguridad vial en Argentina. Para ganar, debes responder correctamente 10 preguntas.",
        url: "carrera.html",
        author: "Gabriel Montenegro",
        repo: "https://github.com/lrodasU/Juegos-Seguridad-Vial/blob/main/html/carrera.html",
        img: "../images/portada-carrera.png",
    },
    {
        name: "Test Drive",
        description:
            "En Test Drive deberás ponerte al volante y asegurar no causar ningún accidente. Utiliza las flechas del teclado o las letras A y D para moverte. Consigue el mejor puntaje y la mayor duración posibles",
        url: "testDrive.html",
        author: "Lucas Rodas",
        repo: "https://github.com/lrodasU/Juegos-Seguridad-Vial/blob/main/html/testDrive.html",
        img: "../images/testDrivePortada.png"
    },
    {
        name: "Memoria Vial",
        description:
            "Similar al clásico juego de memoria, los jugadores deben hacer coincidir pares de tarjetas con imágenes relacionadas con la seguridad vial, como señales de tráfico, vehículos y peatones. Este juego ayuda a reforzar el reconocimiento de señales y la comprensión de las normas de tráfico.",
        url: "memoria.html",
        author: "Valentina Micheloni",
        repo: "https://github.com/lrodasU/Juegos-Seguridad-Vial/blob/main/html/`memoria.html",
        img: "../images/memoriaPortada.png"
    },
];
let index = 0;
const totalItems = items.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    gameName.innerHTML = games[index].name;
    description.innerHTML = games[index].description;
    gameAuthor.innerHTML = `Autor: ${games[index].author}`;
    repoLink.href = games[index].repo;
}

prevButton.addEventListener("click", () => {
    index = (index - 1 + totalItems) % totalItems;
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    index = (index + 1) % totalItems;
    updateCarousel();
});

images.forEach((img, idx) => {
    img.src = games[idx].img;
});

items.forEach((item, idx) => {
    item.addEventListener("click", () => {
        window.location.href = games[idx].url;
    });
});

updateCarousel();