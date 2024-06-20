document.addEventListener("DOMContentLoaded", function () {
    const breadcrumb = document.getElementById("breadcrumb");
    const path = window.location.pathname.split("/").filter(Boolean);
    let currentPath = "";

    // Очищаем текущие хлебные крошки и добавляем "Главная"
    breadcrumb.innerHTML = "";
    const homeItem = document.createElement("li");
    homeItem.className = "breadcrumb-content";
    const homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Главная";
    homeItem.appendChild(homeLink);
    breadcrumb.appendChild(homeItem);

    // Создаем хлебные крошки на основе текущего пути
    path.forEach((part, index) => {
        currentPath += `/${part}`;
        const isLast = index === path.length - 1;

        const listItem = document.createElement("li");
        listItem.className = "breadcrumb-item-last";

        if (isLast) {
            // Для последнего элемента используем title страницы
            const pageTitle = document.title;
            listItem.textContent = pageTitle ? pageTitle : decodeURIComponent(part.replace(/-/g, " "));
        }
        breadcrumb.appendChild(listItem);
    });
});





// document.addEventListener("DOMContentLoaded", function () {
//     const breadcrumb = document.getElementById("breadcrumb");
//     const path = window.location.pathname.split("/").filter(Boolean);
//     let currentPath = "";

//     // Функция для сохранения хлебных крошек в localStorage
//     const saveBreadcrumbs = (breadcrumbs) => {
//         localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbs));
//     }

//     // Функция для загрузки хлебных крошек из localStorage
//     const loadBreadcrumbs = () => {
//         return JSON.parse(localStorage.getItem("breadcrumbs")) || [];
//     }

//     // Функция для удаления лишних хлебных крошек из localStorage
//     const cleanBreadcrumbs = (currentPath) => {
//         let breadcrumbs = loadBreadcrumbs();
//         breadcrumbs = breadcrumbs.filter(crumb => crumb.path === "/" || currentPath.includes(crumb.path));
//         saveBreadcrumbs(breadcrumbs);
//     }

//     // Загружаем хлебные крошки
//     let breadcrumbs = loadBreadcrumbs();

//     // Функция для добавления хлебной крошки в localStorage
//     const addBreadcrumb = (title, url) => {
//         if (!breadcrumbs.some(crumb => crumb.path === url)) {
//             breadcrumbs.push({ title, path: url });
//             saveBreadcrumbs(breadcrumbs);
//         }
//     }

//     // Очищаем текущие хлебные крошки и добавляем "Главная"
//     breadcrumb.innerHTML = "";
//     const homeItem = document.createElement("li");
//     homeItem.className = "breadcrumb-content";
//     const homeLink = document.createElement("a");
//     homeLink.href = "/";
//     homeLink.textContent = "Главная";
//     homeItem.appendChild(homeLink);
//     breadcrumb.appendChild(homeItem);

//     // Создаем хлебные крошки на основе текущего пути и сохраняем их в localStorage
//     path.forEach((part, index) => {
//         if (part === "main-landing" || part === "all-courses") return; // Пропускаем ненужные директории

//         currentPath += `/${part}`;
//         const isLast = index === path.length - 1;

//         const listItem = document.createElement("li");
//         listItem.className = "breadcrumb-content";

//         if (isLast) {
//             const pageTitle = document.title;
//             listItem.textContent = pageTitle ? pageTitle : decodeURIComponent(part.replace(/-/g, " "));
//             addBreadcrumb(listItem.textContent, currentPath);
//             // } else {
//             //     const link = document.createElement("a");
//             //     link.href = currentPath;
//             //     link.textContent = decodeURIComponent(part.replace(/-/g, " "));
//             //     listItem.appendChild(link);
//             //     breadcrumb.appendChild(listItem); // Добавляем элемент только если он не последний
//         }
//     });

//     // Обновляем хлебные крошки в localStorage
//     cleanBreadcrumbs(currentPath);

//     // Добавляем сохраненные крошки в навигацию (все, кроме текущей страницы)
//     breadcrumbs = loadBreadcrumbs(); // Перезагружаем крошки после очистки
//     breadcrumbs.forEach((crumb, index) => {
//         const listItem = document.createElement("li");
//         listItem.className = "breadcrumb-content";
//         if (index === breadcrumbs.length - 1) {
//             listItem.className = "breadcrumb-item-last";
//             listItem.textContent = crumb.title;
//         } else {
//             const link = document.createElement("a");
//             link.href = crumb.path;
//             link.textContent = crumb.title;
//             listItem.appendChild(link);
//         }
//         breadcrumb.appendChild(listItem);
//     });

//     // Добавляем текущую страницу как последнюю хлебную крошку
//     const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
//     if (lastCrumb && lastCrumb.path !== currentPath) {
//         const lastItem = document.createElement("li");
//         lastItem.className = "breadcrumb-item-last";
//         lastItem.textContent = lastCrumb.title;
//         breadcrumb.appendChild(lastItem);
//     }
// });