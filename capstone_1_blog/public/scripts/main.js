const hamburger = document.querySelector('.hamburger');
const bar1 = document.querySelector('.bar1');
const bar2 = document.querySelector('.bar2');
const bar3 = document.querySelector('.bar3');
const mobile_nav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
    bar1.classList.toggle('animate_bar_1');
    bar2.classList.toggle('animate_bar_2');
    bar3.classList.toggle('animate_bar_3');
    mobile_nav.classList.toggle('open-mobile-nav');
});