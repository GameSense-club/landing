document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById("overlay");
    let currentOpenMenu = null;

    document.querySelectorAll('.menu').forEach(menu => {
        menu.classList.remove('show');
    });

    document.addEventListener('click', function (e) {
        const button = e.target.closest('[data-menu]');

        if (button) {
            e.preventDefault();
            e.stopPropagation();

            const menuId = button.getAttribute('data-menu');
            const menu = document.getElementById(menuId);

            if (!menu) {
                console.error('Меню с ID', menuId, 'не найдено');
                return;
            }

            if (currentOpenMenu && currentOpenMenu !== menu) {
                currentOpenMenu.classList.remove('show');
            }

            if (currentOpenMenu === menu) {
                menu.classList.remove('show');
                overlay.classList.remove('show');
                currentOpenMenu = null;
            } else {
                menu.classList.add('show');
                overlay.classList.add('show');
                currentOpenMenu = menu;
            }
        } else if (currentOpenMenu && !currentOpenMenu.contains(e.target)) {
            currentOpenMenu.classList.remove('show');
            overlay.classList.remove('show');
            currentOpenMenu = null;
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.closest('.menu')) {
            e.stopPropagation();
        }
    });
});