const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li');
const productContainer = document.querySelector('.flex-container-product');
const productBoxes = document.querySelectorAll('.product-box');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentProduct = 0;

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

function updateProductDisplay() {
    if (window.innerWidth < 768) {
        productBoxes.forEach((box, index) => {
            if (index === currentProduct) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    } else {
        productBoxes.forEach(box => {
            box.style.display = 'block';
        });
    }
}

function nextProduct() {
    if (window.innerWidth < 768) {
        currentProduct = (currentProduct + 1) % productBoxes.length;
        updateProductDisplay();
    }
}

function prevProduct() {
    if (window.innerWidth < 768) {
        currentProduct = (currentProduct - 1 + productBoxes.length) % productBoxes.length;
        updateProductDisplay();
    }
}

nextButton.addEventListener('click', nextProduct);
prevButton.addEventListener('click', prevProduct);

window.addEventListener('resize', updateProductDisplay);

// Initial call to set up the correct display
updateProductDisplay();