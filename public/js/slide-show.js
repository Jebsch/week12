"use strict";

const $ = (selector) => document.querySelector(selector);

let imageCounter = 0;

const caption = $("#caption");
const mainImage = $("#main_image");
let imageCache = [];
//next image function
const swapImage = ()=>{
    imageCounter = (imageCounter +1) % imageCache.length;

    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;

    caption.textContent = imageCache[imageCounter].alt;
    
}
//last image function
const lastImage = ()=>{
    imageCounter = (imageCounter +4) % imageCache.length;

    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;

    caption.textContent = imageCache[imageCounter].alt;
    
}


document.addEventListener("DOMContentLoaded", () => {
    const links= document.querySelectorAll("a.carousel");

    let image;
 // clear imageCache before adding new images and swap every 4 seconds
 imageCache = [];

    for (let link of links){
        image = new Image();

        image.src = link.href;
        image.alt = link.title;

        imageCache.push(image);
    }
    let intervalId = setInterval(swapImage, 4000);
//left arrow goes to last image
    const leftarrowBtn = document.getElementById("left-arrow-btn");
    leftarrowBtn.addEventListener("click", ()=>{
        clearInterval(intervalId);
        lastImage();
        intervalId = setInterval(swapImage, 4000);
    });
//right arrow goes to next image
    const rightarrowBtn = document.getElementById("right-arrow-btn");
    rightarrowBtn.addEventListener("click", ()=>{
        clearInterval(intervalId);
        swapImage();
        intervalId = setInterval(swapImage, 4000);
    });

});
