// let Calculation = "";
  
//   let score = JSON.parse(localStorage.getItem(('Score')));
//   if (!score) {
//       score = {
//         Wins: 0,
//         Loses: 0,
//         Ties: 0
//       };
//     }
//   updateScore();
  
//   function pickComputerMove() {
//     const random = Math.random();
//     let computermove = '';
//     if (random >= 0 && random < 1 / 3) {
//       computermove = 'Rock';
//     }
//     else if (random >= 1 / 3 && random < 2 / 3) {
//       computermove = 'Paper';
//     }
//     else {
//       computermove = 'Scissors';
//     }
//     return computermove;

//   }
  
  

//   function playGame(playerMove) {
//     const computermove = pickComputerMove();
//     let result = '';
//     if (playerMove === 'Scissors') {
//       if (computermove === 'Rock') {
//         result = 'You lose';
//       }
//       else if (computermove === 'Paper') {
//         result = 'You Won';
//       }
//       else if (computermove === 'Scissors') {
//         result = 'Tie';
//       }
//     }
//     else if (playerMove == 'Rock') {
//       if (computermove === 'Rock') {
//         result = 'Tie';
//       }
//       else if (computermove === 'Paper') {
//         result = 'You lose';
//       }
//       else if (computermove === 'Scissors') {
//         result = 'You Won';
//       }
//     }
//     else if (playerMove === 'Paper') {
//       if (computermove === 'Rock') {
//         result = 'You Won';
//       }
//       else if (computermove === 'Paper') {
//         result = 'Tie';
//       }
//       else if (computermove === 'Scissors') {
//         result = 'You lose';
//       }
//     }
//     if (result === 'You Won') {
//       score.Wins += 1;
//     }
//     else if (result === 'Tie') {
//       score.Ties += 1;
//     }
//     else {
//       score.Loses += 1;
//     }
//     localStorage.setItem('Score', JSON.stringify(score));
//      updateScore();
//       document.querySelector('.js-result')
//       .innerHTML = result;

//          document.querySelector('.js-moves')
//       .innerHTML =`You
//       <img src="/images/${playerMove}-emoji.png"  
//       class="move-icon">
//       <img src="/images/${computermove}-emoji.png"
//        class="move-icon">
//       Computer` 
    
//   }

//   function updateScore(){
//     document.querySelector('.js-score')
//       .innerHTML = `Wins :${score.Wins} Loses :${score.Loses} Ties:${score.Ties}`;

//     }


class Score {
    constructor() {
        const savedScore = JSON.parse(localStorage.getItem('Score'));
        this.wins = savedScore?.Wins || 0;
        this.losses = savedScore?.Loses || 0;
        this.ties = savedScore?.Ties || 0;
    }

    update(result) {
        if (result === 'You Won') this.wins++;
        else if (result === 'Tie') this.ties++;
        else this.losses++;
        this.save();
    }

    reset() {
        this.wins = this.losses = this.ties = 0;
        this.save();
    }

    save() {
        localStorage.setItem('Score', JSON.stringify({
            Wins: this.wins,
            Loses: this.losses,
            Ties: this.ties
        }));
    }

    display() {
        document.querySelector('.js-score').innerHTML =
            `Wins: ${this.wins} Losses: ${this.losses} Ties: ${this.ties}`;
    }
}

class RockPaperScissors {
    constructor() {
        this.score = new Score();
        this.score.display();
    }

    pickComputerMove() {
        const moves = ['Rock', 'Paper', 'Scissors'];
        return moves[Math.floor(Math.random() * 3)];
    }

    play(playerMove) {
        const computerMove = this.pickComputerMove();
        const result = this.getResult(playerMove, computerMove);

        this.score.update(result);
        this.score.display();

        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML = `
            You <img src="/images/${playerMove}-emoji.png" class="move-icon">
            <img src="/images/${computerMove}-emoji.png" class="move-icon"> Computer
        `;
    }

    getResult(player, computer) {
        if (player === computer) return 'Tie';
        if (
            (player === 'Rock' && computer === 'Scissors') ||
            (player === 'Paper' && computer === 'Rock') ||
            (player === 'Scissors' && computer === 'Paper')
        ) {
            return 'You Won';
        }
        return 'You lose';
    }
}

// Initialize game
const game = new RockPaperScissors();

// Event bindings
document.querySelectorAll('.move-button').forEach((btn, index) => {
    const moves = ['Rock', 'Paper', 'Scissors'];
    btn.addEventListener('click', () => game.play(moves[index]));
});
document.querySelector('.reset-score-button')
    .addEventListener('click', () => {
        game.score.reset();
        game.score.display();
    });
