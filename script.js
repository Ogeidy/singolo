const MENU = document.getElementById('menu');
let sections = document.querySelectorAll('section');
let links = document.querySelectorAll('.header-nav__item');

MENU.addEventListener('click', event => {
    if (event.target in links) {
        links.forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }
});

document.addEventListener('scroll', event => {
    for (let [i, el] of sections.entries()) {
        if (window.pageYOffset < el.offsetTop + el.clientHeight - 200) {
            links.forEach(el => el.classList.remove('active'));
            links[i].classList.add('active');
            break;
        }
    }
});
