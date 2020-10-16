
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

document.getElementById("submitForm").onclick = (e) => {
    e.preventDefault();

    let scriptURL = 'https://script.google.com/macros/s/AKfycbzpWzRtjcIKwDKl3LABAuMogVkXmzAsINr2jXhIb23N3d34B7Ox/exec?';
    const formArr = Object.values(e.target.parentElement.children);
    formArr.pop();
    formArr.shift();
    formArr.forEach(el => {
        const divInputs = Object.values(el.children);
        scriptURL += `${divInputs[1].name}=${divInputs[1].value}&`
    });
    console.log(scriptURL);

    fetch(scriptURL, { method: 'GET' })
}