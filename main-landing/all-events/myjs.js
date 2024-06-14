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
            arrow.src = "../../images/images-all-courses-page/Vector 198.png"
        } else {
            closePopup();
            arrow.src = "../../images/images-all-courses-page/Vector 197.png";
        }
    })

    closeBtn.addEventListener("click", function () {
        closePopup();
        arrow.src = "../../images/images-all-courses-page/Vector 197.png";
    })

    document.addEventListener("click", function (event) {
        if (!openPopup.contains(event.target) && !popup.contains(event.target)) {
            closePopup();
            arrow.src = "../../images/images-all-courses-page/Vector 197.png";
        }
    })
})

/////////////////////////////////INDICATOR_HEADER/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let list = document.querySelectorAll(".first-li-header-top li");

    let indicator = document.querySelector(".indicator-header");

    if (list.length > 0 && indicator) {
        const firstLink = list[1].querySelector('a');
        if (firstLink) {
            const firstRect = firstLink.getBoundingClientRect();
            indicator.style.left = (firstRect.left + firstRect.width / 2 - indicator.offsetWidth / 2) + "px";
            indicator.style.width = firstRect.width + "px";
        }
    }


    // Добавляем обработчик событий для каждого элемента списка
    list.forEach((item) => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // предотвращение перехода по ссылке
                // Перемещение индикатора к текущему элементу
                const rect = link.getBoundingClientRect();
                indicator.style.left = (rect.left + rect.width / 2 - indicator.offsetWidth / 2) + "px";
                indicator.style.width = rect.width + "px";
            });
        }
    })
});

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

/////////////////////////////////FOOTER/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    fetch("../../for-all/footer-data.json")
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