document.addEventListener('DOMContentLoaded', onNavResize)

function onNavResize(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelector('.nav-links');
    burger.addEventListener('click', (evt)=>{
        evt.preventDefault();
        showMenu(nav);
    });

    links.addEventListener('click', (evt)=>{
        evt.preventDefault();
        showMenu(nav)
    });
}
const body = document.querySelector('body');
const appHeader = document.querySelector('.app-header');

function showMenu(nav) {
    nav.classList.toggle('show');
    body.classList.toggle('overflow-hide');
    appHeader.classList.toggle('pos-fix');

    // if (nav.classList.contains('show')) {
    //     body.setAttribute('style', 'overflow: hidden');
    //     appHeader.setAttribute('style', 'position: fixed');
    // } else {
    //     appHeader.setAttribute('style', 'position: sticky');
    //     body.setAttribute('style', 'overflow: auto');
    // }
}