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
