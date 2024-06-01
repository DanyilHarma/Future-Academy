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

