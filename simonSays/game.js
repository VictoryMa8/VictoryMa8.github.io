let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level: ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text(`Level: ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.volume = 0.25;
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart!");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}