function onImageClick1(){
    window.open("https://www.youtube.com/howyoutubeworks/")
}
const youtube = document.getElementById('youtube');
youtube.addEventListener('click', onImageClick1);

function onImageClick2(){
    window.open("https://about.instagram.com/")
}
const instagram = document.getElementById('instagram');
instagram.addEventListener('click', onImageClick2);

function onImageClick3(){
    window.open("https://www.tiktok.com/about?lang=en")
}
const tiktok = document.getElementById('tiktok');
tiktok.addEventListener('click', onImageClick3);

function onImageClick4(){
    window.open("https://about.fb.com/company-info./")
}
const facebook = document.getElementById('facebook');
facebook.addEventListener('click', onImageClick4);

function onImageClick5(){
    window.open("https://about.x.com/en")
}
const twitter = document.getElementById('twitter');
twitter.addEventListener('click', onImageClick5);

function onImageClick6(){
    window.open("https://parents.snapchat.com/?lang=en-US&_ga=2.125494797.60474768.1715441461-938540641.1715441461")
}
const snapchat = document.getElementById('snapchat');
snapchat.addEventListener('click', onImageClick6);

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var scrollToTopBtn = document.getElementById("scrollToTop");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}