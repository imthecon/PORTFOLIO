// VANILLA JAVASCRIPT
var backToTop = document.getElementById("top");

window.onscroll = function() {
  if (window.scrollY > 1000) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};