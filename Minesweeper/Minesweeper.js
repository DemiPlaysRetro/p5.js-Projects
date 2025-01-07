const SCREENSIZE = 450;
let TileDim = 9;
let CellSize = SCREENSIZE/TileDim;
let Bombs = 10;
let map1 = Array.from({length:9},  () => Array(9).fill(null));
let checkedColor = "Brown";
let uncheckedColor = "Green";
let flaggedColor = "red";
let FlagSize =15;
let regen = 1; // Regenerating Bombs
let MapCol,MapRow;
let flagsLeft = Bombs;

// Heres the logic

// Gen bombs
// Random col and row, if a bomb is already there reroll

// Moves
// On the first move, if a bomb is there, reroll that bomb and recheck
// If we click on a tile with no adjacent bombs at all, clear the entire 3x3 space

// North = -row
// South = +row
// West = -col
// East = +col
// North-East = -row,+col
// North-West = -row,-col
// South-East = +row,+col
// South-West = +row,-col
// Check for each to formulate

// Tiles
// 0 = Clear Space
// 1 = Bomb
// 2 = Checked Space
// 4 = Flagged Bomb
// 3 = Incorrectly Flagged

function percentOf(percent,whole) {
  return ((percent*whole)/100);
}

function emptyMap(themap1) { // Clears map1, all values 0
  for (let r = 0; r < TileDim; r++) {
    for (let c=0; c<TileDim;c++) {
      themap1[r][c] = 0;
    }
  }
  return;
}

function newMap(themap2) { // Clears and creates new map1
  emptyMap(themap2);
  for (let i=0;i<Bombs;i++) {
    let row = round(random(0,TileDim-1))
    let col = round(random(0,TileDim-1))
    while (!themap2[row][col]==0) {
      row = round(random(0,TileDim-1))
      col = round(random(0,TileDim-1))
    }
    themap2[row][col]=regen;
  }
  return;
}

function setup() {
  createCanvas(SCREENSIZE, SCREENSIZE);
  newMap(map1);
}

function MouseCol() { // Return Mouse X -> Tilemap
  return floor(mouseX/CellSize);
}

function MouseRow() { // Return Mouse Y -> Tilemap
  return ceil(mouseY/CellSize);
}

function draw() {
  
  // Handle User Input
  
  if (keyIsDown(82)) { // R - Reset
    newMap(map1);
  }
  
  // Pretty dumb implementation, may remake
  // Other option would be to have 2 graphs,
  // 1 with actual map, 2 with player  input
  // but idk if that is neccessary.
  
  // Another idea could be so: (IMPLEMENTED)
  // 3 = flagged nothing
  // 4 = flagged sum
  // if we detect a tile that is less than or equal to 1
  // then add the detected tile # to 3
  // if its nothing it will come out to 3, which is corr
  // if its 1 it will come out to 4, which is correct
  // no switch statement benefit
  // global flag left decrement
  if (keyIsDown(70)) { // F - Flag
      if ((flagsLeft>0)&&(map1[MouseRow][MouseCol]==1||0)) {
          map1[MouseRow][MouseCol]+=3;
          flagsLeft-=1;
      }
    }
  }  
  
  if (keyIsDown(84)) { // Unflag
    if (map1[MouseRow][MouseCol]==3||4) {
      flagsLeft+=1
      map1[MouseRow][MouseCol]-=3;
    }
  }
  
  // Clear Screen
  
  background(checkedColor);
  
  // Draw map1
  
  for (let r=0;r<TileDim;r++) {
    for (let c=0;c<TileDim;c++) {
      switch (map1[r][c]) {
        case 0: // Nothing
          fill(uncheckedColor);
          rect(c*CellSize,r*CellSize,CellSize,CellSize);
          fill("white")
          break;
        /*
        case 1: // Bomb
          fill("red")
          rect(c*CellSize,r*CellSize,CellSize,CellSize);
          fill("white")
          break;
        */
        
        case 2: // Checked
          
          fill(checkedColor);
          rect(c*CellSize,r*CellSize,CellSize,CellSize);
          fill("white");
          break;
        case 3||4: // 4=Flagged Bomb, 3=Flagged Nothing
          fill(uncheckedColor);
          rect(c*CellSize,r*CellSize,CellSize,CellSize);
          fill(flaggedColor);
          rect((c*CellSize)+percentOf(FlagSize,CellSize),
               (r*CellSize)+percentOf(FlagSize,CellSize),
               (CellSize)-percentOf(FlagSize*2,CellSize),
               (CellSize)-percentOf(FlagSize*2,CellSize));
          fill("white");
          break;
      }
    }
  }
  
  // Draw Grid
}
