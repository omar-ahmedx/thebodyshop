$(".main-container").slick({
  arrows: true,
  rows: 1,
  slidesPerRow: 1,
  slidesToScroll: 4,
  slidesToShow: 4,
  touchThreshold: 500,
  dots: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});

/*--- navigation ---*/
function scrollFunction() {
  const mq = window.matchMedia("(min-width: 1000px)");
  const nav = document.querySelector(".navBar-sticky");
  if (
    mq.matches &&
    (document.body.scrollTop > 216.4 ||
      document.documentElement.scrollTop > 216.4)
  ) {
    nav.style.cssText = "display:flex;";
    setTimeout(function () {
      nav.classList.add("sticky");
    }, 100);
  } else if (
    !mq.matches &&
    (document.body.scrollTop > 67 || document.documentElement.scrollTop > 67)
  ) {
    nav.style.cssText = "display:flex;";
    setTimeout(function () {
      nav.classList.add("sticky");
    }, 100);
  } else {
    nav.style.cssText = "display:none;";
    nav.classList.remove("sticky");
  }
}
window.onscroll = function () {
  scrollFunction();
};

const nav = document.querySelector(".side-nav");
const bg = document.querySelector(".full-screen-bg");
const body = document.querySelector("body");
function openNav() {
  nav.style.display = "flex";
  body.style.overflowY = "hidden";
  setTimeout(function () {
    nav.classList.add("open-side-nav");
    bg.classList.add("open");
  }, 100);
}
const openBtns = document.querySelectorAll(".open-btn");
const openBtnsArray = Array.from(openBtns);
openBtnsArray.forEach((btn) => {
  btn.addEventListener("click", openNav);
});

function closeNav() {
  body.style.overflowY = "scroll";
  nav.classList.remove("open-side-nav");
  bg.classList.remove("open");
}
const close = document.querySelector("#close-btn");
close.addEventListener("click", closeNav);
bg.addEventListener("click", closeNav);

/*--- footer --- */
const ftHeaders = document.querySelectorAll(".ft-header");
for (let header of ftHeaders) {
  header.addEventListener("click", (e) => {
    const et = e.target;
    const ftContents = document.querySelectorAll(".f-content");
    for (let content of ftContents) {
      if (
        content.getAttribute("data-number") ===
        header.getAttribute("data-number")
      ) {
        content.style.display = "block";
        setTimeout(function () {
          content.classList.toggle("show-footer-content");
          header.classList.toggle("active");
        }, 100);
      }
    }
  });
}
