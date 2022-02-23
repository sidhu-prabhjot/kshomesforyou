//CURRENT LISTING SLIDER
//constants to hold HTML elements
const btnSliderRight = document.querySelector(".slider__btn--right");
const btnSliderLeft = document.querySelector(".slider__btn--left");
const slide = document.querySelectorAll(".slide");
let currSlide = 0;

//transform elements to correct position
slide.forEach((element, index) => {
  element.style.transform = `translateX(${100 * index}%)`;
});

//total number of slide elements
let totSlides = slide.length - 1;

btnSliderRight.addEventListener("click", function (event) {
  if (currSlide === totSlides) {
    currSlide = 0;
  } else {
    currSlide++;

    slide.forEach((element, index) => {
      element.style.transform = `translateX(${100 * (index - currSlide)}%)`;
    });
  }
});

btnSliderLeft.addEventListener("click", function (event) {
  if (currSlide === 0) {
    currSlide = totSlides;
  } else {
    currSlide--;

    slide.forEach((element, index) => {
      element.style.transform = `translateX(${100 * (index - currSlide)}%)`;
    });
  }
});
