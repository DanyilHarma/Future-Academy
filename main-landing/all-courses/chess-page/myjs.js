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
            arrow.src = "images//Vector 198.png"
        } else {
            closePopup();
            arrow.src = "images/Vector 197.png";
        }
    })

    closeBtn.addEventListener("click", function () {
        closePopup();
        arrow.src = "images/Vector 197.png";
    })

    document.addEventListener("click", function (event) {
        if (!openPopup.contains(event.target) && !popup.contains(event.target)) {
            closePopup();
            arrow.src = "images/Vector 197.png";
        }
    })
})

/////////////////////////////////GO TO LINK/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".first-li-header-top li a");

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let dataLink = link.parentElement.getAttribute("data-link");
            if (dataLink) {
                window.location.href = dataLink;
            }
        })
    })
})

/////////////////////////////////IMAGE HEADER/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    fetch("img-header.json")
        .then(response => response.json())
        .then(data => {
            for (let info in data) {
                if (data.hasOwnProperty(info)) {
                    let container = document.querySelector(".container");
                    let infoData = data[info];
                    let img = document.createElement(infoData.tag);
                    img.src = infoData.src;
                    img.style.position = infoData.position;
                    img.style.top = infoData.top;
                    img.style.left = infoData.left;
                    img.style.width = infoData.width;
                    container.appendChild(img);
                }
            }
        })
})

/////////////////////////////////IFRAME/////////////////////////////////

function playVideo() {
    let videoOverlay = document.querySelector(".video-overlay");
    let iframe = document.querySelector(".iframe-video");
    videoOverlay.style.display = "none";

    let src = iframe.src;
    if (!src.includes("autoplay=1")) {
        iframe.src += "&autoplay=1";
    }
}

/////////////////////////////////OWL REVIEWS/////////////////////////////////

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 6,
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        onTranslated: updateSlider,
        responsive: {
            0: {
                items: 6
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });
    function updateSlider(event) {
        let items = event.item.count;
        let visibleItems = event.page.size; // Количество видимых элементов

        // Рассчитываем индекс текущего элемента с учетом клонированных элементов
        let item = event.item.index - event.relatedTarget._clones.length / 2;
        if (item < 0) {
            item = items - 1;
        } else if (item >= items) {
            item = 0;
        }

        let slider = $(".slider-image-price");

        // Вычисляем процент для перемещения индикатора по ширине контейнера
        let percentage = (item / items) * 100;

        // Устанавливаем позицию индикатора
        slider.css("left", percentage + "%");
    }
});