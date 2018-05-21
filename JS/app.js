
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
  let playerChar = {};
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
        playerChar = {x: i, y: j};
        gameGrid[playerChar.x][playerChar.y]= 0;
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


  //PLAYER MOVEMENT//

  function playerMovement(){

  }

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:     // MOVE PLAYER UP//
        if (gameGrid[playerChar.x-1][playerChar.y] === 0){
          $('.player').removeClass('player').addClass('path');
          playerChar.x -= 1;
          $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
        }
        // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
        //     pickupWeapon();
        // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
        //     pickupHealth();
        //   }
        break;
        case 97:     // MOVE PLAYER LEFT//
        if (gameGrid[playerChar.x][playerChar.y-1] === 0){
          $('.player').removeClass('player').addClass('path');
          playerChar.y -= 1;
          $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
        }
        // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
        //     pickupWeapon();
        // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
        //     pickupHealth();
        //   }
        break;
        case 115:     // MOVE PLAYER DOWN//
        if (gameGrid[playerChar.x+1][playerChar.y] === 0){
          $('.player').removeClass('player').addClass('path');
          playerChar.x += 1;
          $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
        }
        // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
        //     pickupWeapon();
        // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
        //     pickupHealth();
        //   }
        break;
        case 100:     // MOVE PLAYER RIGHT//
        if (gameGrid[playerChar.x][playerChar.y+1] === 0){
          $('.player').removeClass('player').addClass('path');
          playerChar.y += 1;
          $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
        }
        // if (gameGrid[playerLocation.x][playerLocation.y] === 4){
        //     pickupWeapon();
        // if (gameGrid[playerLocation.x][playerLocation.y] === 5){
        //     pickupHealth();
        //   }
        break;
      };
    });
  }
  movePlayer()
});
