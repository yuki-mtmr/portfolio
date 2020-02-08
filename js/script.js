$(document).ready(function () {
  
  $('#slides').superslides({
    animation: "fade",
    play: 5000,
    pagination: false
  });

  var typed = new Typed(".typed", {
    strings: ["Front-end Engineer.", "Back-end Engineer.", "Web Designer."],
    typeSpeed: 80,
    loop: true,
    startDelay: 1000,
    showCursor: false
  });

});