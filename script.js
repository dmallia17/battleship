/*
File Name: script.js
Author: Daniel Mallia and Jayson Tan
Date Begun: 2/28/2019
*/

const compZones = document.querySelectorAll('.compBoard .zone');
const playerZones = document.querySelectorAll('.playerBoard .zone');

gameBegin();


function gameBegin() {
  document.querySelector(".gameOverDisplay").style.display = "none"; //Clears gameOverDisplay

  //Clear compboard colors
  for(let i = 0; i < compZones.length; i++) {
    compZones[i].style.backgroundColor = "gray";
  }

  //Clear playerBoardcolors
  for(let i = 0; i < playerZones.length; i++) {
    playerZones[i].style.backgroundColor = "white";
    playerZones[i].addEventListener('click', setup, false);
  }
}



function setup(zone) {

  placeCompShip();
}
