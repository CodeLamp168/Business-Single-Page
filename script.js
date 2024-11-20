const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li');
const aboutTitle = document.getElementById('aboutTitle');
const aboutDescription = document.getElementById('aboutDescription');
const carouselImages = document.querySelectorAll('.carousel-image');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');

const aboutContent = [
    {
        title: "Welcome to Our Platform",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus illo, deleniti temporibus veritatis aperiam nihil voluptatibus officia porro debitis cupiditate libero eum quod officiis omnis rerum sed atque quisquam fuga."
    },
    {
        title: "Innovative Solutions",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic aliquam explicabo molestiae voluptate quam consectetur aut ipsa quo iste nisi accusantium in, fugiat saepe, ea sapiente praesentium excepturi qui deserunt."
    },
    {
        title: "Expert Support",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum unde esse quis ipsum nostrum tempore, nesciunt neque numquam, culpa deserunt sed mollitia minus obcaecati consequuntur laboriosam enim. Hic nam exercitationem molestias tempora. Temporibus provident tempore dolor consequatur aliquam non quos at? Nihil corrupti praesentium officiis."
    }
];
let currentIndex = 0;


//nav
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

let prevScrollPos = window.pageYOffset;
const header = document.getElementById("header");
const headerHeight = header.offsetHeight;

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    
    if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = `-${headerHeight}px`;
    }

    if (currentScrollPos === 0) {
        header.style.top = "0";
    }

    prevScrollPos = currentScrollPos;
}


//about carousel

function updateCarousel(index) {
    carouselImages.forEach((image, i) => {
        image.classList.toggle('active', i === index);
    });
    carouselIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    aboutTitle.textContent = aboutContent[index].title;
    aboutDescription.textContent = aboutContent[index].description;
    currentIndex = index;
}

function nextSlide() {
    updateCarousel((currentIndex + 1) % carouselImages.length);
}

function prevSlide() {
    updateCarousel((currentIndex - 1 + carouselImages.length) % carouselImages.length);
}

carouselIndicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        updateCarousel(parseInt(indicator.dataset.index));
    });
});

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
    }
}

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Initialize the carousel
updateCarousel(0);

