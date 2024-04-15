const root = document.documentElement;
const sections = document.querySelectorAll("section");
const home = document.querySelector("section.home");
const career = document.querySelector("section.career");
const technology = document.querySelector("section.technology");
const achievement = document.querySelector("section.achievement");

function init() {
  if (isMobileDevice()) {
    root.classList.add("mobile");
  } else {
    root.classList.add("computer");
  }

  initHome();
  initCareer();
  initTechnology();
  initAchivement();
}

function isMobileDevice() {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

function initHome() {
  setTimeout(() => {
    home.classList.add("show");
  }, 500);

  document.querySelectorAll("button.home").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      showASection(home);
      root.classList.remove("dark");
      root.classList.remove("blue");
      root.classList.remove("purple");
    });
  });

  goToCV();
  goToLinkdin();
  takeContact();
}

function initCareer() {
  document.querySelectorAll("button.career").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      showASection(career);
      root.classList.add("dark");
      root.classList.remove("purple");
      root.classList.remove("blue");
    });
  });

  const schoolChronogyPoint = career.querySelectorAll(
    "div.school > section.container > ul > * "
  );

  const expChronogyPoint = career.querySelectorAll(
    "div.exp > section.container > ul > * "
  );
  const schoolChronogyContent = career.querySelectorAll(
    "div.school > section.container > div.content > div"
  );

  const expChronogyContent = career.querySelectorAll(
    "div.exp > section.container > div.content > div"
  );

  schoolChronogyPoint.forEach((element) => {
    if (element.classList.contains("focusable")) {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        if (!element.nextElementSibling.classList.contains("not-focusable")) {
          schoolChronogyPoint.forEach((elmt) => {
            elmt.classList.remove("focus");
          });
          schoolChronogyContent.forEach((elmt) => {
            if (elmt.classList[0] === element.classList[0]) {
              elmt.classList.add("focus");
            } else {
              elmt.classList.remove("focus");
            }
          });
          element.classList.add("focus");
          element.nextElementSibling.classList.add("focus");
        }
      });
    }
  });

  expChronogyPoint.forEach((element) => {
    if (element.classList.contains("focusable")) {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        if (!element.nextElementSibling.classList.contains("not-focusable")) {
          expChronogyPoint.forEach((elmt) => {
            elmt.classList.remove("focus");
          });
          expChronogyContent.forEach((elmt) => {
            if (elmt.classList[0] === element.classList[0]) {
              elmt.classList.add("focus");
            } else {
              elmt.classList.remove("focus");
            }
          });
          element.classList.add("focus");
          element.nextElementSibling.classList.add("focus");
        }
      });
    }
  });
}

function initTechnology() {
  document.querySelectorAll("button.technology").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      showASection(technology);
      root.classList.remove("dark");
      root.classList.remove("purple");

      root.classList.add("blue");
    });
  });
}

function initAchivement() {
  document.querySelectorAll("button.achievement").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      showASection(achievement);
      root.classList.remove("dark");
      root.classList.remove("blue");
      root.classList.add("purple");
    });
  });
}

init();

/////////////////////////////////// UTIL
function hideASection(section) {
  sections.forEach((element) => {
    if (element.classList.contains("history")) {
      element.classList.remove("history");
    }
    if (element.isEqualNode(section)) {
      element.classList.remove("show");
      element.classList.add("hide");
      setTimeout(() => {
        element.classList.remove("hide");
        element.classList.add("none");
      }, 500);
    }
  });
}

function showASection(section) {
  sections.forEach((element) => {
    if (element.classList.contains("show")) {
      element.classList.remove("show");
      hideASection(element);
      element.classList.add("history");
    }
    if (element.isEqualNode(section)) {
      element.classList.remove("hide");
      element.classList.remove("none");
      setTimeout(() => {
        element.classList.add("show");
      }, 500);
    }
  });
}

function goToCV() {
  const button = home.querySelector("button.cv");
  button.onclick = function () {
    window.location.href =
      "https://drive.google.com/file/d/1bBfqdGNat7DXiHFI7GWanhb0AA7OF2Ix/view?usp=sharing";
  };
}

function goToLinkdin() {
  const button = home.querySelector("button.linkedin");
  button.onclick = function () {
    window.location.href =
      "https://www.linkedin.com/in/charles-coud%C3%A9-a4a076284/";
  };
}

function takeContact() {
  const button = home.querySelector("button.email");
  button.onclick = function () {
    navigator.clipboard.writeText("charles.coude.pro@gmail.com");
    button.innerHTML = "✉️📋Addresse mail copié ! ";
    setTimeout(function () {
      button.innerHTML = "Prendre Contact";
    }, 2000);
  };
}
