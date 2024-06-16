/////////////////////////////////EASE HR/////POPUP COURSES////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    let forWho = document.querySelectorAll(".for-who-people");
    let indicator = document.querySelector(".indicator");
    let coursesList = document.querySelectorAll(".courses-wrapper");

    indicator.style.left = forWho[0].offsetLeft + "px";
    indicator.style.width = forWho[0].offsetwidth + "px";

    forWho.forEach((element, index) => {
        element.addEventListener("click", () => {
            indicator.style.left = element.offsetLeft + "px";/////перемещение в левый край текущего элемента относительно родителя 
            indicator.style.width = element.offsewidth + "px";

            let target = element.getAttribute("data-target")

            coursesList.forEach(list => {
                if (list.getAttribute("data-target") === target) {
                    list.style.display = "flex";
                } else {
                    list.style.display = "none";
                }
            })
        })

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
        items: 3,
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        onTranslated: updateSlider,
        responsive: {
            0: {
                items: 5
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
        let items = event.item.count;//получаем общее количество элементов в карусели.Это включает все видимые и клонированные элементы
        // ,которые используются для бесконечного циклического прокручивания.

        let item = event.item.index - event.relatedTarget._clones.length / 2;
        if (item < 0) {
            item = items - 1;
        } else if (item >= items) {
            item = 0;
        }
        let slider = $(".slider-reviews");
        let percentage = (item / items) * 100;
        slider.css("left", percentage + "%");
    }
});
