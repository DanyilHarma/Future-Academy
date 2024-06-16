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
    let dataLinkElements = document.querySelectorAll("[data-link]");

    dataLinkElements.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();

            let dataLink = element.getAttribute("data-link");

            if (dataLink) {
                window.location.href = dataLink;
            }
        });
    });
});


/////////////////////////////////FORM/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let enter = document.querySelector(".enter");
    let registration = document.querySelector(".registration");
    let registrationForm = document.querySelector(".inputs-registration");
    let enterForm = document.querySelector(".inputs-enter");
    let indicator = document.querySelector(".indicator");
    let buttonForm = document.querySelector(".button-form");

    enterForm.style.display = "flex";
    registrationForm.style.display = "none";
    enter.addEventListener("click", function () {
        enterForm.style.display = "flex";
        registrationForm.style.display = "none";
        indicator.style.left = "0";
        buttonForm.textContent = "Войти";
    })

    registration.addEventListener("click", function () {
        enterForm.style.display = "none";
        registrationForm.style.display = "flex";
        indicator.style.left = "50%";
        buttonForm.textContent = "Зарегистрироваться";
    })

    buttonForm.addEventListener("click", function (event) {
        event.preventDefault();

        if (enterForm.style.display === "flex") {
            if (validationForm(enterForm)) {
                console.log("Форма входа успешно валидирована");
                enterForm.querySelectorAll(".input").value = "";
            } else {
                console.log("Форма входа не прошла валидацию");
            }
        }
        if (registrationForm.style.display === "flex") {
            if (validationForm(registrationForm)) {
                let passwordField = registrationForm.querySelector("input[name='password']");
                let confirmPasswordField = registrationForm.querySelector("input[name='confirm-password']");
                if (confirmPassword(passwordField, confirmPasswordField)) {
                    console.log("Форма регистрации успешно валидирована");
                }
            } else {
                console.log("Пароли не совпадают");
                clearPasswordFields();
            }
        } else {
            console.log("Форма регистрации не прошла валидацию");
        }
    })

    function validationForm(form) {
        let isValid = true;
        let inputs = form.querySelectorAll(".input");

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                console.log("Поле не прошло валидацию:", input);
                requestAnimation(input);
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
                clearPasswordFields()
            }
        });
        if (!isValid) {
            console.log("Форма не прошла валидацию. Проверка всех полей не прошла.");
        }
        return isValid;
    }

    function confirmPassword(field1, field2) {
        console.log("Password: ", field1.value);
        console.log("Confirm Password: ", field2.value);
        if (field1.value !== field2.value) {
            console.log("Пароли не совпадают");
            field1.classList.add("invalid");
            field2.classList.add("invalid");
            requestAnimation(field1);
            requestAnimation(field2);
            return false;
        } else {
            console.log("Пароли  совпадают");
            field1.classList.remove("invalid");
            field2.classList.remove("invalid");
            return true;
        }
    }

    function clearPasswordFields() {
        let passwordFields = registrationForm.querySelectorAll("input[type='password']");
        passwordFields.forEach(field => {
            field.value = "";
        });
    }

    function requestAnimation(element) {
        element.classList.remove("invalid");
        void element.offsetWidth;
        element.classList.add("invalid");
    }

})




/////////////////////////////////FOOTER/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    fetch("/for-all/footer-data.json")
        .then(response => response.json())
        .then(data => {
            for (info in data) {
                if (data.hasOwnProperty(info)) {
                    let container = document.getElementById(info);
                    let infoData = data[info];
                    infoData.text.forEach(item => {
                        let a = document.createElement(infoData.tag);
                        a.className = "a-footer";
                        a.textContent = item.label;
                        a.href = item.link;
                        container.appendChild(a);
                    })
                }
            }
        })
})