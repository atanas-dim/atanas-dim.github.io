// FUNCTION TO SWITCH FROM FIXED TO INITIAL POSITION TO PREVENT FLICKERING ON 0 TOP POSITION
$(document).on('scroll', function () {
  var scrollPosition = $(document).scrollTop();

  if(scrollPosition > 0) {
    $('header').addClass('fixed');
  }
  else {
    $('header').removeClass('fixed');
  }

})


// HAMBUERGER MENU OPEN/CLOSE & ADD/REMOVE SHADOW
$('.hamburger').on('click', function () {
  

  if ($('.header-main nav').is(':visible')) {
    $('.header-main nav').slideUp(300);
    $('header').removeClass('scroll-shadow');
    $('header').removeClass('header-open');
  }

  else {
    $('.header-main nav').slideDown(300);
    $('header').addClass('scroll-shadow');
    $('header').addClass('header-open');
  }

});



// SHOW/HIDE HEADER ON SCROLL
// ADD/REMOVE SHADOW

var prevScrollPosition = $(document).scrollTop();

$(document).on('scroll', function () {

  var currentScrollPosition = $(document).scrollTop();

  if (currentScrollPosition > 10) {
    $('header').addClass('hidden');
    $('header').removeClass('scroll-shadow');
  }

  if (currentScrollPosition < prevScrollPosition) {
    $('header').removeClass('hidden');
    $('header').addClass('scroll-shadow');
  }

  // FIX FOR MENU JUMP ON SCROLL BACK TO TOP
  if (currentScrollPosition <= 0) {
    $('header').removeClass('hidden');
    $('header').removeClass('scroll-shadow');
  }

 prevScrollPosition = currentScrollPosition;

});


// COPY EMAIL TO CLIPBOARD

// Disable default link function
$('a[href^=mailto]').on('click', function() {
  return false
})

// Copy to clipboard function found on Stack Overflow
function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}


// Function to show alert box on hover
// Followed an example on CodePen from Eric Clark
$(document).ready(function() {

  $('a[href^=mailto]').addClass('email-link');

  var messageCopied = 'Email copied';

  // Add a div inside the link to hold the alert text. Keep it empty to be able to 
  // switch messages without any text staying before the message.
  $('.email-link').append('<div class="email-alert"></div>');
 
  // Add the text to the alert div
  $('.email-alert').append(messageCopied);

  // Function to get the email from the href of the link and copy to clipboard
  $('.email-link').on('click', function() {

      var href = $(this).attr('href');
      var email = href.replace('mailto:', '');

      copyToClipboard();

      $(this).find('.email-alert').fadeIn(200);
      setTimeout(function() {
          $('.email-alert').fadeOut(200);}, 1200);         

  })

})



















