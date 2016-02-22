$(function(){

  $(document).ready($('input.tictactoe').click(tictactoe)); // ttt game
  $(document).ready($('#reset-btn').click(reset)); // reset button

  var whoseMove = 'X'; // X Move - would've liked to make this random select
  var xMove = new Array();
  var oMove = new Array(); //empty so we can create conditions for ea situation
  var gameOver = false; // closes game
  var winningConditions = new Array( 'aa/ab/ac','ba/bb/bc','ca/cb/cc','aa/ba/ca','ab/bb/cb','ac/bc/cc','aa/bb/cc','ac/bb/ca'); // easier to understand rather than # labels
  var winner = ''; // empty string, select winner at end

  function tictactoe() {
      if(gameOver == false && this.value == '  '){
          if(whoseMove == 'X'){
              this.value = whoseMove;
              xMove[xMove.length] = this.id;
              whoseMove = 'O';
          }
          else {
              this.value = whoseMove;
              oMove[oMove.length] = this.id;
              whoseMove = 'X';
          }
      }

      if(xMove.length >2){
          winner = endGame();
      }

      if(gameOver && winner != '' && winner != 'draw') {
          alert(winner + ' won!')
      }

      if(!gameOver && winner == 'draw') {
          alert('Meow! Game of Cat!');
      }
  }

  function endGame() {
      var winningCombinations = new Array();

      //set this variable value to true incase the game is over
      gameOver = true;

      for(var index = 0; index < 8; index = index + 1){
          var xMatchCount = 0;
          var oMatchCount = 0;
          winningCombinations = winningConditions[index].split('/');
          for(var i = 0; i < 3; i = i + 1){
              console.log('winningCombinations ' + winningCombinations[i]);
              for(var j = 0; j < xMove.length; j = j + 1){
                  console.log('xMove ' + xMove[j]);
                  if(winningCombinations[i] == xMove[j]){
                      xMatchCount = xMatchCount + 1;
                      if(xMatchCount == 3){
                          return 'X';
                      }
                  }
              }
              for(var k = 0; k < oMove.length; k = k + 1){
                  //console.log('oMove ' + oMove[k]);
                  if(winningCombinations[i] == oMove[k]){
                      oMatchCount = oMatchCount + 1;
                      if(oMatchCount == 3){
                          return 'O';
        }
              }
              }
          }
      }

      console.log('x Move Count ' + xMove.length);
      console.log('o Move Count ' + oMove.length);

      if(xMatchCount < 3 && oMatchCount < 3){
          gameOver = false;
      }

      if(xMove.length + oMove.length == 9){
          return 'draw';
      }
  }

  function reset() {

      console.log('Xs Move - ' + xMove.join('/'));
      console.log('Os Move - ' + oMove.join('/'));
      console.log(winningConditions.length);

      whoseMove = 'X';
      xMove = new Array();
      oMove = new Array();
      gameOver = false;
      winner = '';

      $('input').filter(function() {
          if(this.id != 'reset-btn') {
              this.value = '  ';
          }
      });
  }


});
