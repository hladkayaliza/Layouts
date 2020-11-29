document.addEventListener('DOMContentLoaded', nav)

function nav(){
    const burger = document.querySelector('.burger');
    const appHeader = document.querySelector('.app-header');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    burger.addEventListener('click', (e)=>{
        e.preventDefault();
        display(nav);
    });

    links.addEventListener('click', (e)=>{
        e.preventDefault();
        display(nav)
    });
}

function display(nav) {
    const body = document.querySelector('body');
    const appHeader = document.querySelector('.app-header');

    nav.classList.toggle('show');
    if (nav.classList.contains('show')) {
        body.setAttribute('style', 'overflow: hidden');
        appHeader.setAttribute('style', 'position: fixed');
    } else {
        appHeader.setAttribute('style', 'position: sticky');
        body.setAttribute('style', 'overflow: auto');
    }
}