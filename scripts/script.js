/*
Project Name: Battleship
File Name: script.js
Author: Daniel Mallia and Jayson Tan
Date Begun: 02/28/2019
Last Edited: 03/07/2019
*/

//Global vars for board control and game state
const compZones = document.querySelectorAll('.compBoard .zone');
const playerZones = document.querySelectorAll('.playerBoard .zone');
let playerShip = [];
let compShip = [];
let compChoices =[];

gameBegin();

//Initialize game state
function gameBegin() {
  document.querySelector(".gameOverDisplay").style.display = "none"; //Clears gameOverDisplay

  //Clear game arrays
  playerShip = [];
  compShip =[];
  compChoices =[];

  //Clear compboard colors
  for(let i = 0; i < compZones.length; i++) {
    compZones[i].style.backgroundColor = "gray";
  }

  //Clear playerBoardcolors and begin setup
  for(let i = 0; i < playerZones.length; i++) {
    playerZones[i].style.backgroundColor = "white";
    playerZones[i].addEventListener('click', setup, false);
  }
}

//Allow for placement of ships
function setup(zone) {
  placePlayerShip(zone);
  placeCompShip()

  if(playerShip.length === 2 && compShip.length === 2) {    // Ensures playerShip is placed first
    for(let i = 0; i < playerZones.length; i++) {
      compZones[i].addEventListener('click', fire, false);
    }
  }
}


function placePlayerShip(zone) {
  if(playerShip.length === 0) {
    playerShip.push(Number(zone.target.id));
    zone.target.removeEventListener('click', setup, false);
    zone.target.style.backgroundColor = "green";
  }
  else if(playerShip.length === 1) {
    // Check valid second half of ship placement
    if((Number(zone.target.id) === (playerShip[0] + 1)) || (Number(zone.target.id) === (playerShip[0] - 1)) ||
       (Number(zone.target.id) === (playerShip[0] + 5)) || (Number(zone.target.id) === (playerShip[0] - 5))) {
      // Check no "wrap around" on board
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
    compShip.push(Math.floor(Math.random() * 24)); // Randomized ship placement
    //compZones[compShip[0]].style.backgroundColor = "green"; //Reveal comp ship
                                                              //for debugging
  }
  else if(compShip.length === 1) {
    while(compShip.length !== 2) {
      let choice = Math.floor(Math.random() * 24); // Continue randomized ship
                                                   // placement - valid & no repeat or wrap
      if((choice !== compShip[0]) &&
        (Number(choice) === compShip[0] + 1 || Number(choice) === compShip[0] - 1 ||
         Number(choice) === compShip[0] + 5 || Number(choice) === compShip[0] - 5)) {

        if(!(compShip[0] % 5 === 0 && Number(choice) === compShip[0] - 1) &&
           !(compShip[0] % 5 === 4 && Number(choice) === compShip[0] + 1)){
          compShip.push(choice);
          //compZones[compShip[1]].style.backgroundColor = "green"; //Reveal comp ship
                                                                  //for debugging
        }
      }
    }
  }
}

// "Fire" on enemy ship - player initiates, computer responds
function fire(zone) {
  playerTurn(zone);
  compTurn();
}

function playerTurn(zone) {
  let index = compShip.indexOf(Number(zone.target.id)); //Check if "hit" on computer's
                                                        //ship in zone.
  if(index > -1) {
    compZones[compShip[index]].style.backgroundColor = "red";
    compShip.splice(index, 1);
    zone.target.removeEventListener('click', fire, false); //remove fire possibility
    checkWin();
  }
  else {
    zone.target.removeEventListener('click', fire, false); // prevents from clicking
                                                           // same cell and invoking compTurn
    zone.target.style.backgroundColor = "blue";
  }
}

function compTurn() {
  let choice = (Math.floor(Math.random() * 24)) + 25; //Randomized firing
  while (compChoices.indexOf(choice) > -1) { // Avoid prior choices
    //console.log(compChoices.indexOf(choice)) // Log for debugging
    choice = (Math.floor(Math.random() * 24)) + 25;
  }
  compChoices.push(choice);
  //console.log(choice); //Log for debugging
  let index = playerShip.indexOf(choice); // Check "hit"
  if(index > -1) {
    playerZones[choice % 25].style.backgroundColor = "red";
    playerShip.splice(index, 1);
    checkWin();
  }
  else {
    playerZones[choice % 25].style.backgroundColor = "blue";
  }
}

//function smartChoice () {} //Later implementation

function checkWin() {
  if(playerShip.length === 0) { //If ship array empty, ship has been sunk
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
