
console.log('Cheese');

const grid = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,2,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,4,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,3,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,1],
  [1,4,0,0,0,0,3,0,0,1],
  [1,0,0,3,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,3,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];


$(()=>{
  $('#map').on('mouseover','div',function(){
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  $.each(grid, (i, row) =>{
    $.each(row, (r, cell) =>{
      const $element = $('<div />');
      if(cell === 0){
        $element.addClass('path');
      }if(cell === 1){
        $element.addClass('wall');
      }if(cell === 2){
        $element.addClass('player');
      }if(cell === 3){
        $element.addClass('mob');
      }else if(cell === 4){
        $element.addClass('weapon');
      }
      $element.data({x: i, y: r});
      $element.on('click', function(){
        console.log($(this).data());
      });
      $element.appendTo('#map');
    });
  });
});
