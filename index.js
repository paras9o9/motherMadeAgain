const primaryNav = document.querySelector('.links');
const navToggle = document.querySelector('.mobile-nav-toggle');


navToggle.addEventListener("click", () => {
    const visiblity = primaryNav.getAttribute("data-visible");

    if (visiblity === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else if (visiblity === "true") {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

// marquee 

const root = document.documentElement;
const marqueeElementDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector(".marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i<marqueeElementDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// our flavour cards slider

const cardsContainer = document.querySelector(".cards-container");
const silderBtns = document.querySelectorAll(".slider-btn-container .slide-button i")
const firstCardWidth = cardsContainer.querySelector(".carousel-card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

// Add event listeners for the arrow buttons to scroll the carousel left and right
silderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        cardsContainer.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
})

const dargStart = (e) => {
    isDragging = true;
    cardsContainer.classList.add("dragging");
    // Records the initial cursor and scroll position of the cards-container
    startX = e.pageX;
    startScrollLeft = cardsContainer.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    cardsContainer.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = (e) => {
    isDragging = false;
    cardsContainer.classList.remove("dragging");
}

cardsContainer.addEventListener("mousedown", dargStart);
cardsContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);