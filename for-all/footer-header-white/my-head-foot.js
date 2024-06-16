document.addEventListener("DOMContentLoaded", function () {
    function loadHTML(file, element, callback) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки файла: ${file}`);
                }
                return response.text();
            })
            .then(data => {

                let targetData = document.querySelector(element);
                if (targetData) {
                    targetData.innerHTML = data;
                    if (callback) callback();
                }
            })
            .catch(error => console.error(error));
    }

    loadHTML("/for-all/footer-header-white/header.html", "header", setupHeader);

    loadHTML("/for-all/footer-header-white/footer.html", "footer", setupFooter);

    function setupHeader() {
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
                arrow.src = "/images/images-chess-page/Vector 198.png"
            } else {
                closePopup();
                arrow.src = "/images/images-chess-page/Vector 197.png";
            }
        })

        closeBtn.addEventListener("click", function () {
            closePopup();
            arrow.src = "/images/images-chess-page/Vector 197.png";
        })

        document.addEventListener("click", function (event) {
            if (!openPopup.contains(event.target) && !popup.contains(event.target)) {
                closePopup();
                arrow.src = "/images/images-chess-page/Vector 197.png";
            }
        })
        changeLinkForMain();
        dataLink();
    }

    function dataLink() {
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
    }

    function changeLinkForMain() {
        if (window.location.pathname === "/index.html" || window.location.hostname.includes("netlify.app")) {
            let links = document.querySelectorAll("[data-link]");
            links.forEach(link => {
                let data = link.getAttribute("data-link");
                if (data.startsWith("../")) {
                    let newLink = "main-landing/" + data.substring(3);
                    link.setAttribute("data-link", "/" + newLink);
                }
            });
        }
    };

    function setupFooter() {
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
    }
});