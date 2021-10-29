(function () {
  console.log(
    `👋 Hi there
  While you're here, how about visiting my github account : https://github.com/Maitre-Pangolin 
  Feel free to contact me : martin.wasselet@gmail.com
  Have a great day ! ✌
  `
  );

  const fullpage = document.querySelector("#fullpage");
  const section = document.querySelector("#info-section");
  const artwork = document.querySelector("#artwork");
  let lastScrollTop = window.scrollY;
  let underlineWasTriggered = false;
  const elementsToUnderline = document.querySelectorAll("strong");
  const downArrow = document.querySelector(".down");

  downArrow.addEventListener("click", () => (downArrow.style.display = "none"));

  fullpage.addEventListener(
    "scroll",
    _.throttle(({ target: { scrollTop } }) => scrollControl(scrollTop), 1000)
  );

  const scrollControl = (scrollTop) => {
    if (scrollTop < window.innerHeight && scrollTop > lastScrollTop) {
      if (downArrow.style.display !== "none") downArrow.style.display = "none";
      section.scrollIntoView();
      if (!underlineWasTriggered) {
        underlineWasTriggered = true;
        elementsToUnderline.forEach((e, i) => {
          setTimeout(() => {
            e.classList.add("strongactive");
          }, 500 + i * 200);
        });
      }
    }
    lastScrollTop = scrollTop;
  };
})();
