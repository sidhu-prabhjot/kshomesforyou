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

/*MAP FUNCTIONALITY*/

//get latitude and longitude
const getLatAndLong = async function () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    } else {
      reject("Could not get geolocation");
    }
  });
};

//reverse geocode latitude, and longitude
const reverseGeocode = async function (latitude, longitude) {
  return new Promise(async (resolve, reject) => {
    if (latitude && longitude) {
      const response = await fetch(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json`
      );
      const data = response.json();
      resolve(data);
    } else {
      reject("Did not receive valid latitude or longitude");
    }
  });
};

// Initialize and add the map
function initMap(latitude, longitude) {
  return new Promise(async (resolve, reject) => {
    if (latitude && longitude) {
      // The location of Uluru
      const uluru = { lat: latitude, lng: longitude };
      // The map, centered at Uluru
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
      });
      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        position: uluru,
        map: map,
      });

      resolve(latitude, longitude);
    } else {
      reject("could not get latitude and longitude");
    }
  });
}

/*main executuion function*/
const main = async function () {
  //get positional data after awaiting promise
  const positionalData = await getLatAndLong();

  const { latitude, longitude } = positionalData.coords;

  console.log(latitude, longitude);

  const revGeoCodeData = await reverseGeocode(latitude, longitude);

  console.log(revGeoCodeData);

  await initMap(latitude, longitude);
};

main();
