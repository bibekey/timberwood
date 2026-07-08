
function toggleMenu() {
    const menu = document.getElementById("menu");
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

/* OPEN POPUP */
function showProduct(btn){

let card = btn.closest(".card");

document.getElementById("popup").style.display = "flex";

document.getElementById("popupTitle").innerText =
card.querySelector("h3").innerText;

document.getElementById("popupImage").src =
card.dataset.image;

document.getElementById("oldPrice").innerText =
card.dataset.oldprice;

document.getElementById("newPrice").innerText =
card.dataset.price;

document.getElementById("highlights").innerText =
card.dataset.highlights;

document.getElementById("specs").innerText =
card.dataset.specs;

let features = card.dataset.features.split("|");

document.getElementById("features").innerHTML =
features.map(item => `<li>${item}</li>`).join("");
}

/* CLOSE POPUP */
function closePopup(){
document.getElementById("popup").style.display="none";
}

/* WHATSAPP AUTO MESSAGE */
function sendWhatsApp(){

let productName=document.getElementById("popupTitle").innerText;
let price=document.getElementById("newPrice").innerText;
let oldPrice=document.getElementById("oldPrice").innerText;
let highlights=document.getElementById("highlights").innerText;

/* YOUR NUMBER */
let phone="9779705020251";

let message=`
Furniture Order Request

Product: ${productName}
Price: ${price}
~~${oldPrice}~~

Details: ${highlights}

Please confirm availability & delivery.
`;

let url=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

window.open(url,"_blank");
}

/* LIGHTBOX */
function openLightbox(src){
document.getElementById("lightbox").style.display="flex";
document.getElementById("lightImg").src = src;
}

/* HERO INDEX */

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