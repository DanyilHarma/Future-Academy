/////////////////////////////////DATA-LINK/////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".first-li-header-top li a")

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
            arrow.src = "images/header-top-images/Vector 198.png"
        } else {
            closePopup();
            arrow.src = "images/header-top-images/Vector 197.png";
        }
    })

    closeBtn.addEventListener("click", function () {
        closePopup();
        arrow.src = "images/header-top-images/Vector 197.png";
    })

    document.addEventListener("click", function (event) {
        if (!openPopup.contains(event.target) && !popup.contains(event.target)) {
            closePopup();
            arrow.src = "images/header-top-images/Vector 197.png";
        }
    })
})

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
        let items = event.item.count;//получае общее количество элементов в карусели.Это включает все видимые и клонированные элементы
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

/////////////////////////////////FOOTER/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    fetch("footer-data.json")
        .then(response => response.json())
        .then(data => {
            for (info in data) {
                if (data.hasOwnProperty(info)) {
                    let container = document.getElementById(info);
                    let infoData = data[info];
                    infoData.text.forEach(item => {
                        let a = document.createElement(infoData.tag);
                        a.className = "a-footer";
                        a.textContent = item;
                        a.href = "#";
                        container.appendChild(a);
                    })
                }
            }
        })
})