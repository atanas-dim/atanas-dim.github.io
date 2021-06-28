const emailLinks = Array.from(document.querySelectorAll("a[href^=mailto]"));

// On click run copy email and show alert functions
emailLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    copyEmail(link);
    showAlert(link);
  });
});

// Copy text to clipboard
function copyEmail(element) {
  const href = element.href;
  const textToCopy = href.replace("mailto:", "");

  const myTemporaryInputElement = document.createElement("input");
  myTemporaryInputElement.type = "text";
  myTemporaryInputElement.value = textToCopy;

  document.body.appendChild(myTemporaryInputElement);

  myTemporaryInputElement.select();
  document.execCommand("Copy");

  document.body.removeChild(myTemporaryInputElement);
}

// Show/hide alert message
function showAlert(element) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("email-alert");
  alertDiv.innerHTML = "Email copied";

  element.style.position = "relative";

  element.appendChild(alertDiv);

  const fadeIn = setInterval(function () {
    if (!alertDiv.style.opacity) {
      alertDiv.style.opacity = 0;
    }
    if (alertDiv.style.opacity < 1) {
      alertDiv.style.opacity = 1;
    } else {
      clearInterval(fadeIn);
    }
  }, 0);

  const fadeOut = setInterval(function () {
    if (alertDiv.style.opacity > 0) {
      alertDiv.style.opacity = 0;
    } else {
      clearInterval(fadeOut);
    }
  }, 1500);

  // remove the alert div
  setTimeout(function () {
    alertDiv.remove();
  }, 1600);
}
