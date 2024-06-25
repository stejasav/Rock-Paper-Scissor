let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

updateScoreElement();

/*
if(!score){
  score = {
    Wins: 0,
    Losses: 0,
    Ties: 0
  };
}
*/

document.querySelector('.js-rock').addEventListener('click', () => {
  PlatGame('rock');
});

document.querySelector('.js-paper').addEventListener('click', () => {
  PlatGame('paper');
});

document.querySelector('.js-scissors').addEventListener('click', () => {
  PlatGame('scissor');
});

document.querySelector('.reset-score-button').addEventListener('click', () => {
  // resetscore();
  showResetConfirmation();
});

document.body.addEventListener('keydown', (event) =>{
  if(event.key == 'r'){
    PlatGame('rock');
  }else if(event.key == 'p'){
    PlatGame('paper');
  }else if(event.key == 's'){
    PlatGame('scissor')
  }else if(event.key == 'Delete' || event.key == 'Backspace'){
    showResetConfirmation();
  }
});

function showResetConfirmation(){
  document.querySelector('.confirm')
    .innerHTML = 
    `Are you sure you want to reset the score?
    <button class ="js-reset-confirm-yes reset-confirm-button">
    yes
    </button>
    
    <button class ="js-reset-confirm-no reset-confirm-button">
    No
    </button>
  `;
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetscore();
      hideElements();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideElements2();
    });
}


function PlatGame(playerMove) {
  const computerMove = pickComputerMove();
  result = '';

  if(playerMove === 'scissor'){
    if(computerMove === 'scissor'){
      result = 'Tie'
    }else if(computerMove === 'rock'){
      result='You lose'
    }else if(computerMove === 'paper'){
      result='You win'
    }
  }else if(playerMove==='paper'){
    if(computerMove === 'paper'){
      result = 'Tie'
    }else if(computerMove === 'scissor'){
      result='You lose'
    }else if(computerMove === 'rock'){
      result='You win'
    }
  }else if(playerMove==='rock'){
    if(computerMove==='rock'){
      result = 'Tie'
    }else if(computerMove === 'paper'){
      result='You lose'
    }else if(computerMove === 'scissor'){
      result='You win'
    }
  }

  if(result === 'You win'){
    score.Wins ++;
  }else if(result === 'You lose'){
    score.Losses ++;
  }else if(result === 'Tie'){
    score.Ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML =  result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="Images/${playerMove}-emoji.png" alt="" class="move-icon">
-
<img src="Images/${computerMove}-emoji.png" alt="" class="move-icon">
Computer`;
}  

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Looses: ${score.Losses}, Ties: ${score.Ties}`;
}

function pickComputerMove(){
  const randomNumber= Math.random();
  
  let computerMove='';
  
  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissor';
  }

  return computerMove;
}

function resetscore(){
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  hideElements();
}

function hideElements() {
  document.querySelector('.js-result').innerText = '';
  document.querySelector('.js-moves').innerText = '';
  document.querySelector('.confirm').innerText = '';
}
function hideElements2() {
  document.querySelector('.confirm').innerText = '';
}