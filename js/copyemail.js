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

    copyToClipboard(email);

    $(this).find('.email-alert').fadeIn(200);
    setTimeout(function() {
        $('.email-alert').fadeOut(200);}, 1200);         

})

})