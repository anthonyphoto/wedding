'use strict';

function openLiveMeeting() {
  window.open(COMMON.zoomLink, '_blank');
}

function playMusic() {
  // var audio = new Audio('./img/bgmusic.m4a');
  // audio.play();  
  window.document.getElementById('js-audio').play();
  $('#js-btn-more').hide();
  $('#js-loader').css('display', 'block');

  setTimeout(function () {
      $('#js-loader').css('display', 'none');
      $('#js-more-pic').css('display', 'block');
    }, 3000);

}


function toggleFullList() {
  const listLength = $('#js-future-meetings').attr("cnt");

  $('#js-future-meetings').attr("cnt", listLength === "1" ? "0" : "1");
  renderFutureMeetings();
}

function openHelp() {
  $('#js-help').removeClass('hidden');
  $('#js-popup-bg').removeClass('hidden');
}

function closeHelp() {
  $('#js-help').addClass('hidden');
  $('#js-popup-bg').addClass('hidden');
}

function renderMainImage() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const isLandscape = width > height;
  const heightFactor = isLandscape ? 0.8 : 0.5;
  const bottomFactor = isLandscape ? '20%' : '40%';
  const greetingTopFactor = isLandscape ? 0.7 : 0.5;
  console.log("AK: ", width, height)
  $('#js-bottom').css('margin-top', height*greetingTopFactor);
  $('#js-main-img').css('height', height * heightFactor);
  $('#js-landing').css('bottom', bottomFactor);
  // $('#js-greeting').css('top', height * greetingTopFactor);
  
  if (isLandscape && width > 1800) {
    $('#js-mobile-logo').css('margin-left', '10vw');
    $('#js-copy-right').css('margin-left', '10vw');
  }

  if (!isLandscape) {
    $('#js-greeting').css('background-position', 'top right');
    $('#js-greeting').css('background-size', '100%');
  }

  if (width < 1600) {
    $('.img_l').css('width', '100%');
    $('.img_p').css('width', '90%');
  }


  // $('#js-landing').append(`<img class='main_img' src="./img/bg.jpg">`);

}

$(_=> {
  renderMainImage();

});
