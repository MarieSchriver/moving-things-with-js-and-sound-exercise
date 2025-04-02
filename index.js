"use strict";

// Henter lyd-elementer fra HTML
const movementSound = document.getElementById("movementSound");
const gameoverSound = document.getElementById("gameoverSound");
const catchSound = new Audio("sounds/catch.mp3"); // Lyd ved fangst

// Funktion til at afspille lyd ved bevægelse
function playSoundOnMovement() {
    movementSound.currentTime = 0;
    movementSound.play();
}

// Funktion til at afspille game over lyd
function playGameOverSound() {
    gameoverSound.currentTime = 0;
    gameoverSound.play();
}

// Funktion til at afspille fangst-lyd
function playCatchSound() {
    catchSound.currentTime = 0;
    catchSound.play();
}

// Funktion til at flytte dodger til højre
function moveDodgerRight() {
    const leftNumbers = dodger.style.left.replace("px", "");
    const left = parseInt(leftNumbers, 10);
    
    if (left < 360) {
        dodger.style.left = `${left + 3}px`;
        playSoundOnMovement();
        checkCollision();
    } else {
        playGameOverSound();
    }
}

// Funktion til at flytte dodger til venstre
function moveDodgerLeft() {
    const leftNumbers = dodger.style.left.replace("px", "");
    const left = parseInt(leftNumbers, 10);
    
    if (left > 0) {
        dodger.style.left = `${left - 3}px`;
        playSoundOnMovement();
        checkCollision();
    } else {
        playGameOverSound();
    }
}

// Funktion til at flytte dodger op
function moveDodgerUp() {
    const bottomNumbers = dodger.style.bottom.replace("px", "");
    const bottom = parseInt(bottomNumbers, 10);
    
    if (bottom < 380) {
        dodger.style.bottom = `${bottom + 3}px`;
        playSoundOnMovement();
        checkCollision();
    } else {
        playGameOverSound();
    }
}

// Funktion til at flytte dodger ned
function moveDodgerDown() {
    const bottomNumbers = dodger.style.bottom.replace("px", "");
    const bottom = parseInt(bottomNumbers, 10);
    
    if (bottom > 0) {
        dodger.style.bottom = `${bottom - 3}px`;
        playSoundOnMovement();
        checkCollision();
    } else {
        playGameOverSound();
    }
}

// Lytter efter tastaturinput og bevæger dodger afhængigt af piletasten
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        moveDodgerLeft();
    }
    if (e.key === "ArrowRight") {
        moveDodgerRight();
    }
    if (e.key === "ArrowUp") {
        moveDodgerUp();
    }
    if (e.key === "ArrowDown") {
        moveDodgerDown();
    }
});

// Ændrer baggrundsbilledet af dodger til Pac-Man
dodger.style.backgroundImage = "url('img/pacman.png')";
dodger.style.backgroundSize = "contain";
dodger.style.backgroundRepeat = "no-repeat";

dodger.style.left = "180px";
dodger.style.bottom = "180px";

// Exercise 8 - Add Game Logic - A red circle to catch
const catchObject = document.createElement("div");
catchObject.id = "catchObject";
catchObject.style.width = "20px";
catchObject.style.height = "20px";
catchObject.style.backgroundColor = "red";
catchObject.style.borderRadius = "50%"; // Gør det til en cirkel
catchObject.style.position = "absolute";
moveCatchObject();
document.getElementById("game").appendChild(catchObject);

// Funktion til at placere catchObject på en tilfældig position
function moveCatchObject() {
    const randomLeft = Math.floor(Math.random() * 360) + "px";
    const randomBottom = Math.floor(Math.random() * 380) + "px";
    catchObject.style.left = randomLeft;
    catchObject.style.bottom = randomBottom;
}

// Funktion til at tjekke kollision mellem dodger og catchObject
function checkCollision() {
    const dodgerRect = dodger.getBoundingClientRect();
    const catchRect = catchObject.getBoundingClientRect();
    
    if (
        dodgerRect.left < catchRect.right &&
        dodgerRect.right > catchRect.left &&
        dodgerRect.top < catchRect.bottom &&
        dodgerRect.bottom > catchRect.top
    ) {
        playCatchSound();
        moveCatchObject(); // Flytter catchObject når den bliver fanget
    }
}
