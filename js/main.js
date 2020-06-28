var feedbackOverlay = document.querySelector(".modal-overlay");
var feedbackPopup = feedbackOverlay.querySelector(".feedback-modal-group");
var feedbackLink = document.querySelector(".feedback-link");
var feedbackClose = document.querySelector(".feedback-close");
var form = feedbackOverlay.querySelector("form");
var nameField = feedbackOverlay.querySelector("[name=user-id]");
var emailField = feedbackOverlay.querySelector("[name=email");
var feedbackField = feedbackOverlay.querySelector("[name=feedback]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

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
  feedbackOverlay.classList.remove("modal-show");
  feedbackPopup.classList.remove("feedback-err");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (feedbackOverlay.classList.contains("modal-show")) {
      evt.preventDefault();
      feedbackOverlay.classList.remove("modal-show");
      feedbackPopup.classList.remove("feedback-err");
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
