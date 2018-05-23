
console.log('Game Begin');

//###########################GAME MAP##############################//
const gameGrid = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,0,4,1,1,1,1,0,6,0,0,0,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,1,1,5,0,0,1,1,1,0,3,1,0,4,1,1,1],
  [1,0,0,0,0,3,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,1,1,5,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,3,0,0,0,1],
  [1,0,3,0,1,0,0,0,0,0,0,0,0,1,1,0,3,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,0,1,1,1,0,3,1,1,0,1,1,1,0,0,1,0,1,1,0,1],
  [1,0,1,1,1,0,0,3,0,1,1,4,0,0,1,0,4,0,1,0,3,0,1,0,0,1,1,1],
  [1,4,0,0,0,0,0,1,0,0,1,1,1,5,1,1,1,1,1,1,1,1,1,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,5,1,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,1,0,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,6,1],
  [1,0,0,6,1,1,0,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,5,0,0,1],
  [1,0,1,1,1,1,0,0,1,1,1,1,1,5,4,1,1,1,1,1,0,1,1,1,1,1,0,1],
  [1,3,0,0,1,4,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,0,1,3,0,1],
  [1,5,1,0,1,1,1,1,1,0,0,3,0,0,0,0,0,3,0,1,0,1,0,1,1,1,0,1],
  [1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//#######################X & Y LOCATIONS IN CONSOLE#############################//
$(()=>{
  $('#map').on('mouseover','div',function(){
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  // ######################### PLAYER CHARACTER ###################################//

  const playerChar = {health: 100, attack: 20};

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
        playerChar.x = i;
        playerChar.y = j;
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
  //###############MOVEMENT,ITEMS & WEAPONS PICKUP FUNCTIONS & LOGS##########################//
  const weaponArray = [
    {name: 'sword', x: 1 , y: 9},
    {name: 'Mace'},
    {name: 'Flail'},
    {name: 'Pike'},
    {name: 'Sheild'},
    {name: 'Spear'},
    {name: 'Stick'}
  ];

  const wep = weaponArray[Math.floor(Math.random()*weaponArray.name)];

  function pickupWeapon(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('weapon').addClass('player');
    gameGrid[playerChar.x][playerChar.y] = 0;
    $(playerChar.attack += 10);
    $heroAttack.text('Attack' + playerChar.attack + 'DAMAGE');
    $heroWeapon.text(wep);
    console.log(`you pick up a rusty weapon from the ground! your weapon new weapon has ${playerChar.attack} damage!`)
  }
  function pickupHealth(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('healthPot').addClass('player');
    gameGrid[playerChar.x][playerChar.y] = 0;
    $(playerChar.health += 20);
    console.log(`You pick up a potion a gain 20 health, PLAYER now has ${playerChar.health} health left`);
  }
  function playerMovement(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
  }

  //#################### COMBAT #####################################################//
  const mobsArray = [
    {health: 20, x: 3, y: 5},
    {health: 28, x: 6, y: 2},
    {health: 40, x: 8, y: 7},
    {health: 50, x: 5, y: 9},
    {health: 40, x: 7, y: 13},
    {health: 70, x: 5, y: 23},
    {health: 40, x: 8, y: 20},
    {health: 75, x: 6, y: 16},
    {health: 40, x: 2, y: 21},
    {health: 40, x: 16, y: 25},
    {health: 100, x: 17, y: 17},
    {health: 40, x: 17, y: 11},
    {health: 20, x: 11, y: 6},
    {health: 40, x: 14, y: 1}
  ];

  function mobOnPlayerSquare(){
    for(let i = 0; i < mobsArray.length; i++) {
      const mob = mobsArray[i];
      if(mob.x === playerChar.x && mob.y === playerChar.y) {
        return mob;
      }
    }
    return null;
  }

  function defend() {
    console.log(`before attack Player has ${playerChar.health} health`);
    playerChar.health -= (Math.floor(Math.random() * 9));
    $heroHealth.text('Health' + playerChar.health + '/100');
    // console.log(`MOB attacks !!! PLAYER defends, and has ${playerChar.health} health left!`);
    death(playerChar);
    console.log('');
  }
  function fight(mob) {
    console.log(`before attack MOB has ${mob.health} health`);
    mob.health -= (`${playerChar.attack}`);
    console.log(`after attack MOB has ${mob.health} health left!`);
    death(mob);
    console.log('');
  }
  function death(mob){
    if (mob.health < 1){
      $(`div[data-x='${mob.x}'][data-y='${mob.y}']`).removeClass('mob').addClass('path');
      mob.x -= 1;
      console.log('MOB DIES');
    }if (playerChar.health < 1){
      $('playerChar').removeClass('playerChar').addClass('path');
      console.log('PLAYER DIES');
      alert('GAME OVER');
      location.reload();
    }
  }

  //############################# USER INTERFACE ##################################
  const $heroHealth = $('#heroHealth');
  const $heroAttack = $('#heroAttack');
  const $heroWeapon = $('#heroWeapon');

  $heroHealth.text('Health' + playerChar.health + '/100');
  $heroAttack.text('Attack' + playerChar.attack + 'DPS');
  $heroWeapon.text('Weapon' + weaponArray[0] + ' ');

  //#################### WASD MOVEMENT ###############################//

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:     //PLAYER UP//
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
          }if (gameGrid[playerChar.x-1][playerChar.y] === 3){
            playerChar.x -= 1;
            const currentMob = mobOnPlayerSquare();
            if(currentMob) fight(currentMob);
            if(currentMob) defend(currentMob);
            // if(currentMob) death(currentMob);
          }
          break;
        case 97:     //PLAYER LEFT //
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
          }if (gameGrid[playerChar.x][playerChar.y-1] === 3){
            playerChar.y -= 1;
            const currentMob = mobOnPlayerSquare();
            if(currentMob) fight(currentMob);
            if(currentMob) defend(currentMob);
            else if(currentMob) death(currentMob);
          }
          break;
        case 115:     //PLAYER DOWN//
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
          }if (gameGrid[playerChar.x+1][playerChar.y] === 3){
            playerChar.x += 1;
            const currentMob = mobOnPlayerSquare();
            if(currentMob) fight(currentMob);
            if(currentMob) defend(currentMob);
            else if(currentMob) death(currentMob);
          }
          break;
        case 100:     //PLAYER RIGHT//
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
          }if (gameGrid[playerChar.x][playerChar.y+1] === 3){
            playerChar.y += 1;
            const currentMob = mobOnPlayerSquare();
            if(currentMob) fight(currentMob);
            if(currentMob) defend(currentMob);
            else if(currentMob) death(currentMob);
          }
          break;
      }
    });
  }
  movePlayer()
});
