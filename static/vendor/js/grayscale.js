/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("sticky-nav");
  } else {
    $(".navbar-fixed-top").removeClass("sticky-nav");
  }
}

function initPage() {
  collapseNavbar();
  $('body').animateCss('fadeIn');
}

$(window).scroll(collapseNavbar);
$(document).ready(initPage);


// extend Jquery to have animte method
$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

// $(document).click(function(e) {
//   e.stopPropagation();
//   if (!$(e.target).is('ul.navbar-nav')) {
//     $('.collapse').collapse('hide');
//   }
// });

$(document).on('touchend', function(e) {
  e.stopPropagation();
  if (!$(e.target).is('ul.navbar-nav')) {
    $('.collapse').collapse('hide');
  }
})
