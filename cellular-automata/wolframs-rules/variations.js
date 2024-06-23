// variations.js

// Scroll tabs feature
const tabs = document.querySelectorAll(".variations a");
const tabsList = document.querySelector(".variations ul");

const rightArrow = document.querySelector(
    ".variations .right-arrow span");
const leftArrow = document.querySelector(
    ".variations .left-arrow span");
const leftArrowContainer = document.querySelector(
    ".variations .left-arrow");
const rightArrowContainer = document.querySelector(
    ".variations .right-arrow");

// Update page data
const canvasContainer = document.querySelector(".canvas-container");
const descriptionText = document.querySelector(".description .description-text");
const captionTopLeft = document.querySelector(".caption-top-left");
// Sketches variable
let currentScript;
let canvas, CANVAS_W, CANVAS_H, WIDTH, HEIGHT, CELL_W, CELL_H, cells, FG, BG, firstLineDensity, rule, originalLine
let currentRowToClear, isForward, fgColors, interValue // rule184-gradient-infinite

const removeAllActiveClasses = () => {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
};

tabs.forEach(tab => {
    tab.addEventListener("click", (event) => {
        event.preventDefault();
        removeAllActiveClasses();
        tab.classList.add("active");

        // Load the selected sketch
        const sketchId = tab.getAttribute("data-sketch");
        if (sketchId === "rule30-infinite") {
            captionTopLeft.textContent = "wolfram's rule 30";
            loadScript("rule30-infinite.js");
        } else if (sketchId === "rule120-infinite") {
            captionTopLeft.textContent = "wolfram's rule 120";
            loadScript("rule120-infinite.js");
        } else if (sketchId === "rule135-infinite") {
            captionTopLeft.textContent = "wolfram's rule 135";
            loadScript("rule135-infinite.js");
        } else if (sketchId === "rule184-gradient-infinite") {
            captionTopLeft.textContent = "wolfram's rule 184";
            loadScript("rule184-gradient-infinite.js");
        } else if (sketchId === "rule225-infinite") {
            captionTopLeft.textContent = "wolfram's rule 225";
            loadScript("rule225-infinite.js");
        } else if (sketchId === "rule30-pikes") {
            captionTopLeft.textContent = "pikes";
            loadScript("rule30-pikes.js");
        } 

        // Update description
        descriptionText.innerHTML = tab.getAttribute("data-description");
    });
});

const manageIcons = () => {
    if (tabsList.scrollLeft >= 20) {
        leftArrowContainer.classList.add("active");
    } else {
        leftArrowContainer.classList.remove("active");
    }

    let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;

    if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
    } else {
        rightArrowContainer.classList.add("active");
    }
};

rightArrow.addEventListener("click", () => {
    tabsList.scrollLeft += 200;
    manageIcons();
});

leftArrow.addEventListener("click", () => {
    tabsList.scrollLeft -= 200;
    manageIcons();
});

tabsList.addEventListener("scroll", () => {
    manageIcons();
});

// Mouse drag feature
let dragging = false;

const drag = (e) => {
    if (!dragging) return;
    tabsList.classList.add("dragging")
    tabsList.scrollLeft -= e.movementX;
}

tabsList.addEventListener("mousedown", () => {
    dragging = true;
});

tabsList.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
    dragging = false;
    tabsList.classList.remove("dragging")
});


// Dynamic script loading and unloading
function loadScript(scriptSrc) {
    if (currentScript) {
        document.body.removeChild(currentScript);
        window.setup = undefined;
        window.draw = undefined;
    }
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.onload = () => {
        if (typeof setup === "function") {
            setup();
        }
    };
    currentScript = script;
    document.body.appendChild(script);
}

// Load the initial sketch
loadScript("rule30-infinite.js");
