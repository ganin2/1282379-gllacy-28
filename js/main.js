let feedbackOverlay = document.querySelector(".modal-overlay");
let feedbackPopup = feedbackOverlay.querySelector(".feedback-modal-group");
let feedbackLink = document.querySelector(".feedback-link");
let feedbackClose = document.querySelector(".feedback-close-button");
let form = feedbackOverlay.querySelector("form");
let nameField = feedbackOverlay.querySelector("[name=user-id]");
let emailField = feedbackOverlay.querySelector("[name=email");
let feedbackField = feedbackOverlay.querySelector("[name=feedback]");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".slide-toggle");
let wrapper = document.querySelector(".site-wrapper");
let wrappers = ["site-wrapper-green", "site-wrapper-blue", "site-wrapper-brown"];
      
let index = 0;

// Feedback Popup

const popupClose = () => {
  feedbackPopup.classList.remove("feedback-err");
  feedbackPopup.classList.add("feedback-close");
  setTimeout(function() {
    feedbackOverlay.classList.remove("modal-show");
    feedbackPopup.classList.remove("feedback-close");
  }, 600);
}

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

feedbackLink.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedbackOverlay.classList.add("modal-show");
  if (storageName || storageEmail) {
    nameField.value = storageName;
    emailField.value = storageEmail;
    feedbackField.focus();
  } else if (storageName) {
    nameField.value = storageName;
    emailField.focus();
  } else {
    feedbackField.focus();
  }
  feedbackField.value = "";
});

feedbackClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupClose();
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (feedbackOverlay.classList.contains("modal-show")) {
      evt.preventDefault();
      popupClose();
    }
  }
});

form.addEventListener("submit", function(evt) {
  if (!nameField.value || !emailField.value || !feedbackField.value) {
    evt.preventDefault();
    feedbackPopup.classList.remove("feedback-err");
    feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
    feedbackPopup.classList.add("feedback-err");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});

// Map

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.93929, 30.32944],
    zoom: 16,
    controls: ["zoomControl"]
  });
  myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
    hintContent: "Магазин мороженного Глейси:<br>ул. Большая Конюшенная, 19/8, Санкт-Петербург",
  }, {
    iconLayout: "default#image",
    iconImageHref: "img/pin.svg",
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140]
  }), myMap.geoObjects.add(myPlacemark)
}
ymaps.ready(init);

// Slider

const activeSlide = n => {
  for (slide of slides) {
    slide.classList.remove("slide-current");

  }
  slides[n].classList.add("slide-current");
}

const activeToggle = n => {
  for (dot of dots) {
    dot.classList.remove("slide-toggle-current");
  }
  dots[n].classList.add("slide-toggle-current");
}

const changeWrapper = () => {
  for (var i = 0; i < wrappers.length; i++) 
      wrapper.classList.remove(wrappers[i])
      wrapper.classList.add(wrappers[index]);
}

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }

}

const prepareCurrentSlide = ind => {
  activeSlide(ind);
  activeToggle(ind);
  changeWrapper();
}

dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
    clearInterval(interval);
  })
});

const interval = setInterval(nextSlide, 2500);
