
console.log('Game Begin');

//###########################MAP##############################//
const gameGrid = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,0,4,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,1,1,5,6,0,1,1,1,0,3,1,0,4,1,1,1],
  [1,0,0,0,0,3,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,1,1,5,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,3,0,0,0,1],
  [1,0,3,0,1,0,0,0,0,0,0,0,0,1,1,0,3,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,0,1,1,1,0,3,1,1,0,1,1,1,0,0,1,0,1,1,0,1],
  [1,0,1,1,1,0,0,3,0,1,1,4,0,0,1,0,4,0,1,0,3,0,1,0,0,1,1,1],
  [1,4,0,0,0,0,0,1,0,0,1,1,1,5,1,1,1,1,1,1,1,1,1,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,5,1,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,1,0,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,5,1,1],
  [1,0,0,6,1,1,0,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,0,6,0,1],
  [1,0,1,1,1,1,0,0,1,1,1,1,1,5,4,1,1,1,1,1,0,1,1,1,1,1,0,1],
  [1,3,0,0,1,4,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,0,1,3,0,1],
  [1,5,1,0,1,1,1,1,1,0,0,3,0,0,0,0,0,3,0,1,0,1,0,1,1,1,0,1],
  [1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//#######################X & Y LOCATIONS#############################//
$(()=>{
  $('#map').on('mouseover','div',function(){
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });
  let playerChar = {};

  //###################GRID CELL CLASSES#########################//
  $.each(gameGrid, (i, row) =>{
    $.each(row, (j, cell) =>{
      const $element = $('<div />');
      //Path//
      if(cell === 0){
        $element.addClass('path');
        //Wall//
      }if(cell === 1){
        $element.addClass('wall');
        //Player//
      }if(cell === 2){
        $element.addClass('player');
        playerChar = {x: i, y: j};
        gameGrid[playerChar.x][playerChar.y]= 0;
        //Mob//
      }if(cell === 3){
        $element.addClass('mob');
        //Weapon//
      }if(cell === 4){
        $element.addClass('weapon');
        //Health Potion//
      }if(cell === 5){
        $element.addClass('healthPot');
        //Boss Enemy//
      }else if(cell === 6){
        $element.addClass('boss');
      }
      $element.attr('data-x',i);
      $element.attr('data-y',j);
      $element.on('click', function(){
        console.log($(this).data());
      });
      $element.appendTo('#map');
    });
  });
  //###############MOVEMENT,ITEMS & WEAPONS PICKUP FUNCTIONS##########################//
  function pickupWeapon(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('weapon').addClass('player');
  }
  function pickupHealth(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('healthPot').addClass('player');
  }
  function playerMovement(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
  }
  //#####################WASD MOVEMENT################################//

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:     // MOVE PLAYER UP//
          if (gameGrid[playerChar.x-1][playerChar.y] === 0){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            playerMovement();
          }if (gameGrid[playerChar.x-1][playerChar.y] === 4){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            pickupWeapon();
          }if (gameGrid[playerChar.x-1][playerChar.y] === 5){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            pickupHealth();
          }
          break;
        case 97:     // MOVE PLAYER LEFT //
          if (gameGrid[playerChar.x][playerChar.y-1] === 0){
            $('.player').removeClass('player').addClass('path');
            playerChar.y -= 1;
            playerMovement();
          }if (gameGrid[playerChar.x][playerChar.y-1] === 4){
            $('.player').removeClass('player').addClass('path');
            playerChar.y -= 1;
            pickupWeapon();
          }if (gameGrid[playerChar.x][playerChar.y-1] === 5){
            $('.player').removeClass('player').addClass('path');
            playerChar.y -= 1;
            pickupHealth();
          }
          break;
        case 115:     // MOVE PLAYER DOWN//
          if (gameGrid[playerChar.x+1][playerChar.y] === 0){
            $('.player').removeClass('player').addClass('path');
            playerChar.x += 1;
            playerMovement();
          }if (gameGrid[playerChar.x+1][playerChar.y] === 4){
            $('.player').removeClass('player').addClass('path');
            playerChar.x += 1;
            pickupWeapon();
          }if (gameGrid[playerChar.x+1][playerChar.y] === 5){
            $('.player').removeClass('player').addClass('path');
            playerChar.x += 1;
            pickupHealth();
          }
          break;
        case 100:     // MOVE PLAYER RIGHT//
          if (gameGrid[playerChar.x][playerChar.y+1] === 0){
            $('.player').removeClass('player').addClass('path');
            playerChar.y += 1;
            playerMovement();
          }if (gameGrid[playerChar.x][playerChar.y+1] === 4){
            $('.player').removeClass('player').addClass('path');
            playerChar.y += 1;
            pickupWeapon();
          }if (gameGrid[playerChar.x][playerChar.y+1] === 5){
            $('.player').removeClass('player').addClass('path');
            playerChar.y += 1;
            pickupHealth();
          }
          break;
      }
    });
  }
  movePlayer()
});
