/*==================================
menu
==================================*/
function toggleMenu() {
    const btn = document.getElementById("menuBtn");

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        btn.innerHTML = "✕";
    } else {
        btn.innerHTML = "☰";
    }
}

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu").classList.remove("active");
        document.getElementById("menuBtn").innerHTML = "☰";
    });
});


/*==================================
PROJECTS
==================================*/

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".projects-card");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const sidebarLinks = document.querySelectorAll(".project-menu a");
    const searchInput = document.getElementById("searchInput");
    const noResult = document.getElementById("noResult");

    let currentFilter = "all";

    function filterProjects() {

        const keyword = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {

            const category = (card.dataset.category || "").toLowerCase();
            const type = (card.dataset.type || "").toLowerCase();
            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();

            const filterMatch =
                currentFilter === "all" ||
                category === currentFilter.toLowerCase() ||
                type === currentFilter.toLowerCase();

            const searchMatch =
                keyword === "" ||
                title.includes(keyword) ||
                description.includes(keyword) ||
                category.includes(keyword) ||
                type.includes(keyword);

            if (filterMatch && searchMatch) {

                card.style.display = "block";
                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });

        if (visibleCount === 0) {
            noResult.style.display = "block";
        } else {
            noResult.style.display = "none";
        }

    }

    /*---TOP FILTER BUTTONS---*/

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            sidebarLinks.forEach(link => link.classList.remove("active"));

            currentFilter = this.dataset.filter;

            filterProjects();

        });

    });

    /*--SIDEBAR FILTERS--*/

    sidebarLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            sidebarLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            filterButtons.forEach(btn => btn.classList.remove("active"));

            const filter = this.dataset.filter;

            currentFilter = filter;

            const topButton = document.querySelector(
                `.filter-buttons button[data-filter="${filter}"]`
            );

            if (topButton) {
                topButton.classList.add("active");
            }

            filterProjects();

        });

    });

    /*--SEARCH--*/

    searchInput.addEventListener("input", function () {

        filterProjects();

    });

    /*INITIAL LOAD*/

    filterProjects();

});

/*==================================
      SIDEBAR ACCORDION
==================================*/

const menuToggles = document.querySelectorAll(".menu-toggle");

menuToggles.forEach(toggle=>{

    const submenu = toggle.nextElementSibling;

    submenu.classList.remove("open");

    toggle.addEventListener("click",function(e){

        e.preventDefault();

        // close others
        menuToggles.forEach(item=>{

            if(item!==toggle){

                item.classList.remove("open");

                item.nextElementSibling.classList.remove("open");

            }

        });

        toggle.classList.toggle("open");

        submenu.classList.toggle("open");

    });

});

/*==================================================
    TIMBERWOOD UI SCRIPTS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initProductFilter();
    initProductCarousel();

});


/*==================================================
    PRODUCT FILTER
==================================================*/

function initProductFilter() {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const brandFilter = document.getElementById("brandFilter");
    const cards = document.querySelectorAll(".card");

    if (!cards.length) return;

    function filterProducts() {

        const search = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const brand = brandFilter.value;

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            const matchSearch =
                text.includes(search);

            const matchCategory =
                category === "all" ||
                card.dataset.category === category;

            const matchBrand =
                brand === "all" ||
                card.dataset.brand === brand;

            card.classList.toggle(
                "hide",
                !(matchSearch && matchCategory && matchBrand)
            );

        });

    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    brandFilter.addEventListener("change", filterProducts);

    filterProducts();

}


/*==================================================
    PRODUCT CAROUSEL
==================================================*/

function initProductCarousel() {

    const carousel = document.getElementById("carousel");

    if (!carousel) return;

    const AUTO_SPEED = 0.5;
    const SCROLL_STEP = window.innerWidth <= 768 ? 180 : 260;

    let autoPlay = true;
    let resumeTimer;

    function autoScroll() {

        if (autoPlay) {

            carousel.scrollLeft += AUTO_SPEED;

            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            }

        }

        requestAnimationFrame(autoScroll);

    }

    requestAnimationFrame(autoScroll);

    function pause() {
        autoPlay = false;
    }

    function resume() {

        clearTimeout(resumeTimer);

        resumeTimer = setTimeout(() => {
            autoPlay = true;
        }, 1200);

    }

    [
        "mouseenter",
        "touchstart",
        "mousedown"
    ].forEach(event => {
        carousel.addEventListener(event, pause, {
            passive: true
        });
    });

    [
        "mouseleave",
        "touchend",
        "mouseup",
        "wheel"
    ].forEach(event => {
        carousel.addEventListener(event, resume, {
            passive: true
        });
    });

    window.scrollLeft = () => {

        carousel.scrollBy({
            left: -SCROLL_STEP,
            behavior: "smooth"
        });

        resume();

    };

    window.scrollRight = () => {

        carousel.scrollBy({
            left: SCROLL_STEP,
            behavior: "smooth"
        });

        resume();

    };

}


/*==================================
HOME: HERO
==================================*/

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let slideInterval;

/* SHOW SLIDE */

function showSlide(index){

    slides.forEach((slide, i)=>{

        slide.classList.remove("active");

        dots[i].classList.remove("active");

    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

/* NEXT SLIDE */

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

/* AUTO SLIDE */

function startSlider(){

    slideInterval = setInterval(()=>{

        nextSlide();

    },5000);

}

/* RESET TIMER WHEN CLICK DOT */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide = index;

        showSlide(currentSlide);

        clearInterval(slideInterval);

        startSlider();

    });

});

/* TOUCH SWIPE MOBILE */

let startX = 0;
let endX = 0;

const slider = document.querySelector(".hero-slider");

slider.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

slider.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){

        currentSlide++;

        if(currentSlide >= slides.length){

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }

    else if(endX - startX > 50){

        currentSlide--;

        if(currentSlide < 0){

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    }

    clearInterval(slideInterval);

    startSlider();

});

/* START */

showSlide(currentSlide);

startSlider();


/*==================================
        SCROLL ANIMATION 
==================================*/
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:.2
});

document.querySelectorAll(".animate").forEach(el=>{
    observer.observe(el);
});
