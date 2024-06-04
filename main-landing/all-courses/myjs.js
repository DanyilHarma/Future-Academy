document.addEventListener("DOMContentLoaded", function () {
    let forWho = document.querySelectorAll(".for-who-people");
    let indicator = document.querySelector(".indicator");
    let coursesList = document.querySelectorAll(".courses-wrapper");

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
        })

    })
})

