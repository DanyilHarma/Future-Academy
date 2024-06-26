/////////////////////////////////POPUP CITY/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let openPopup = document.querySelector(".city-pick-header-top");
    let popup = document.querySelector(".popup-city-container");
    let closeBtn = document.querySelector(".close-popup");
    let arrow = document.querySelector(".city-pick-header-top-arrow");

    function closePopup() {
        popup.style.display = "none";
    }

    openPopup.addEventListener("click", function () {
        if (popup.style.display === "none") {
            popup.style.display = "block";
            arrow.src = "/images/images-all-courses-page/Vector 198.png"
        } else {
            closePopup();
            arrow.src = "/images/images-all-courses-page/Vector 197.png";
        }
    })

    closeBtn.addEventListener("click", function () {
        closePopup();
        arrow.src = "/images/images-all-courses-page/Vector 197.png";
    })

    document.addEventListener("click", function (event) {
        if (!openPopup.contains(event.target) && !popup.contains(event.target)) {
            closePopup();
            arrow.src = "/images/images-all-courses-page/Vector 197.png";
        }
    })
})

/////////////////////////////////GO TO PAGE/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    // Находим все элементы, содержащие атрибут data-link
    let dataLinkElements = document.querySelectorAll("[data-link]");

    dataLinkElements.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();

            // Получаем значение атрибута data-link
            let dataLink = element.getAttribute("data-link");

            if (dataLink) {
                // Перенаправляем на URL из атрибута data-link
                window.location.href = dataLink;
            }
        });
    });
});

/////////////////////////////////TEST/////////////////////////////////

let currentQuestionIndex = 0;
const totalQuestions = document.querySelectorAll(".question").length;


function showQuestion(index) {
    const questions = document.querySelectorAll(".question");
    questions.forEach((question, idx) => {
        if (idx === index) {
            question.style.display = "flex";
        } else {
            question.style.display = "none";
        }
    });
}

function updateProgress() {
    const progressCircle = document.querySelector(".progress-circle");
    const progressNumber = document.querySelector(".progress-number");
    const progress = (currentQuestionIndex + 1) / totalQuestions;
    const dashoffset = 238 * (1 - progress);

    progressCircle.style.strokeDashoffset = dashoffset
    progressNumber.textContent = `${currentQuestionIndex + 1}/${totalQuestions}`;
}

function nextQuestion() {
    const questions = document.querySelectorAll(".question");
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function openModal(resultText) {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal-window");
    const resultProffession = document.querySelector(".result-proffession");

    resultProffession.textContent = resultText;

    overlay.style.display = "block";
    modal.style.display = "block";
}

function closeModal() {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal-window");

    overlay.style.display = "none";
    modal.style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".overlay").addEventListener("click", closeModal)

function calculateResult() {
    const form = document.querySelector("#test-form");
    const formData = new FormData(form);
    const answers = Array.from(formData.values());
    const result = { 1: 0, 2: 0, 3: 0, 4: 0 };

    answers.forEach(answer => {
        result[answer]++;
    });

    let maxAnswer = 1;
    for (let i = 2; i <= 4; i++) {
        if (result[i] > result[maxAnswer]) {
            maxAnswer = i;
        }
    }

    const resultText =
    {
        1: "Поздравляем,вы фронтенд-разработчик!",
        2: "Поздравляем, вы разработчик игр!",
        3: "Поздравляем,вы дизайнер!",
        4: "Поздравляем,вы разработчик мобильны приложений!"
    }

    openModal(resultText[maxAnswer]);
}

document.addEventListener("DOMContentLoaded", () => {
    showQuestion(0);
    updateProgress();

    document.querySelectorAll(".next").forEach(button => {
        button.addEventListener("click", nextQuestion);
    });

    document.querySelectorAll(".prev").forEach(button => {
        button.addEventListener("click", prevQuestion);
    });

    document.querySelector(".result").addEventListener("click", calculateResult);
});
