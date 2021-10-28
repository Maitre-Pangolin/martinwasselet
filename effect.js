(function () {
  const fullpage = document.querySelector("#fullpage");
  const section = document.querySelector("#info-section");
  const artwork = document.querySelector("#artwork");
  let lastScrollTop = window.scrollY;

  window.addEventListener("scroll", () => {
    console.log("scroll");
  });

  fullpage.addEventListener(
    "scroll",
    _.throttle(({ target: { scrollTop } }) => scrollControl(scrollTop), 1000)
  );

  const scrollControl = (scrollTop) => {
    if (scrollTop < window.innerHeight && scrollTop > lastScrollTop) {
      section.scrollIntoView();
    }
    lastScrollTop = scrollTop;
  };
})();
