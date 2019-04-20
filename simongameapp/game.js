//order of lights
let order = [];
//the order the player will be pressing the lights
let playerOrder = [];
//number of flashes that have appeared
let flash;
//players turn
let turn;
//how well player is doing
let good;
let compTurn;
let inervalId;
let strict = false;
let on = false;
let win;
time = ['1', '2', '3', '4' , '5', '6', '7', '8', '9', '10', '11', '12', '13',
'14', '15', '16', '17', '18', '19', '20'];

//vars
const turnCounter = document.querySelector('#turn');
const green = document.querySelector('.greenButton');
const red = document.querySelector('.redButton');
const yellow = document.querySelector('.yellowButton');
const blue = document.querySelector('.blueButton');
const onButton = document.querySelector('#on');
const start = document.querySelector('.start');
const strictButton = document.querySelector('#strict')
const applaud = document.querySelector('.applaud');

//reseters
clearColour = () => {
  green.style.backgroundColor = "darkgreen";
  red.style.backgroundColor = "darkred";
  yellow.style.backgroundColor = "#ddd95d";
  blue.style.backgroundColor = "darkblue";
}

flashColour = () => {
  green.style.backgroundColor = "lightgreen";
  red.style.backgroundColor = "red";
  yellow.style.backgroundColor = "yellow";
  blue.style.backgroundColor = "blue";
}

reseter = () => {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
}

end = () => {
  compTurn = true;
  flash = 0;
  playerOrder = [];
  good = true;
  intervalId = setInterval(gameTurn, 800)
}

//onclicks
strictButton.addEventListener('change', (event) => {
  if(strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', (event) => {
  if(onButton.checked == true){
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColour();
    clearInterval(intervalId);
  }
});

start.addEventListener('click', (event) => {
  if(on || win){
    play();
  }
});

//primary functions
play = () => {
  reseter();
  time.forEach(function (times, index) {
  	 order.push(Math.floor(Math.random() * 4) + 1);
  });
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

gameTurn = () => {
  on = false;

  if(flash == turn) {
    clearInterval(intervalId)
    compTurn = false;
    clearColour();
    on = true;
  }

if(compTurn) {
  clearColour();
    setTimeout(() => {
      if(order[flash] == 1) one();
      if(order[flash] == 2) two();
      if(order[flash] == 3) three();
      if(order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

one = () => {
  green.style.backgroundColor = "lightgreen";
}
two = () => {
  red.style.backgroundColor = "red";
}
three = () => {
  yellow.style.backgroundColor = "yellow";
}
four = () => {
  blue.style.backgroundColor = "blue";
}

//colour events
green.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 300)
    }
  }
});
red.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 300)
    }
  }
});

yellow.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 300)
    }
  }
});

blue.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColour();
      }, 300)
    }
  }
});

applauder = () => {
  if(turnCounter.innerHTML == 2){
    applaud.innerHTML = "You're a star!";
  }
  if(turnCounter.innerHTML == 3){
    applaud.innerHTML = "Simon Says You're on fiya!";
  }
  if(turnCounter.innerHTML == 4){
    applaud.innerHTML = "You have the memory of Dolphin!";
  }
  if(turnCounter.innerHTML == 5){
    applaud.innerHTML = "You are no mere mortal.";
  }
}

//check if combination is correct
check = () => {
  if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length -1])
  good = false;

  if(playerOrder.length == 20 && good){
    winGame();
  }

  applauder();

  if(good == false){
    flashColour();
    turnCounter.innerHTML = "Wrong";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColour();
      //if strict mode is activated and you lose the game, it restarts
      if(strict){
        play();
      } else {
        end();
      }
    }, 800)
  }

  if(turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800)
  }
}

winGame = () => {
  flashColour();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
