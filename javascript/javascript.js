window.onload = function () {

    initScroll();

    part1ToPart2();
    part2toPart1();
    part2ToPart3();
    part3ToPart2();
    part3ToPart4();


    goToLinkdin();
    takeContact();

}

function initScroll() {
    window.scrollTo({
        top: 0,
        left: 0
    });
}

function part1ToPart2() {
    var nextButton = document.getElementById("firstPartNexButton");
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

}

function goToLinkdin() {
    var button = document.getElementById("goToLinkdin");
    button.onclick = function () {
        window.location.href = "https://www.linkedin.com/in/charles-coud%C3%A9-a4a076284/"
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