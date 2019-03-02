/*
File Name: script.js
Author: Daniel Mallia and Jayson Tan
Date Begun: 2/28/2019
*/

const compZones = document.querySelectorAll('.compBoard .zone');
const playerZones = document.querySelectorAll('.playerBoard .zone');
let gameState = [];
let playerShip = [];
let compShip = [];

gameBegin();


function gameBegin() {
  document.querySelector(".gameOverDisplay").style.display = "none"; //Clears gameOverDisplay

  //Clear game arrays
  gameState = Array.from(Array(50).keys());
  playerShip = [];
  compShip =[];

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
  placePlayerShip(zone);
  placeCompShip();

  
}

function placePlayerShip(zone) {
  if(playerShip.length === 0) {
    playerShip.push(Number(zone.target.id));
    zone.target.removeEventListener('click', setup, false);
    zone.target.style.backgroundColor = "green";
  }
  else if(playerShip.length === 1) {
    if((Number(zone.target.id) === (playerShip[0] + 1)) || (Number(zone.target.id) === (playerShip[0] - 1)) ||
       (Number(zone.target.id) === (playerShip[0] + 5)) || (Number(zone.target.id) === (playerShip[0] - 5))) {
         playerShip.push(zone.target.id);
         zone.target.style.backgroundColor = "green";
         for(let i = 0; i < playerZones.length; i++) {
           playerZones[i].removeEventListener('click', setup, false);
         }
       }
  }
}

function placeCompShip() {
  if(compShip.length === 0) {
    compShip.push(Math.floor(Math.random() * 24));
    compZones[compShip[0]].style.backgroundColor = "green";
  }
  else if(compShip.length === 1) {
    while(compShip.length !== 2) {
      let choice = Math.floor(Math.random() * 24);
      if((choice !== compShip[0] && choice >= 0 && choice <= 24) &&
        (Number(choice) === compShip[0] + 1 || Number(choice) === compShip[0] - 1 ||
         Number(choice) === compShip[0] + 5 || Number(choice) === compShip[0] - 5)) {
           compShip.push(choice);
           compZones[compShip[1]].style.backgroundColor = "green";
      }
    }
  }
}
