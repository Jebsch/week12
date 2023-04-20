"use strict"
//Section used to define code for carousel

const track = document.queryselector ('.carousel_container'); 

const slide = Array.from(track.children);

const nextButton = document.querySelector('.carousel_button--right');

const prevButton = document.querySelector('.carousel_button--left');

const dotsNav = document.querySelector('.carousel_mav');

const dots = Array.from(dotsNav.children);

//Obtaining first photo size of array
const photoLength = slide[0].getBoundingClientRect().width;

//Logging data to see the width of each photo
//console.log(photoLength);

//arrange slides to be sid by side rather than stacked as previously made
//Commented below is the logic for the loop below this block
//slide[0].style.left = photoLength *0 + 'px';
//slide[1].style.left = photoLength *1 + 'px';
//slide[2].style.left = photoLength *2 + 'px';
//slide[3].style.left = photoLength *3 + 'px';
//slide[4].style.left = photoLength *4 + 'px';
const Fixedslpot = (slide, index) => {
slide.style.left = photoLength * index + 'px';
};
slide.forEach(Fixedslpot);

//Making a function to ensure all slides are moving and working properly by use of button
const moveSlide = (track, currentPhoto, destSlide) => {
    track.style.transform = 'translateX(-' + destSlide.style.left + ')';
    currentPhoto.classList.remove ('current-slide');
    destSlide.classList.add ('current-slide');
}

//Making a function to indicate dots being operated on the bottom nav
const dotUpdate = (currentDot, targDot) => {
    currentDot.classList.remove('current-slide');
    currentDot.classList.add('current-slide');
}

//Function to hide and show arrows indicating when the end or beginning of slide is present
const hideNShowArrow = (slide, prevButton, nextButton, targInd) => {
    if (targInd === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targInd === slide.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}
//When left pressed, photos shift left by 1
prevButton.addEventListener('click', e => {
    const currentPhoto = track.querySelector('.current-slide');
    const prevSlide = currentPhoto.oreviousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const nextInd = slide.findIndex(slide => slide === nextSlide);

    //Moving to previous slide
    moveSlide (track, currentPhoto, prevSlide);
    dotUpdate (currentDot, prevDot);
    hideNShowArrow (slide, prevButton, nextButton, nextInd);
});
//When right pressed, photos shift right by 1
nextButton.addEventListener('click', e => {
    const currentPhoto = track.querySelector('.current-slide');
    const nextSlide = currentPhoto.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const prevInd = slide.findIndex(slide => slide === prevSlide);

    //Moving to next slide
    moveSlide (track, currentPhoto, nextSlide);
    dotUpdate (currentDot, nextDot);
    hideNShowArrow (slide, prevButton, nextButton, prevInd);
});

//When indicator pressed, move to correlated slide

dotsNav.addEventListener('click', e) => {
    //What is clicked/Which indicator clicked
    const targDot = e.target.closest('button');

    //Lets coder know what is being pressed on
    //console.log(e.target);

    //Lets coder know if an indicator is being pressed
    //console.log(targDot);
    if (!targDot) return;
//... (22 lines left)
}