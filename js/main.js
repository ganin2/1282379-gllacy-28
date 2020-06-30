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

const popupClose = () => {
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
  feedbackPopup.classList.remove("feedback-err");
  feedbackPopup.classList.add("feedback-close");
  popupClose();
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (feedbackOverlay.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackPopup.classList.remove("feedback-err");
      feedbackPopup.classList.add("feedback-close");
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