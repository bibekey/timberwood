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

/*==================================
FEATURED Collection
==================================*/
function filterProducts(){
let search = document.getElementById("searchInput").value.toLowerCase();
let category = document.getElementById("categoryFilter").value;
let brand = document.getElementById("brandFilter").value;

let cards = document.querySelectorAll(".card");

cards.forEach(card => {

let text = card.innerText.toLowerCase();
let cat = card.getAttribute("data-category");
let br = card.getAttribute("data-brand");

let matchSearch = text.includes(search);
let matchCategory = (category === "all" || cat === category);
let matchBrand = (brand === "all" || br === brand);

if(matchSearch && matchCategory && matchBrand){
card.classList.remove("hide");
}else{
card.classList.add("hide");
}

});

}

/*==================================
        OUR PRODUCT CAROUSEL
==================================*/

const carousel = document.getElementById("carousel");

if (carousel) {

    let autoScroll = true;
    let resumeTimer;

    const AUTO_SPEED = 0.5;
    const SCROLL_STEP = window.innerWidth <= 768 ? 180 : 260;

    function animate() {

        if (autoScroll) {

            carousel.scrollLeft += AUTO_SPEED;

            /* Seamless loop (duplicate cards required) */
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            }

        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    function pauseScroll() {
        autoScroll = false;
    }

    function resumeScroll() {
        clearTimeout(resumeTimer);

        resumeTimer = setTimeout(() => {
            autoScroll = true;
        }, 1200);
    }

    carousel.addEventListener("mouseenter", pauseScroll);
    carousel.addEventListener("mouseleave", resumeScroll);

    carousel.addEventListener("touchstart", pauseScroll, { passive: true });
    carousel.addEventListener("touchend", resumeScroll, { passive: true });

    carousel.addEventListener("mousedown", pauseScroll);
    carousel.addEventListener("mouseup", resumeScroll);

    carousel.addEventListener("wheel", resumeScroll, { passive: true });

    window.scrollLeft = function () {

        carousel.scrollBy({
            left: -SCROLL_STEP,
            behavior: "smooth"
        });

        resumeScroll();

    };

    window.scrollRight = function () {

        carousel.scrollBy({
            left: SCROLL_STEP,
            behavior: "smooth"
        });

        resumeScroll();

    };

}

    const cards=document.querySelectorAll(".projects-card");

const lightbox=document.querySelector(".gallery-lightbox");
const image=document.getElementById("galleryImage");
const counter=document.querySelector(".gallery-counter");

let gallery=[];
let current=0;

cards.forEach(card=>{

card.querySelector(".project-image").onclick=()=>{

gallery=card.dataset.images.split(",");

current=0;

showImage();

lightbox.classList.add("active");

};

});

function showImage(){

image.src=gallery[current].trim();

counter.innerHTML=`${current+1} / ${gallery.length}`;

}

document.querySelector(".gallery-next").onclick=()=>{

current=(current+1)%gallery.length;

showImage();

};

document.querySelector(".gallery-prev").onclick=()=>{

current=(current-1+gallery.length)%gallery.length;

showImage();

};

document.querySelector(".close-gallery").onclick=()=>{

lightbox.classList.remove("active");

};

lightbox.onclick=e=>{

if(e.target===lightbox){

lightbox.classList.remove("active");

}

};

document.addEventListener("keydown",e=>{

if(!lightbox.classList.contains("active")) return;

if(e.key==="ArrowRight"){

current=(current+1)%gallery.length;

showImage();

}

if(e.key==="ArrowLeft"){

current=(current-1+gallery.length)%gallery.length;

showImage();

}

if(e.key==="Escape"){

lightbox.classList.remove("active");

}

});

/* Mobile Swipe */

let startX=0;

image.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});

image.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;

if(startX-endX>50){

current=(current+1)%gallery.length;

showImage();

}

if(endX-startX>50){

current=(current-1+gallery.length)%gallery.length;

showImage();

}

});

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
