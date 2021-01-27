// GREETING

window.onload = (function () {
    getDateTime();
  })();
  
  function getDateTime() {
    var now = new Date();
    var hour = now.getHours();
  
    if (hour >= 0 && hour < 5) {
      document.getElementById("greeting").innerHTML = "Hi, night owl!";
    } else if (hour >= 5 && hour < 12) {
      document.getElementById("greeting").innerHTML = "Good morning!";
    } else if (hour >= 12 && hour < 18 ) {
      document.getElementById("greeting").innerHTML = "Good afternoon!";
    } else if (hour >= 18 && hour < 24) {
      document.getElementById("greeting").innerHTML = "Good evening!";
    } else {
      document.getElementById("greeting").innerHTML = "Hello!";
    }
  }