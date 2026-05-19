
// HAMBURGER MOBILE NAV

function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu(){
    document.getElementById("navLinks").classList.remove("active");
}


// body fit

const faders = document.querySelectorAll('.fade');

window.addEventListener('scroll', ()=>{
    faders.forEach(el=>{
        if(el.getBoundingClientRect().top < window.innerHeight - 100){
            el.classList.add('show');
        }
    });
});


/* MENU TOGGLE */
function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}

/* CLOSE MENU ON CLICK */
document.querySelectorAll(".nav-link").forEach(link=>{
    link.addEventListener("click",()=>{
        document.getElementById("navLinks").classList.remove("active");
    });
});

/* SCROLL SHRINK */
window.addEventListener("scroll",()=>{
    const nav = document.getElementById("navbar");
    nav.classList.toggle("shrink", window.scrollY > 50);
});

/* ACTIVE LINK HIGHLIGHT */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{
    let current = "";

    sections.forEach(sec=>{
        const top = sec.offsetTop - 100;
        if(pageYOffset >= top){
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
});

