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
        loop: false,
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