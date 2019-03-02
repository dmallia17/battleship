/*
File Name: script.js
Author: Daniel Mallia and Jayson Tan
Date Begun: 2/28/2019
*/

const compZones = document.querySelectorAll('.compBoard .zone');
const playerZones = document.querySelectorAll('.playerBoard .zone');
let playerShip = [];
let compShip = [];
let compChoices =[];

gameBegin();


function gameBegin() {
  document.querySelector(".gameOverDisplay").style.display = "none"; //Clears gameOverDisplay

  //Clear game arrays
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
  for(let i = 0; i < playerZones.length; i++) {
    compZones[i].addEventListener('click', fire, false);
  }

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
      if(!(playerShip[0] % 5 === 0 && Number(zone.target.id) === playerShip[0] - 1) &&
         !(playerShip[0] % 5 === 4 && Number(zone.target.id) === playerShip[0] + 1)){
        playerShip.push(Number(zone.target.id));
        zone.target.style.backgroundColor = "green";
        for(let i = 0; i < playerZones.length; i++) {
          playerZones[i].removeEventListener('click', setup, false);
        }
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
      if((choice !== compShip[0]) &&
        (Number(choice) === compShip[0] + 1 || Number(choice) === compShip[0] - 1 ||
         Number(choice) === compShip[0] + 5 || Number(choice) === compShip[0] - 5)) {

        if(!(compShip[0] % 5 === 0 && Number(choice) === compShip[0] - 1) &&
           !(compShip[0] % 5 === 4 && Number(choice) === compShip[0] + 1)){
          compShip.push(choice);
          compZones[compShip[1]].style.backgroundColor = "green";
        }
      }
    }
  }
}

function fire(zone) {
  playerTurn(zone);
  compTurn();
}

function playerTurn(zone){
  let index = compShip.indexOf(Number(zone.target.id));
  if(index > -1) {
    compZones[compShip[index]].style.backgroundColor = "red";
    compShip.splice(index, 1);
    zone.target.removeEventListener('click', fire, false);
    checkWin();
  }
  else {
    zone.target.style.backgroundColor = "blue";
  }
}

function compTurn() {
  let choice = (Math.floor(Math.random() * 24)) + 25;
  while (compChoices.indexOf(choice) > -1) {
    choice = (Math.floor(Math.random() * 24)) + 25;
  }
  compChoices.push(choice);
  console.log(choice);
  let index = playerShip.indexOf(choice);
  if(index > -1) {
    playerZones[choice % 25].style.backgroundColor = "red";
    playerShip.splice(index, 1);
    checkWin();
  }
  else {
    playerZones[choice % 25].style.backgroundColor = "blue";
  }
}

function checkWin() {
  if(playerShip.length === 0) {
    gameOver("Computer Wins");
  }
  else if(compShip.length === 0) {
    gameOver("Humanity Wins");
  }
}

function gameOver(winner) {
  for(let i = 0; i < playerZones.length; i++) {
    compZones[i].removeEventListener('click', fire, false);
  }
  document.querySelector(".gameOverDisplay").style.display = "block";
  document.querySelector(".gameOverDisplay .Winner").innerText = winner;
}
