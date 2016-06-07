$(document).ready(function(){

var colorpalette=["#EE5F5B","#F89406","#FFDE49","#7A922D","#6BB18C","#36C4D0","#8B4D93"];

var tetris={};

tetris.scores=0;
tetris.playerA='Angel';
tetris.playerB='Fiona';
//2.1 Origin
tetris.origin={row:0,col:5};
//2.2 Coordinates
tetris.currentcoor = [ {row:'',col:''},
                       {row:'',col:''},
                       {row:'',col:''},
                       {row:'',col:''} ];
//2.3 Shapes
tetris.currshape='LR';
tetris.nextshape='';


//create an array to store moves
tetris.storefield=[];

//define field
tetris.playfield={row:20,col:10};
tetris.nextfield={row:5,col:5};

//1.3 Draw field
function grid(fieldcoor,field){
  for (var i=0;i<fieldcoor.row;i++){
    $('#'+field).append('<tr class='+field+' data-row='+i+'></tr>'); //define row
    for (var j=0;j<fieldcoor.col;j++){
      $('.'+field+'[data-row='+i+']').append('<td class='+field+ ' data-col='+j+'></td>'); //define column
    };
  };
};


grid(tetris.playfield,'playfield');
grid(tetris.nextfield,'nextfield');


//2.3 Shapes

//2.3.1 7 types of shapes
//7 types of shapes and its coordinate (take in the origin and the shape, return 4 coordinates in an array)
function translateshape(shape,origin){

  switch(shape){
    case 'LR':

    return [{row:origin.row,col:origin.col},
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
            {row:origin.row+1,col:origin.col},
            {row:origin.row+2,col:origin.col},
            {row:origin.row-1,col:origin.col}];
    break;

    case 'I90':

    return [ {row:origin.row,col:origin.col},
            {row:origin.row,col:origin.col-1},
            {row:origin.row,col:origin.col+1},
            {row:origin.row,col:origin.col+2}];
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

//2.3.2 Randomize the shapes
function randomshapes(){
  var choice=Math.floor(Math.random()*7);
  var shapesoptions=['LR','LL','I','O','T','ZL','ZR'];

  return shapesoptions[choice];
};

//2.4 Fill Color
//2.4.1 Take in the coordinates and color , change the respective coordinates's css attributes.
function fillshape(shape,coor,color,field){
  var tocolor='';
  if(color!==true){ //when color is not '';
    switch (shape){
      case'LR':  case'LR90':  case'LR180': case'LR270':
      tocolor=colorpalette[0];
      break;

      case'LL': case'LL90': case'LL180': case'LL270':
      tocolor=colorpalette[1];
      break;

      case'I': case'I90':
      tocolor=colorpalette[2];
      break;

      case'O':
      tocolor=colorpalette[3];
      break;

      case'T': case'T90': case'T180': case'T270':
      tocolor=colorpalette[4];
      break;

      case'ZL': case'ZL90':
      tocolor=colorpalette[5];
      break;

      case'ZR': case'ZR90':
      tocolor=colorpalette[6];
      break;

      };
  }

  for (var i=0;i<coor.length;i++){
    $('.'+field+'[data-row='+coor[i].row+']').find('.'+field+'[data-col='+coor[i].col+']').css('background',tocolor);
    };
};


//3. Tetriminos Movement
//3.1 move Right/Left
function move (direction){
  fillshape(tetris.currshape,tetris.currentcoor,true,"playfield");
  switch(direction){
    case 'right':
    tetris.origin.col++;
    tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
    if(checkfieldlimit()){ //check whether it is out of field
      tetris.origin.col--;
    }
    break;

    case 'left':
    tetris.origin.col--;
    tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
     if(checkfieldlimit()){ //check whether it is out of field
    tetris.origin.col++;
    }
    break;
  }
  checkend(); //whether it reaches an end
  tetris.currentcoor=translateshape(tetris.currshape,tetris.origin); //update coor with the new origin
  fillshape(tetris.currshape,tetris.currentcoor,false,"playfield"); //fill color
};


//3.2 Rotate
//3.2.1 Rotate based on the shapes rotation
function rotate(){

 fillshape(tetris.currshape,tetris.currentcoor,true,"playfield");
 var originalshape = tetris.currshape;
  if (tetris.currshape==='I'){
    tetris.currshape ='I90';
  }else if (tetris.currshape==='I90'){
    tetris.currshape ='I';
  };
  if (tetris.currshape==='LR'){
    tetris.currshape ='LR90';
  }else if (tetris.currshape==='LR90'){
    tetris.currshape ='LR180';
  }else if (tetris.currshape==='LR180'){
    tetris.currshape ='LR270';
  }else if (tetris.currshape==='LR270'){
    tetris.currshape ='LR';
  }
  if (tetris.currshape==='LL'){
    tetris.currshape ='LL90';
  }else if (tetris.currshape==='LL90'){
    tetris.currshape ='LL180';
  }else if (tetris.currshape==='LL180'){
    tetris.currshape ='LL270';
  }else if (tetris.currshape==='LL270'){
    tetris.currshape ='LL';
  }

  if (tetris.currshape==='T'){
    tetris.currshape ='T90';
  }else if (tetris.currshape==='T90'){
    tetris.currshape ='T180';
  }else if (tetris.currshape==='T180'){
    tetris.currshape ='T270';
  }else if (tetris.currshape==='T270'){
    tetris.currshape ='T';
  }

  if (tetris.currshape==='ZR'){
    tetris.currshape ='ZR90';
  }else if (tetris.currshape==='ZR90'){
    tetris.currshape ='ZR';
  }

  if (tetris.currshape==='ZL'){
    tetris.currshape ='ZL90';
  }else if (tetris.currshape==='ZL90'){
    tetris.currenshape ='ZL';
  }

  tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
  if(checkfieldlimit()){
   tetris.currshape = originalshape;
   tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
  }
  fillshape(tetris.currshape,tetris.currentcoor,false,"playfield");
};


//3.3 Down
function down(){

  fillshape(tetris.currshape,tetris.currentcoor,true,"playfield");
  tetris.origin.row++;
  tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
  checkend ();
  fillshape(tetris.currshape,tetris.currentcoor,false,"playfield");



};

/*4. Tetriminos Stacking
    4.1 Stop when reaches the bottom line
        4.1.2 check each coordinates , if any row of them >last row no., store it
    4.2 Stop when reaches another Tetriminos
*/
function checkend (){
  var block= false; //whether it reaches the end
  for (i=0;i<tetris.currentcoor.length;i++){
      if (tetris.currentcoor[i].row>18||detection(tetris.currentcoor)===1){ //if any coordinates with row>18 or any coordinates have the same coords as the shapes stored,
      block=true;
    }
  };

  if (block===true){
    storeshape(tetris.currentcoor); //reach the end, then store the shape
    //generate new shape in the next move field and the playfield
    tetris.currshape=tetris.nextshape;
    tetris.origin={row:0,col:5};
    tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
    console.log(tetris.currentcoor);
    tetris.nextshape=randomshapes();
    shownextmove(tetris.nextshape);
   }

};

//whether the rotation and movement out of field
function checkfieldlimit(){
  var limit=false;
  for (i=0;i<tetris.currentcoor.length;i++){
    if(tetris.currentcoor[i].col<0||tetris.currentcoor[i].col>9){
      limit=true;
    }
  };

  return limit;

};


function storeshape(currentcoor){

  for (var i=0; i<currentcoor.length;i++){
    tetris.storefield.push(currentcoor[i]);

  };

  console.log(tetris.storefield);
  for (var i=0;i<tetris.storefield.length;i++){
      $('.playfield[data-row='+tetris.storefield[i].row+']').find('.playfield[data-col='+tetris.storefield[i].col+']').css('background','#043D5D');
  };


};



function detection(currentcoor){
var samecol = 0; // samecol= false
  var samerow = 0; //same row = false
  var counter=0;

  for (var i=0;i<currentcoor.length;i++){
   if($('.playfield[data-row='+(currentcoor[i].row+1)+']').find('.playfield[data-col='+currentcoor[i].col+']').css('background-color')==='rgb(4, 61, 93)'){
     counter=1;
   }
  };

 /* currentcoor.forEach(function(square){

    for (var i=0;i<tetris.storefield.length;i++){
        if ((tetris.storefield[i].row)===(square.row)){
          samerow=1;
        }
    };

    for (var i=0;i<tetris.storefield.length;i++){
        if ((tetris.storefield[i].col)===(square.col)){
           samecol=1;
        }
    };

   });

  if (samecol===1&&samerow===1){
    counter++;
    for(var i=0;i<currentcoor.length;i++){
     currentcoor[i].row--;
    };
  }*/
  return counter;

};



function shownextmove(nextshape){

  var origin= {row:2,col:2};
  var nextcoord = [ {row:'',col:''},
                     {row:'',col:''},
                     {row:'',col:''},
                     {row:'',col:''} ];
  $('.nextfield').css('background','#ECF0F1');
  nextcoord=translateshape(nextshape,origin);
  fillshape(nextshape,nextcoord,false,"nextfield");

};


function scores(){
   tetris.scores+=5;
   $('#scores').text(tetris.scores);
}

$(document).keydown(function(e){
  if (e.keyCode===40){
    console.log(e.keyCode)
    down();
    scores();
  }else if (e.keyCode===39){
    console.log(e.keyCode)
    move('right');
  }else if (e.keyCode===37){
    console.log(e.keyCode)
    move('left');
  }else if (e.keyCode ===38){
    rotate();
  }

});


/*function gameover(){
  var over='';

  for (var i=0; i<tetris.col;i++){
    over=;
    //console.log(over);
    if (over==='black'){
      console.log('gameover');
     }
  };
};
*/

function clearlines(){
  var counter={};
  var rowtoremove=[];
  for (var i=0;i<tetris.storefield.length;i++){
     if (counter[tetris.storefield[i].row]===undefined) counter[tetris.storefield[i].row]=0;
     counter[tetris.storefield[i].row]++;
  };

  console.log(counter);
  // 5.1.2.1 Construct an object to store the occurence of col in each row from the stored arrays of objects
  //extract the row no. to be removed
  function showrowtoremove(obj, objectName) {
  var rowtoremove = [];
  for (var prop in obj) {
    if(counter[prop]>=10) rowtoremove.push(prop);
  };
  return rowtoremove;
  };
  var removerow=showrowtoremove(counter, "counter");
  console.log(removerow);


  var times=tetris.storefield.length;
  for (var i =0; i <tetris.storefield.length; i++){
      if (tetris.storefield[i]!==undefined){
        if (tetris.storefield[i].row === parseInt(removerow[0])){
        console.log('tetris.storefield[i] ='+tetris.storefield[i]);
        tetris.storefield.splice(i,1);
         $('.playfield[data-row='+tetris.storefield[i].row+']').find('td').removeClass('occupy');
         console.log('length='+tetris.storefield.length);
        }
      }
  };
     console.log('length='+tetris.storefield.length);

     return tetris.storefield;






/* for(var i=0; i<tetris.row;i++){
    var count=0;
    if($('.playfield[data-row='+i+']').find('.occupy')){
      count++;
    }

    if (count===10){
      $('.playfield[data-row='+tetris.storefield[i].row+']').find('.occupy').css('background','#ECF0F1');
      $('.playfield[data-row='+tetris.storefield[i].row+']').find('.occupy').removeClass('occupy');
    }
  };

  for (var i=0;i<tetris.storefield.length;i++){
    tetris.storefield[i].row--;
  }; */

};

//var gravity = setInterval(function(){
  //down();
//},600);


 //set up the initial shape
tetris.nextshape=randomshapes();
shownextmove(tetris.nextshape);
tetris.currentcoor=translateshape(tetris.currshape,tetris.origin);
fillshape(tetris.currshape,tetris.currentcoor,false,"playfield");



});