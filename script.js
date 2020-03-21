// Navigation

const MENU = document.getElementById('menu');
let sections = document.querySelectorAll('section');
let links = document.querySelectorAll('.header-nav__item');

MENU.addEventListener('click', event => {
    if (Array.from(links).includes(event.target)) {
        links.forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        let el_index = Array.from(links).indexOf(event.target);
        sections[el_index].scrollIntoView({block: "start", behavior: "smooth"});
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

// Slider

let sliderItems = document.querySelectorAll('.slider__item');

class Item {
    constructor(num) {
        this.num = num
    }
    [Symbol.toPrimitive]() {
        return this.num;
    }
    next(direction) {
        return new Item((this.num + (direction === 'to_left' ? -1 : 1) + sliderItems.length) % sliderItems.length);
    }
};

let activeItem = new Item(0);
let isEnable = true;
let direction = '';

document.querySelector('.slider__content').addEventListener('transitionend', function(event) {
    if (event.propertyName === 'background-color') {
        sliderItems[activeItem.next(direction)].classList.remove('right', 'left', 'from');
        sliderItems[activeItem].classList.remove('to_left', 'to_right', 'active');
        activeItem = activeItem.next(direction);
        isEnable = true;
    }
});

function changeItems() {
    sliderItems[activeItem.next(direction)].style.backgroundColor = '';
    sliderItems[activeItem.next(direction)].style.transition = '';
    sliderItems[activeItem.next(direction)].style.borderBottomColor = '';
    sliderItems[activeItem.next(direction)].classList.add('active', 'from');
    sliderItems[activeItem].classList.add(direction);
    isEnable = false;
}

function changeItemsWrapper() {
    sliderItems[activeItem.next(direction)].classList.add(direction === 'to_right' ? 'left' : 'right');
    let tmpColor = getComputedStyle(sliderItems[activeItem]).backgroundColor;
    let tmpTransition = getComputedStyle(sliderItems[activeItem]).transition.split(',')[0];
    let tmpBottom = getComputedStyle(sliderItems[activeItem]).borderBottomColor;
    sliderItems[activeItem.next(direction)].style.backgroundColor = tmpColor;
    sliderItems[activeItem.next(direction)].style.transition = tmpTransition;
    sliderItems[activeItem.next(direction)].style.borderBottomColor = tmpBottom;
    window.setTimeout(changeItems, 20);
}

document.querySelector('.slider__control.left').addEventListener('click', () => {
    if (isEnable) {
        direction = 'to_right';
        changeItemsWrapper();
    }
});

document.querySelector('.slider__control.right').addEventListener('click', () => {
    if (isEnable) {
        direction = 'to_left';
        changeItemsWrapper();
    }
});

// Phone buttons

document.querySelectorAll('.iphone-button').forEach(function(el){
    el.addEventListener('click', (event) => {
        event.target.parentElement.nextElementSibling.classList.toggle('turn-off');
    })
});

// Portfolio tabs & pictures

let tags = document.querySelectorAll('.tag__item');
let pictures = document.querySelectorAll('.portfolio-item img');

function changePictures(event) {
    if (event.propertyName === 'opacity') {
        let firstItem = document.querySelector('.portfolio__content').querySelector('.portfolio-item');
        document.querySelector('.portfolio__content').appendChild(firstItem);
        document.querySelector('.portfolio__content').classList.remove('fade');
        document.querySelector('.portfolio__content').removeEventListener('transitionend', changePictures);
    } 
}

document.querySelector('.portfolio__tags').addEventListener('click', event => {
    if (Array.from(tags).includes(event.target)) {
        if (!event.target.classList.contains('active')) {
            tags.forEach(el => el.classList.remove('active'));
            pictures.forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            document.querySelector('.portfolio__content').classList.add('fade');
            document.querySelector('.portfolio__content').addEventListener('transitionend', changePictures);
        }
    }
});


document.querySelector('.portfolio__content').addEventListener('click', event => {
    if (Array.from(pictures).includes(event.target)) {
        if (!event.target.classList.contains('active')) {
            pictures.forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
        }
    }
});