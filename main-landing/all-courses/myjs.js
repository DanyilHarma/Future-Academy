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

/////////////////////////////////INDICATOR_HEADER/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let list = document.querySelectorAll(".first-li-header-top li");

    let indicator = document.querySelector(".indicator-header");

    if (list.length > 0 && indicator) {
        const firstLink = list[0].querySelector('a');
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
    });

})

/////////////////////////////////INDICATOR FOR WHO/////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    let forWho = document.querySelectorAll(".for-who-people");
    let indicator = document.querySelector(".indicator");
    let coursesList = document.querySelectorAll(".courses-wrapper");
    let sectionCours = document.querySelectorAll(".courses-section");


    indicator.style.left = forWho[0].offsetLeft + "px" - 10;
    indicator.style.width = forWho[0].offsetwidth + "px";

    forWho.forEach((element, index) => {
        element.addEventListener("click", () => {
            indicator.style.left = element.offsetLeft + "px";/////перемещение в левый край текущего элемента относительно родителя 
            indicator.style.width = element.offsewidth + "10px";

            let target = element.getAttribute("data-target")

            coursesList.forEach(list => {
                if (list.getAttribute("data-target") === target) {
                    list.style.display = "flex";
                } else {
                    list.style.display = "none";
                }
            })

            sectionCours.forEach(list => {
                if (list.getAttribute("data-target") === target) {
                    list.style.display = "flex";
                } else {
                    list.style.display = "none";
                }
            })
        })

    })
})

/////////////////////////////////FILTER/////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const filterComplexityBox = document.querySelectorAll(".complexity .li-radio input");
    const filterCategoryBox = document.querySelectorAll(".type-of-education .li-radio input");
    const sectionCours = document.querySelectorAll(".courses-section");
    const targetElements = document.querySelectorAll("[data-target]");

    let currentComplexityFilter = "all";
    let currentCategoryFilter = "any";

    const filterGoods = () => {
        sectionCours.forEach(section => {
            if (section.style.display == "flex") {
                let rowContent = [];
                const contentComplexityBox = section.querySelectorAll(".box");

                contentComplexityBox.forEach(item => {
                    item.classList.remove("hide");

                    const matchesComplexity = item.classList.contains(currentComplexityFilter) || currentComplexityFilter === "all";
                    const matchesCategory = item.classList.contains(currentCategoryFilter) || currentCategoryFilter === "any";

                    if (!matchesComplexity || !matchesCategory) {
                        item.classList.add("hide");
                    } else {
                        item.classList.remove("hide");
                        rowContent.push(item);
                    }
                });

                const sectionRow = section.querySelectorAll(".section-row");

                rowContent.forEach((item, index) => {
                    const rowIndex = Math.floor(index / 2);
                    if (!sectionRow[rowIndex]) {
                        const newRow = document.createElement("div");
                        newRow.classList.add("section-row");
                        section.appendChild(newRow);
                        sectionRow[rowIndex] = newRow;
                    }
                    sectionRow[rowIndex].appendChild(item);
                });
            }
        });
    };

    filterGoods();

    filterComplexityBox.forEach(input => {
        input.addEventListener("click", event => {
            currentComplexityFilter = event.target.dataset.filter;
            filterGoods();
            window.location.hash = currentComplexityFilter + "," + currentCategoryFilter;
        });
    });

    filterCategoryBox.forEach(input => {
        input.addEventListener("click", event => {
            currentCategoryFilter = event.target.dataset.fEd;
            filterGoods();
            window.location.hash = currentComplexityFilter + "," + currentCategoryFilter;
        })
    });

    targetElements.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");
            sectionCours.forEach(section => {
                if (section.getAttribute("data-target") === target) {
                    section.style.display = "flex"
                } else {
                    section.style.display = "none";
                }
            });
            document.querySelector(".complexity .li-radio input[data-filter='all']").checked = true;
            currentComplexityFilter = "all";
            document.querySelector(".type-of-education .li-radio input[data-f-ed='any']").checked = true;
            currentCategoryFilter = "any";
            filterGoods();
        })
    });

    document.querySelector(".complexity .li-radio input[data-filter='all']").checked = true;
    document.querySelector(".type-of-education .li-radio input[data-f-ed='any']").checked = true;

    const firstTargetElement = document.querySelector("[data-target]");
    if (firstTargetElement) {
        const target = firstTargetElement.getAttribute("data-target");
        sectionCours.forEach(section => {
            if (section.getAttribute("data-target") === target) {
                section.style.display = "flex";
            } else {
                section.style.display = "none";
            }
        });
    };

    if (window.location.hash) {
        const filters = window.location.hash.slice(1).split(",");
        if (filters[0]) {
            currentComplexityFilter = filters[0];
            const complexityInput = document.querySelector(`.complexity .li-radio input[data-filter='${filters[0]}']`);
            if (complexityInput) {
                complexityInput.checked = true;
            }
        }
        if (filters[1]) {
            currentCategoryFilter = filters[1];
            const categoryInput = document.querySelector(`.type-of-education .li-radio input[data-f-ed='${filters[1]}']`);
            if (categoryInput) {
                categoryInput.checked = true;
            }
        }
        filterGoods();
    }
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
