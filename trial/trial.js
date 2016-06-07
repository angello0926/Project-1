$(document).ready(function(){

var tetris= {}; //define an object
tetris.origin = {row:0,col:5}; //define the origin
tetris.currentshape='T';

tetris.currentCoor = [{row:'',col:''},
                      {row:'',col:''},
                      {row:'',col:''},
                      {row:'',col:''}];

tetris.storefield = [];
console.log(tetris.currentCoor);

//draw grid
function drawPlayField (){
  for (var row=0;row<22;row++){
    $('#playfield').append('<tr class="'+row+'"></tr>'); //apppend the rows with class row
    for (var col=0;col<10;col++){
      $('.'+row).append('<td id="'+col+'"></td>'); //define column with a class of the row number as id.
    };
  };
};

drawPlayField();

function shape(shape,origin){  //update coordinates whenever the shape has changed, storing all shapes coordinates

  switch(shape){
   case 'LR':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row,col:origin.col+2},
             {row:origin.row,col:origin.col+1}];

    break;


  case 'LR90':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+2,col:origin.col}];

    break;

  case 'LR180':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row,col:origin.col-2}];

    break;


  case 'LR270':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-2,col:origin.col},
             {row:origin.row,col:origin.col+1}];

    break;

  case 'LL':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row,col:origin.col-2},
             {row:origin.row,col:origin.col-1}];

    break;


  case 'LL90':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-2,col:origin.col},
             {row:origin.row,col:origin.col-1}];

    break;

  case 'LL180':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col+2},
             {row:origin.row-1,col:origin.col}];

    break;

  case 'LL270':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+2,col:origin.col},
             {row:origin.row,col:origin.col+1}];

  break;

  case 'I':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-2,col:origin.col},
             {row:origin.row+1,col:origin.col}];
    break;

  case 'I90':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col+2},
             {row:origin.row,col:origin.col+3}];
    break;


  case 'O':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+1,col:origin.col+1}];
    break;

  case 'T':

    return [ {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col-1},
             {row:origin.row,col:origin.col},
             {row:origin.row+1,col:origin.col}];
    break;


  case 'T90':

    return [ {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col-1}];
    break;



  case 'T180':

    return [ {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1}];
    break;


  case 'T270':

    return [ {row:origin.row+1,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1}];
    break;



  case 'ZL':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-1,col:origin.col-1},
             {row:origin.row,col:origin.col+1}];
    break;

  case 'ZL90':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row+1,col:origin.col-1}];
    break;

  case 'ZR':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-1,col:origin.col+1},
             {row:origin.row,col:origin.col-1}];
    break;

  case 'ZR90':

    return [ {row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col+1},
             {row:origin.row,col:origin.col+1}];
  break;

 }

};

tetris.currentCoor=shape(tetris.currentshape,tetris.origin);



function rotateshape(){
  var lastshape=tetris.currentshape; //set last shape as what it is now
  fillcells(tetris.currentCoor,'');
  console.log(tetris.currentCoor);
  if (tetris.currentshape==='I'){
    tetris.currentshape ='I90';
  }else if (tetris.currentshape==='I90'){
    tetris.currentshape ='I';
  };
  if (tetris.currentshape==='LR'){
    tetris.currentshape ='LR90';
  }else if (tetris.currentshape==='LR90'){
    tetris.currentshape ='LR180';
  }else if (tetris.currentshape==='LR180'){
    tetris.currentshape ='LR270';
  }else if (tetris.currentshape==='LR270'){
    tetris.currentshape ='LR';
  }
  if (tetris.currentshape==='LL'){
    tetris.currentshape ='LL90';
  }else if (tetris.currentshape==='LL90'){
    tetris.currentshape ='LL180';
  }else if (tetris.currentshape==='LL180'){
    tetris.currentshape ='LL270';
  }else if (tetris.currentshape==='LL270'){
    tetris.currentshape ='LL';
  }

  if (tetris.currentshape==='T'){
    tetris.currentshape ='T90';
  }else if (tetris.currentshape==='T90'){
    tetris.currentshape ='T180';
  }else if (tetris.currentshape==='T180'){
    tetris.currentshape ='T270';
  }else if (tetris.currentshape==='T270'){
    tetris.currentshape ='T';
  }

  if (tetris.currentshape==='ZR'){
    tetris.currentshape ='ZR90';
  }else if (tetris.currentshape==='ZR90'){
    tetris.currentshape ='ZR';
  }

  if (tetris.currentshape==='ZL'){
    tetris.currentshape ='ZL90';
  }else if (tetris.currentshape==='ZL90'){
    tetris.currentshape ='ZL';
  }
  tetris.currentCoor=shape(tetris.currentshape,tetris.origin);
  //check rotated shape is out of field or not
  for(var i=0; i<tetris.currentCoor.length;i++){
    if (tetris.currentCoor[i].col>9||tetris.currentCoor[i].col<0||tetris.currentCoor[i].row>21){
      tetris.currentshape=lastshape;
      console.log(tetris.currentshape);
    }
  }
  tetris.currentCoor=shape(tetris.currentshape,tetris.origin);
   //update the tetris coordinates using shape functions
  fillcells(tetris.currentCoor,'#5BC0DE');
};

