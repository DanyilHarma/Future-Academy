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
                    img.style.transform = infoData.transform;
                    container.appendChild(img);
                }
            }
        })
})

/////////////////////////////////ACCORDION/////////////////////////////////

$(document).ready(function () {
    $("#accordion1").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false // Все панели свернуты по умолчанию
    });

    $("#accordion2").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $("#accordion3").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $("#accordion4").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let clickZones = document.querySelectorAll(".title-accordion");

    clickZones.forEach(function (clickZone) {
        clickZone.addEventListener("click", function () {
            let img = this.querySelector("img");
            img.classList.toggle("active");
            let panel = this.nextElementSibling;

            $(panel).slideToggle(function () {
                // Проверяем текущее состояние панели после анимации
                if ($(panel).is(":visible")) {
                    // Если панель видима, добавляем класс active к изображению
                    img.classList.add("active");
                } else {
                    // Если панель скрыта, удаляем класс active с изображения
                    img.classList.remove("active");
                }
            });
        })
    })
})

/////////////////////////////////OWL PHOTOS/////////////////////////////////

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