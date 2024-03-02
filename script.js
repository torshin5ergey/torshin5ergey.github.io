/*******ACCORDEON******/

const accordeons = document.querySelectorAll(".accordeon");

accordeons.forEach(accordeon => {
	accordeon.addEventListener("click", () => {
		accordeon.classList.toggle("active");
	});
});

/*****FADE ON SCROLL******/

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".section");
hiddenElements.forEach((el) => observer.observe(el));

/*****SIDEBAR*****/

function showSidebar(){
	const sidebar = document.querySelector(".sidebar")
	sidebar.style.display = "flex"
}

function hideSidebar(){
	const sidebar = document.querySelector(".sidebar")
	sidebar.style.display = "none"
}