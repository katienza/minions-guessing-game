document.getElementById('');

class Game {
  constructor() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
      throw 'That is an invalid guess.';
    }
    this.playersGuess = guess;
        
    return this.checkGuess();
  }

  checkGuess() {
    let feedbackText = '';
    
    if (this.playersGuess === this.winningNumber) {
      feedbackText = 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);

      if (this.pastGuesses.length === 5) {
        feedbackText = 'You Lose.';
      } else {
        let diff = this.difference();
        if (diff < 10) feedbackText = "You're burning up!";
        else if (diff < 25) feedbackText = "You're lukewarm.";
        else if (diff < 50) feedbackText = "You're a bit chilly.";
        else feedbackText = "You're ice cold!";
      }
    }
    // comment out these lines when checking test specs
    document.querySelector('#guess-feedback > h4').innerHTML = feedbackText;
    document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
    
    return feedbackText;
  }

  provideHint() {
    const hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hintArray);
  }
}

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function newGame() {
  return new Game();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

function playGame() {
  const game = newGame();
  const button = document.querySelector('button');
  const input = document.querySelector('input');
  const reset = document.querySelector('#reset');
  const hint = document.querySelector('#hint');

  button.addEventListener('click', function() {
    const playersGuess =+ input.value;

    input.value = '';

    game.playersGuessSubmission(playersGuess);
  });

  hint.addEventListener('click', function() {
    let hints = game.provideHint();

    document.querySelector('h5').innerHTML = `The winning number is either ${hints[0]}, ${hints[1]}, ${hints[2]}`;
  });

  reset.addEventListener('click', function() {
    game = newGame();
  });
}

playGame();