//coordinates change when it drops
function dropping (){
  var block = false; //row doesn't >21
  fillcells(tetris.currentCoor,''); //empty cells
  tetris.origin.row++; //origin +1
  tetris.currentCoor=shape(tetris.currentshape,tetris.origin); //update current coor with new origin
    for (var i=0;i<tetris.currentCoor.length;i++){
      if(tetris.currentCoor[i].row>21||checkingcollision(tetris.currentCoor)){
        tetris.origin.row--; //change origin
        tetris.currentCoor=shape(tetris.currentshape,tetris.origin);
        storingfield(tetris.currentCoor);
        randomshapes();
        console.log(tetris.storefield);
      }
    };
  fillcells(tetris.currentCoor,'#3C3741');
};




//fill cells with a color specified according to current coord.
function fillcells(coord, color){
  for (var i=0;i<coord.length;i++){ //loop through the no.of row which needs to be filled
    var row= coord[i].row; //store the respective square's row no. in an coord[i] object
    var col= coord[i].col;
    var $coordinates= $('.'+row).find('#'+col);//use the row and col stored to find the respective html square and saved as a jquery object
    $coordinates.css("background",color);
  };

};

fillcells(tetris.currentCoor,'#5BC0DE');


//move the tetrisminos to left or right
function moveshape(direction){
  var outoffield=false;
  fillcells(tetris.currentCoor,''); //use back the fillcells function to fill the color as none
  for(var i=0;i<tetris.currentCoor.length;i++){
    if (direction==='right'){
      tetris.currentCoor[i].col++;
      if(tetris.currentCoor[i].col>9||checkingcollision(tetris.currentCoor)){  //check if the col no. is more than 9, then out of fields.
        outoffield=true;
        console.log(tetris.storefield);
      }
    }else if (direction==='left'){
      tetris.currentCoor[i].col--;
      if(tetris.currentCoor[i].col<0||checkingcollision(tetris.currentCoor)){  //check if the col no. is < 0, then out of fields.
        outoffield=true;
        console.log(tetris.storefield);
      }
    }
  };

  fillcells(tetris.currentCoor,'#EE5F5B'); //fill the cells with color with updated current coordinates
  if(outoffield&&direction==='left'){  //if outoffield, cancel the move
    moveshape('right');
  }

  if(outoffield&&direction==='right'){
    moveshape('left');
  }

  if(direction === 'right'){ //update the origin
    tetris.origin.col++;
  } else if (direction === 'left'){
    tetris.origin.col--;
  }

};

function randomshapes(){
  var choice=Math.floor(Math.random()*7);
  var shapesoptions=['LR','LL','I','O','T','ZL','ZR'];

  tetris.currentshape=shapesoptions[choice];
  tetris.origin = {row:0,col:5};
  tetris.currentCoor=shape(tetris.currentshape,tetris.origin);


};

function storingfield(currentCoor){ //to check whether they can be stored
  tetris.storefield.push(tetris.currentCoor);
  for (var i=0; i<tetris.storefield.length; i++){
    fillcells(tetris.storefield[i],'#EE5F5B');
  };
};

function checkingcollision(currentCoor){
  var samecol = 0; // samecol= false
  var samerow = 0; //same row = false
  currentCoor.forEach(function(square){
    for (var i=0;i<tetris.storefield.length;i++){
      for (var j=0;j<tetris.storefield[i].length;j++){
        if ((tetris.storefield[i][j].row)===(square.row)){
          samerow=1;
        }
      };
    };

    for (var i=0;i<tetris.storefield.length;i++){
      for (var j=0;j<tetris.storefield[i].length;j++){
        if ((tetris.storefield[i][j].col)===(square.col)){
        samecol=1;
        }
      };
    };

   });

  if (samecol===1&&samerow===1){
    return true;
  }
};



$(document).keydown(function(e){
  console.log(e.keyCode);
  if (e.keyCode === 39){
    moveshape('right');
  }else if (e.keyCode===37){
    moveshape('left');
  }else if (e.keyCode ===38){
    rotateshape(); //base on the current shape and rotation and rotate it
  }else if (e.keyCode ===40){
    dropping();
  }
});


//var gravity = setInterval(function(){
  //  dropping();
//},600);


});


