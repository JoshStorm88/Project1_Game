
console.log('Welcome');

//MAP//
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

//X & Y DIV INFO//
$(()=>{
  $('#map').on('mouseover','div',function(){
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  //GRID LAYOUT//
  $.each(gameGrid, (i, row) =>{
    $.each(row, (j, cell) =>{
      const $element = $('<div />');
      if(cell === 0){
        $element.addClass('path');
      }if(cell === 1){
        $element.addClass('wall');
      }if(cell === 2){
        $element.addClass('player');
        movePlayer = {x:i, y:j};
        gameGrid[movePlayer.x][movePlayer.y]= 0;
      }if(cell === 3){
        $element.addClass('mob');
      }if(cell === 4){
        $element.addClass('weapon');
      }if(cell === 5){
        $element.addClass('healthPot');
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
});

//PLAYER MOVEMENT//

function playerMovement(){
  $('.player').removeClass('player').addClass('path');
  player.x -= 1;
  $(`div[data-x='${player.x}'][data-y='${player.y}']`).removeClass('path').addClass('player');
}

// function movePlayer(){
$(document).on('keypress', function(e){
  switch(e.which){
    case 37:     // MOVE PLAYER UP//
    if (gameGrid[player.x-1][player.y] === 0){
      playerMovement();}
      // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
      //     pickupWeapon();
      // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
      //     pickupHealth();
      //   }
    break;
    case 38:     // MOVE PLAYER LEFT//
    if (gameGrid[player.x][player.y-1] === 0){
        playerMovement();}
        // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
        //     pickupWeapon();
        // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
        //     pickupHealth();
        //   }
    break;
    case 39:     // MOVE PLAYER DOWN//
    if (gameGrid[player.x+1][player.y] === 0){
          playerMovement();}
          // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
          //     pickupWeapon();
          // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
          //     pickupHealth();
          //   }
    break;
    case 40:     // MOVE PLAYER RIGHT//
    if (gameGrid[player.x][player.y+1] === 0){
            playerMovement();}
            // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
            //     pickupWeapon();
            // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
            //     pickupHealth();
            //   }
    break;
