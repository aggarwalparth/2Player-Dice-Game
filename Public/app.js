// Rules
showRules = function(){
    alert(
`ABOUT :
It is a fun 2-player game where the players have to reach the target score. First one to achieve the target score will be declared WINNER.
             
HOW TO PLAY : 
-- The red dot points the active player.
-- The active player rolls the dice.
-- Each player has 'CURRENT' score (temporary score) and the 'TOTAL' score.  
-- The player can continue to roll the dice and the sum of both the dices will get added to the 'CURRENT' score of the active player.
-- If the player wish to hold the 'CURRENT' score, the 'CURRENT' score will be added to the player's 'TOTAL' score and the next player will get the turn.
        
RULES :
1. The default target score is 50.
2. The target score can be changed during the game but the target score can't be less than or equal to 0 otherwise the target score will automatically set to 50.
3. If both the dices show same number then the active player will loose the 'CURRENT' score and the next player will get the turn.
4. If a player rolls a (6 6) then the 'TOTAL' score of the current player will be reset to 0.

ENJOY!!!`
    );
}

// defining the rules
document.querySelector('.btn-rules').addEventListener('click',showRules);

// Initializing the variables
var activePlayer, roundScore, scores, gamestate;

// Hide Dices
    hideDices = function(){
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

// Display Dices
    displayDices = function(){
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
}

// initialise game
initGame = function(){

    // set gamestate to true
    gamestate = true;

    // Set active player to Player 0
    activePlayer = 0;

    // Update the UI
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    // Initialise all Values to zero
    scores = [0,0];
    roundScore = 0;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Hide the Dices
    hideDices();

    // remove the winner tags and initiase Player names
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}

// Change Player function
changePlayer = function(){

    // Hide the Dices
    hideDices();

    // Change roundScore to 0
    roundScore = 0;

    // Display both roundScores 0
    document.querySelector(`#current-0`).textContent = roundScore;
    document.querySelector(`#current-1`).textContent = roundScore;

    // Change the active player
    activePlayer = activePlayer == 0 ? 1 : 0;

    
    // Display the active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}


// ===========================

initGame();


// ROLL DICE function

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamestate){

        // Display the DICE
        displayDices();

        // Get the dices value
        let dice_1 = Math.floor(Math.random() * 6) + 1;
        let dice_2 = Math.floor(Math.random() * 6) + 1;

        console.log(dice_1, dice_2);

        // Check if the values are equal or not
        if(dice_1 == dice_2){

            // Check if the values are equal to 6
            if(dice_1 == 6){

                // Reset the total score of the active player
                scores[activePlayer] = 0;

                // Update the UI
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            }

            // change Player 
            changePlayer();


        } else {
        
            // Update the Dices value
            document.getElementById('dice-1').src = 'dice-' + dice_1 + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice_2 + '.png';

            // Update the round score
            roundScore += dice_1 + dice_2;

            // Update the roundScore UI
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }

    }

})

// HOLD DICE function

document.querySelector('.btn-hold').addEventListener('click',function(){

    if(gamestate){

        // Update the total Scores
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let targetScore = document.querySelector('.final-score').value;

        if(targetScore <= 0){
            targetScore = 50;
        }


        // Check if the current player wins
        if(scores[activePlayer] >= targetScore){

            // change the gameState
            gamestate = false;

            // Disable acticve player and declare winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // Change active player name to WINNER
            document.querySelector('#name-' + activePlayer).textContent = "WINNER";

            // Hide the dices
            hideDices();

        } else {

            // Change the Player
            changePlayer();

        }

    }

})



// NEW GAME function

document.querySelector('.btn-new').addEventListener('click', function(){

    // initialize the game from the beginning
    initGame();

})


