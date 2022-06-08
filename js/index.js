'use strict';

// const PIC_LIST = [$('#js-main-img1'), $('#js-main-img2'), $('#js-main-img3'), $('#js-main-img4'), $('#js-main-img5'), $('#js-main-img6')];
const PIC_LIST = [1, 2, 3];
let NEXT_PIC = 0;
let CURRENT_PIC = PIC_LIST.length - 1;
let STOP = false;

function morePicBanner() {
  $('#js-landing').replaceWith(`
    <div id='js-landing' class='more_intro'>
      <img id='js-main-img' class='more_intro_img' src="./img/capemay.jpg">
    </div>
  `);
}

function playMusic() {
  window.document.querySelector('audio').play();
  STOP = true; // stop slide show
  $('#js-btn-more').hide();
  $('#js-warning').hide();
  $('#js-cover-greeting').hide();
  $('#js-greeting').css('display', 'none');
//hide
  // $('.intro').hide();
  $('#js-main-img1').hide();
  $('#js-main-img2').hide();
  $('#js-main-img3').hide();

  $('#js-main-img-next').css('display', 'block');
  // $('#js-main-img').attr('src', './img/capemay_bw.jpg');
  $('#js-main-img').addClass('fi_short');
  
  $('#js-loader').css('display', 'block');

  setTimeout(function () {
    $('#js-loader-img').css('opacity', '0.3');
  }, 1000);

  setTimeout(function () {
    // $('#js-main-img').attr('src', './img/capemay.jpg');
    $('#js-loader').css('display', 'none');
    // $('#js-landing').hide();
    // $('#js-greeting').addClass('background_2');
    $('#js-greeting').css('display', 'block');
    $('#js-more-pic').css('display', 'block');
    $('#js-btn-mute').css('display', 'flex');
    $('#js-msg-bottom').css('display', 'block');
  }, 2000);

}

function stopMusic() {
  window.document.querySelector('audio').pause();
  $('#js-btn-mute').hide();
  $('#js-btn-mute-2').hide();
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
  const heightFactor = isLandscape ? 0.8 : 0.6;
  const bottomFactor = isLandscape ? '20%' : '40%';
  const greetingTopFactor = isLandscape ? 0.7 : 0.53;
  // $('#js-bottom').css('margin-top', height*greetingTopFactor);
  $('#js-bottom').css('margin-top', height*greetingTopFactor*1.05);
  // $('#js-btn-mute').css('margin-top', height*greetingTopFactor*1.05);
  $('.intro').css('height', height * heightFactor);

//okim  $('#js-main-img-next').css('height', height * 0.6);
  // $('#js-landing').css('bottom', bottomFactor);
  $('.intro').css('bottom', bottomFactor);

  if (!isLandscape) {
    $('#js-greeting').css('background-position', 'top right');
    $('#js-greeting').css('background-size', '100%');
    $('#js-mobile-logo').css('width', '220px');
    $('.img_p, .img_l').css('padding', '7% 0');
    $('.img_p, .img_l').css('margin-bottom', '11%');
    $('#js-name').css('font-size', '1.4rem');
    $('.btn_black').addClass('btn_mobile');
    $('#js-warning').addClass('warning_mobile');
    // $('#js-wedding').css('width', '10px');
  }

  if (width < 1600) {
    $('.img_l').css('width', '100%');
    $('.img_p').css('width', '90%');
  }
  // setTimeout(function () {
  //     $('#js-main-img').attr('src', './img/main3.jpg');
  //     $('#js-main-img').addClass('fi');
  //   }, 5000);
}

function handleEvent() {;
  let songTrack = 0;
  const songList = ['./img/song-fallin.m4a', './img/situ.mp3', './img/madeleine.mp3'];
  songList.sort(() => Math.random() - 0.5);

  $('audio').attr('src', songList[songTrack++]);

  $('audio').on({
    // play: function() {
    //   console.log("AK: here")
    // },

    ended: function() {
      if (songTrack === songList.length) songTrack = 0;
      $('audio').attr('src', songList[songTrack++]);
      window.document.querySelector('audio').play();
    }
  });

}

async function slideShowPlay() { 
  if (STOP === true) {
    $('#js-main-img1').hide();
    $('#js-main-img2').hide();
    $('#js-main-img3').hide();  
    return;
  }

  if (NEXT_PIC === 0) $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('z-index', '-2');
  $(`#js-main-img${PIC_LIST[NEXT_PIC]}`).css('display', 'block');

  setTimeout(function() {
    if (NEXT_PIC === 0) $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('z-index', '-1');
    $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('display', 'none');
    CURRENT_PIC = NEXT_PIC;
    NEXT_PIC = (NEXT_PIC + 1) % PIC_LIST.length;
    slideShowPlay();
  }, 6000);
}

function loader() {
  setTimeout(function() {
    $('#js-page-loader').css('display', 'none');
    $('.intro').css('display', 'none');
    $('#js-main-img1').css('display', 'block');
  }, 1500);
}

$(_=> {
  handleEvent();
  renderMainImage();
  loader();
  slideShowPlay();
});
