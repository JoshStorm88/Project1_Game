
console.log('Fangthar begins his quest!');

//#######################X & Y LOCATIONS IN CONSOLE#############################//
$(()=>{
  $('#map').on('mouseover','div',function(){
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  // ######################### PLAYER CHARACTER ###################################//

  const playerChar = {health: 120, attack: 10};

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
        //Boss//
      }if(cell === 6){
        $element.addClass('boss');
        //death//
      }if(cell === 8){
        $element.addClass('monsterSkeleton');
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
    {name: 'Rusty Greatsword'},
    {name: 'Chipped Mace'},
    {name: 'Twisted Flail'},
    {name: 'Smoldering Pike'},
    {name: 'Moldy Ham Hock of suffering'},
    {name: 'Unicorn Horn'},
    {name: 'Big Pointy Stick'}
  ];
  const weaponName = weaponArray[Math.floor(Math.random()*weaponArray.length)].name;

  function pickupWeapon(){
    const weaponName = weaponArray[Math.floor(Math.random()*weaponArray.length)].name;
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('weapon').addClass('player');
    gameGrid[playerChar.x][playerChar.y] = 0;
    weaponAudio.play();
    $(playerChar.attack += (Math.floor(Math.random() * 20)));
    $heroWeapon.text(weaponName);
    $heroAttack.text('Attack' + playerChar.attack + 'DAMAGE');
    $heroLog.text(`The chest opens, revealing a ${weaponName}! Fangthar now attacks with ${playerChar.attack} damage!`);
  }
  function pickupHealth(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('healthPot').addClass('player');
    gameGrid[playerChar.x][playerChar.y] = 0;
    healthAudio.play();
    $(playerChar.health += 20);
    $heroHealth.text('Health' + playerChar.health);
    $heroLog.text('Fangthar picks up a healing potion, gulps it down and feels it knit his wounds back together! he gains 20 health');
  }
  function playerMovement(){
    $(`div[data-x='${playerChar.x}'][data-y='${playerChar.y}']`).removeClass('path').addClass('player');
  }

  //#################### COMBAT #####################################################//
  const mobsArray = [
    {health: 100, x: 3, y: 5},
    {health: 100, x: 6, y: 2},
    {health: 100, x: 8, y: 7},
    {health: 100, x: 5, y: 9},
    {health: 100, x: 7, y: 13},
    {health: 100, x: 5, y: 23},
    {health: 100, x: 8, y: 20},
    {health: 100, x: 6, y: 17},
    {health: 100, x: 2, y: 21},
    {health: 100, x: 16, y: 25},
    {health: 100, x: 17, y: 17},
    {health: 100, x: 17, y: 10},
    {health: 100, x: 11, y: 6},
    {health: 100, x: 14, y: 1}
  ];


  function checkWin() {
    if(!($('#map div').hasClass('mob'))) {
      alert('A glowing gem falls from the lifeless corpse of the last demonic creature! Grabbing it Fangthar feels a power flow through him, drawing him...somewhere else...Fangthar holds the gem aloft and is transported to a very familar room (..In the distance an evil laugh is heard)');
      location.reload();
    }

  }

  function mobOnPlayerSquare(){
    for(let i = 0; i < mobsArray.length; i++) {
      const mob = mobsArray[i];
      if(mob.x === playerChar.x && mob.y === playerChar.y) {
        return mob;
      }
    }
    null;
  }
  function defend() {
    playerChar.health -= (Math.floor(Math.random() * 12));
    $heroHealth.text('Health' + playerChar.health);
    death(playerChar);
  }
  function fight(mob) {
    mob.health -= (`${playerChar.attack}`);
    combatAudio.play();
    $heroLog.text(`Fangthar attacks with furious rage! Monster has ${mob.health} health left!`);
    death(mob);
  }
  function death(mob){
    if (mob.health < 1){
      $(`div[data-x='${mob.x}'][data-y='${mob.y}']`).removeClass('mob').addClass('monsterSkeleton');
      const index = mobsArray.indexOf(mob);
      $heroLog.text('Monster dies!');
      // console.log(mobsArray[index]);
      // mobsArray.splice(index, 1);
      // console.log(mobsArray);
      checkWin();
    }if (playerChar.health < 1){
      $heroLog.text('PLAYER DIES');
      alert('Fanthar is overwelmed by the hordes of darkness! Reaching out he grabs hold of his amulet of time warping and travels back in time to when he first entered the dungeon!');
      location.reload();
    }
  }

  //############################# USER INTERFACE ##################################
  const $heroHealth = $('#heroHealth');
  const $heroAttack = $('#heroAttack');
  const $heroWeapon = $('#heroWeapon');
  const $heroLog = $('#heroLog');

  $heroHealth.text('Health' + ' ' + playerChar.health);
  $heroAttack.text('Attack' + ' ' + playerChar.attack + 'DPS');
  $heroWeapon.text(weaponName);
  $heroLog.text('');

  //#################### WASD MOVEMENT ###############################//

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:     //PLAYER UP//
          if (gameGrid[playerChar.x-1][playerChar.y] === 0){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            playerMovement();
          } else if (gameGrid[playerChar.x-1][playerChar.y] === 4){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            pickupWeapon();
          } else if (gameGrid[playerChar.x-1][playerChar.y] === 5){
            $('.player').removeClass('player').addClass('path');
            playerChar.x -= 1;
            pickupHealth();
          }if (gameGrid[playerChar.x-1][playerChar.y] === 3){
            playerChar.x -= 1;
            const currentMob = mobOnPlayerSquare();
            if(currentMob) {
              fight(currentMob);
              defend(currentMob);
              death(currentMob);
            } else {
              playerChar.x ++;
            }
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
            if(currentMob) {
              fight(currentMob);
              defend(currentMob);
              death(currentMob);
            } else {
              playerChar.y ++;
            }
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
            if(currentMob) {
              fight(currentMob);
              defend(currentMob);
              death(currentMob);
            } else {
              playerChar.x --;
            }
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
            if(currentMob) {
              fight(currentMob);
              defend(currentMob);
              death(currentMob);
            } else {
              playerChar.y --;
            }
          }
          break;
      }
    });
  }
  movePlayer();




  function setup(){
    $('#gameScreen').hide();
    $('#intro').click(function () {
      $('#intro').fadeOut();
      $('#gameScreen').show();
      const mainTheme = document.querySelector('.theme');
      mainTheme.src = './sounds/8bit_Dungeon_Level_Video_Classica.wav';
      mainTheme.volume = 0.1;
      mainTheme.play();

    });
  }
  const weaponAudio = document.querySelector('.weaponLoot');
  weaponAudio.src = 'sounds/Metal_Parts_Cling.wav';
  const combatAudio = document.querySelector('.combatAudio');
  combatAudio.src = 'sounds/Slap_with_Glove.wav';
  combatAudio.volume = 0.5;
  const healthAudio = document.querySelector('.healthLoot');
  healthAudio.src = 'sounds/Drink_and_Swallow.wav';
  healthAudio.volume = 1;
  setup();
});
