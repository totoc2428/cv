window.onload = function () {
    setiFIsMobileDevice();
    initScroll();

    goToCV();
    goToLinkdin();
    takeContact();





}

function isMobileDevice() {
    if (navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        //|| navigator.userAgent.match(/Windows/i)//to do suprimer
    ) {
        return true;
    }
    else {
        return false;
    }
}


function setiFIsMobileDevice() {
    const isMobile = isMobileDevice();
    console.log(isMobile);
    if (isMobile == true) {
        document.getElementById("body").removeChild(document.getElementById("computerPart"));
        document.getElementById("mobilePart").classList.add("show");
        mobilNextPart();
    }
    else {
        document.getElementById("body").removeChild(document.getElementById("mobilePart"));

        part1ToPart2();
        part2toPart1();
        part2ToPart3();
        part3ToPart2();
        part3ToPart4();


        skiptoPartTwo();
        skiptoPartTree();
        skiptoPartFour();
    }

}


function mobilNextPart() {
    var button = document.getElementById("nextMobilebutton");
    button.onclick = function () {
        console.log("execution de mobilNextPart");
        document.getElementById("mobPart1").classList.add("hide");
        document.getElementById("mobPart2").classList.add("show");

    }
}

function initScroll() {
    window.scrollTo({ top: 0.0, left: 0.0 });
}

function skiptoPartTwo() {
    document.getElementById("goToPartTwo").onclick = function () {
        document.getElementById("firstPartNextButton").click();
    }
}

function skiptoPartTree() {
    document.getElementById("goToPartTree").onclick = function () {
        document.getElementById("firstPartNextButton").click();
        document.getElementById("secondPartNextButton").click();
    }
}

function skiptoPartFour() {
    document.getElementById("goToPartFour").onclick = function () {
        document.getElementById("firstPartNextButton").click();
        document.getElementById("secondPartNextButton").click();
        document.getElementById("thirdPartNextButton").click();

    }
}


function part1ToPart2() {
    var nextButton = document.getElementById("firstPartNextButton");
    var part1 = document.getElementById("firstPart");
    var part2 = document.getElementById("secondPart");

    //ONCLICK

    nextButton.onclick = function () {
        part1.classList.remove("showAnimation");
        part2.classList.remove("showAnimation", "goBack");
        window.requestAnimationFrame(function (time) {
            part1.classList.add("hideAnimation");
            part2.classList.add("showAnimation");
        });
    }
    //nextButton.click();

}

function part2toPart1() {
    var goBack = document.getElementById("secondPartGoBack");
    var part1 = document.getElementById("firstPart");
    var part2 = document.getElementById("secondPart");
    goBack.onclick = function () {
        part1.classList.remove("hideAnimation");
        part2.classList.remove("showAnimation");
        window.requestAnimationFrame(function (time) {
            part1.classList.add("showAnimation");
            part2.classList.add("showAnimation", "goBack");
        });
    }

}

function part2ToPart3() {
    var nextButton = document.getElementById("secondPartNextButton");
    var part2 = document.getElementById("secondPart");
    var part3 = document.getElementById("thirdPart");

    nextButton.onclick = function () {
        window.scrollTo(0, 0);
        part2.classList.remove("showAnimation");
        part3.classList.remove("hideAnimation", "goBack");
        window.requestAnimationFrame(function (time) {
            part2.classList.add("hideAnimation");
            part3.classList.add("showAnimation");
        });
    }
    //nextButton.click();
}

function part3ToPart2() {
    var goBack = document.getElementById("thirdPartGoBack");
    var part2 = document.getElementById("secondPart");
    var part3 = document.getElementById("thirdPart");

    goBack.onclick = function () {
        part2.classList.remove("hideAnimation");
        part3.classList.remove("showAnimation");
        window.requestAnimationFrame(function (time) {
            part2.classList.add("hideAnimation", "goBack");
            part3.classList.add("showAnimation", "goBack");
        });

    }
}

function part3ToPart4() {
    var nextButton = document.getElementById("thirdPartNextButton");
    var part3 = document.getElementById("thirdPart");
    var part4 = document.getElementById("fourPart");

    nextButton.onclick = function () {
        part3.classList.remove("showAnimation");
        part4.classList.remove("hideAnimation");
        window.requestAnimationFrame(function (time) {
            part3.classList.add("hideAnimation");
            part4.classList.add("showAnimation");
            document.getElementById("body").style.overflow = "hidden";
            initScroll();
        });
    }
}

function goToCV() {
    var button = document.getElementById("goToCV");
    button.onclick = function () {
        window.location.href = "./ressources/cv/charlescoudécv.pdf";
    }
}

function goToLinkdin() {
    var button = document.getElementById("goToLinkdin");
    button.onclick = function () {
        window.location.href = "https://www.linkedin.com/in/charles-coud%C3%A9-a4a076284/";
    }
}

function takeContact() {
    var button = document.getElementById("takeContact");
    button.onclick = function () {
        navigator.clipboard.writeText("charles.coude.pro@gmail.com");
        button.innerHTML = "✉️📋Addresse mail copié ! "
        setTimeout(function () {
            button.innerHTML = "Prendre Contact"
        }, 2000);
    }
}