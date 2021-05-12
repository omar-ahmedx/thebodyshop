const imgs = document.querySelectorAll(".main-img img");
if (imgs.length > 1) {
  $(".main-img").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".imgs-slick",
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: true,
        },
      },
    ],
  });
}

$(".imgs-slick").slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: ".main-img",
  centerMode: true,
  focusOnSelect: true,
  verticalSwiping: true,
  centerMode: false,
  vertical: true,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
        arrows: true,
      },
    },
  ],
});
/*--- Buying Control --- */
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const input = document.querySelector("input");
increase.addEventListener("click", function () {
  if (input.value < input.size) {
    input.value++;
  }
});
decrease.addEventListener("click", function () {
  if (input.value > 1) {
    input.value--;
  }
});
input.addEventListener("focusout", function () {
  if (input.value > input.size) {
    input.value = input.size;
  }
});
/*--- Sub Info ---*/
const tabContent = document.querySelectorAll(".tab-content");
const tabContentArray = Array.from(tabContent);
const mq = window.matchMedia("(min-width: 1026px)");
if (mq.matches) {
  tabContentArray[0].classList.add("active-content");
  tabContentArray[0].style.maxHeight = "300px";
}
const tabs = document.querySelectorAll(".tab");
const border = document.querySelector(".pt-tabs-border");
const activeTab = document.querySelector(".tab");
const root = document.documentElement;
root.style.setProperty("--left", activeTab.offsetLeft + "px");
root.style.setProperty("--width", activeTab.clientWidth + "px");
for (let tab of tabs) {
  tab.addEventListener("click", (e) => {
    const et = e.target;
    let width = et.clientWidth;
    let left = et.offsetLeft;
    const allContent = document.querySelectorAll(".tab-content");
    if (mq.matches) {
      const active = document.querySelector(".active");
      if (active) {
        active.classList.remove("active");
      }
      et.classList.add("active");

      root.style.setProperty("--left", left + "px");
      root.style.setProperty("--width", width + "px");

      for (let content of allContent) {
        if (
          content.getAttribute("data-number") ===
          tab.getAttribute("data-number")
        ) {
          content.style.display = "block";
          setTimeout(function () {
            content.style.maxHeight = "300px";
          }, 200);
        } else {
          content.style.maxHeight = "0";
          setTimeout(function () {
            content.style.display = "none";
          }, 600);
        }
      }
    } else {
      if (et.classList.contains("active")) {
        et.classList.remove("active");
        for (let content of allContent) {
          if (
            content.getAttribute("data-number") ===
            tab.getAttribute("data-number")
          ) {
            content.style.maxHeight = "0";
            setTimeout(function () {
              content.style.display = "none";
            }, 600);
          }
        }
      } else {
        const active = document.querySelector(".active");
        if (active) {
          active.classList.remove("active");
        }
        et.classList.add("active");
        for (let content of allContent) {
          if (
            content.getAttribute("data-number") ===
            tab.getAttribute("data-number")
          ) {
            content.style.display = "block";
            setTimeout(function () {
              content.style.maxHeight = "300px";
            }, 200);
          } else {
            content.style.maxHeight = "0";
            setTimeout(function () {
              content.style.display = "none";
            }, 600);
          }
        }
      }
    }
  });
}
