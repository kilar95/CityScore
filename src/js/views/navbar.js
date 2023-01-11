const nav = document.querySelector(".main-nav");
const navToggle = document.getElementById("mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-visible")

    if (isOpen === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }

    console.log(isOpen);
})

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    link.addEventListener("click", () => {
        const isOpen = nav.getAttribute("data-visible");

        if (isOpen === "true") {
            nav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);
        } else {
            return;
        }
    })
})

document.onclick = function(e) {
    if(e.target.id !== 'main-nav' && e.target.id !== 'mobile-nav-toggle') {
            nav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);
    }
}