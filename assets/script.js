/* MOBILE MENU */

function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}




/* OUR PRODUCT */
const carousel = document.getElementById("carousel");
carousel.innerHTML += carousel.innerHTML;

/* AUTO SCROLL */
let autoScrollEnabled = true;
const speed = 0.7;

function autoScroll(){
  if(autoScrollEnabled){
    carousel.scrollLeft += speed;
    if(carousel.scrollLeft >= carousel.scrollWidth / 2){
      carousel.scrollLeft = 0;
    }
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);

carousel.addEventListener("mouseenter",()=>autoScrollEnabled=false);
carousel.addEventListener("mouseleave",()=>autoScrollEnabled=true);
carousel.addEventListener("touchstart",()=>autoScrollEnabled=false,{passive:true});
carousel.addEventListener("touchend",()=>autoScrollEnabled=true,{passive:true});

/* NAV */
function scrollLeft(){
carousel.scrollBy({left:-300,behavior:"smooth"});
}

function scrollRight(){
carousel.scrollBy({left:300,behavior:"smooth"});
}

/* POPUP */
const phone = "9779705020251";

let images = [];
let imgIndex = 0;

function openPopup(title, price, desc, img){
  document.getElementById("popup").style.display="flex";

  document.getElementById("pTitle").innerText = title;
  document.getElementById("pPrice").innerText = price;
  document.getElementById("pDesc").innerText = desc;

  images = [img, img, img];
  imgIndex = 0;
  showImage();

  let msg = `Hello, I want to order:\nProduct: ${title}\nPrice: ${price}`;

  document.getElementById("waBtn").href =
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function showImage(){
document.getElementById("pImg").src = images[imgIndex];
}

function nextImg(){
imgIndex = (imgIndex + 1) % images.length;
showImage();
}

function prevImg(){
imgIndex = (imgIndex - 1 + images.length) % images.length;
showImage();
}

function closePopup(){
document.getElementById("popup").style.display="none";
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