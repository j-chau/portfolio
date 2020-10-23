AOS.init({
    duration: 1200,
})

window.addEventListener("scroll", () => {
    const checkpoint = 350;
    const currentScroll = window.pageYOffset;
    if (currentScroll <= checkpoint) {
        opacity = 1 - currentScroll / checkpoint;
    } else {
        opacity = 0;
    }
    document.querySelector(".down-arrow").style.opacity = opacity;
});

// add or remove tabbing from top menu links
const hideTabs = (tabIndex) => {
    const navLinks = document.getElementById("topNav").children;
    for (const el of navLinks) {
        el.children[0].setAttribute("tabindex", tabIndex);
    }
}

document.getElementById("burger").onclick = () => {

    // show top menu and show X to close menu
    document.getElementById("topNav").classList.toggle("show");
    const burger = document.getElementById("burger").classList;
    burger.toggle("close-burger");

    // add tabbing to open menu
    let tabIndex = "0";
    if (burger.value.search("close") < 0) tabIndex = "-1";
    hideTabs(tabIndex);
}

// for tablets and smaller, remove tabbing by default
const hideMenu = () => {
    if (window.matchMedia("(max-width: 768px)").matches) hideTabs("-1");
}
hideMenu();

const toggleModal = () => {
    const overlay = document.getElementsByClassName("overlay")[0];
    const thankYouModal = document.getElementsByTagName("aside")[0];
    const mailbox = document.getElementsByClassName("mailbox")[0];
    overlay.classList.toggle("hide");
    thankYouModal.classList.toggle("hide");
    mailbox.classList.toggle("bounce");
}

// for adding and removing tabbing from <main> when modal is open
const FOCUSABLE_SELECTORS = 'a[href], input:not([disabled]), textarea:not([disabled]), button:not([disabled])';
const main = document.querySelector('main');

// send form values to Google Sheets
document.getElementById("submitForm").onclick = (e) => {
    e.preventDefault();
    e.target.textContent = "Sending ...";
    let scriptURL = 'https://script.google.com/macros/s/AKfycbzpWzRtjcIKwDKl3LABAuMogVkXmzAsINr2jXhIb23N3d34B7Ox/exec?';
    const formArr = Object.values(e.target.parentElement.children);
    formArr.pop();
    formArr.shift();
    formArr.forEach(el => {
        const divInputs = Object.values(el.children);
        const input = divInputs[1];
        scriptURL += `${input.name}=${input.value}&`
        input.value = "";
    });

    fetch(scriptURL, { method: 'GET' })
        .then(() => {
            toggleModal();
            const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
            focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
            main.setAttribute('aria-hidden', 'true');
            e.target.textContent = "Sent!";
        })
}

document.getElementById("closeModal").onclick = () => {
    toggleModal();
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach(el => el.removeAttribute('tabindex'));
    main.removeAttribute('aria-hidden');
    document.getElementById("submitForm").textContent = "Submit";
}