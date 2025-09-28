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
let CANVAS_W, CANVAS_H, WIDTH, HEIGHT, CELL_W, CELL_H, cells, FG, BG, canvas, 
generations, brightnessValue, saturationValue, hueValue;

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
        if (sketchId === "pulsar-mono") {
            captionTopLeft.textContent = "conways b1s2g8 pulsar mono";
            loadScript("sketch-pulsar-mono.js");
        } else if (sketchId === "frost-pattern") {
            captionTopLeft.textContent = "conways b1s2g8 frost pattern";
            loadScript("sketch-frost-pattern.js");
        } else if (sketchId === "pulsar-color") {
            captionTopLeft.textContent = "conways b1s2g8 pulsar color";
            loadScript("sketch-pulsar-color.js");
        } else if (sketchId === "random-color") {
            captionTopLeft.textContent = "conways b1s2g8 random color";
            loadScript("sketch-random-color.js");
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

    const maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;

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
    tabsList.classList.add("dragging");
    tabsList.scrollLeft -= e.movementX;
};

tabsList.addEventListener("mousedown", () => {
    dragging = true;
});

tabsList.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
    dragging = false;
    tabsList.classList.remove("dragging");
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
loadScript("sketch-pulsar-mono.js");
