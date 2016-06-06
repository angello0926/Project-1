$(document).ready(function(){

var  tetris={};

tetris.origin={row:5,col:5};
tetris.currentcoor = [ {row:'',col:''},
                       {row:'',col:''},
                       {row:'',col:''},
                       {row:'',col:''} ];

tetris.currshape='O';

tetris.storefield=[];

function grid(){
    for (var i=0;i<19;i++){
      $('#playfield').append('<tr data-row='+i+'></tr>'); //define row
      for (var j=0;j<9;j++){
         $('[data-row='+i+']').append('<td data-col='+j+'></td>'); //define column
      };
    };


};

grid();

function translateshape(currshape,origin){
  switch(currshape){
    case 'O':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+1,col:origin.col+1}];
    break;


  };


};

function fillshape(currentcoor,color){
    for (var i=0;i<currentcoor.length;i++){
      $('[data-row='+currentcoor[i].row+']').find('[data-col='+currentcoor[i].col+']').css('background',color);
    };


};

tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
console.log(tetris.currentcoor);
fillshape(tetris.currentcoor,'#EEE657');



function down(){
  var block= false;
   fillshape(tetris.currentcoor,'');
   tetris.origin.row++;

   tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
   for (i=0;i<tetris.currentcoor.length;i++){
      if (tetris.currentcoor[i].row>18){
        block=true;
      }
   };
   if (block===true){
      tetris.origin.row--;
      tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
      storeshape();

   }
   console.log(tetris.currentcoor);
   fillshape(tetris.currentcoor,'#EEE657');

};


function storeshape(currentCoor){ //to check whether they can be stored
     tetris.storefield.push(tetris.currentcoor);
    for (var i=0; i<tetris.storefield.length; i++){
      fillshape(tetris.storefield[i],'#EEE657');

    };


};


$(document).keydown(function(e){
    if (e.keyCode===40){
      console.log(e.keyCode)
      down();
    }


});




})