document.addEventListener('DOMContentLoaded', function() {

    const button_dropdown = document.querySelector('.header__lft-corner__button');
    const dropdown = document.querySelector('.dropdown');
    const button_search = document.querySelector('.header__search__button')
    const search_bar = document.querySelector('.header__search__form')
    const icons = document.querySelectorAll('.gallery__icons__space');

    button_dropdown.addEventListener('click', function() {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 500);
        } else {
            dropdown.style.display = 'flex';
            setTimeout(() => {
                dropdown.classList.add('show');
            }, 10);
        }
    });

    button_search.addEventListener('click', function() {
        if (search_bar.classList.contains('show')) {
            search_bar.classList.remove('show');
            setTimeout(() => {
                search_bar.style.display = 'none';
            }, 500);
        } else {
            search_bar.style.display = 'flex';
            setTimeout(() => {
                search_bar.classList.add('show');
            }, 10); 
        }
    });

    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            console.log("Icon clicked!");

            const selectedIcon = document.querySelector('.gallery__icons__space__icon--selected');
            if (selectedIcon) {
                console.log("Removing --selected from:", selectedIcon);
                selectedIcon.classList.remove('gallery__icons__space__icon--selected');
            }

            const clickedIcon = this.querySelector('img');
            if (clickedIcon) {
                clickedIcon.classList.add('gallery__icons__space__icon--selected');

                const mainImage = document.querySelector('#element');
                mainImage.src = clickedIcon.src;
            }
        });
    });

});