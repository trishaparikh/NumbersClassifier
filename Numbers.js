// These are global variables used throughout the code
var userNum = [];
var evenList = [];
var oddList = [];
var primeList = [];
var compList = [];

// This sets the initial screen to the home screen
setScreen("homeScreen");

//These are onEvent's to allow the user to go back and forth with the screens 
onEvent("nextBtn", "click", function( ) {
  setScreen("numbersScreen");
  // reset the num list  
  if(userNum.length >0)  {
    for(var i=userNum.length;i>=0;i--)  {
      removeItem(userNum, i);
      
    }
  }
});

onEvent("homeBtn", "click", function( ) {
  setScreen("homeScreen");
// This is so when the user clicks the home button and goes to input numbers again the old list of data is cleared out.
  setText("numOutput", "");
});

onEvent("backBtn","click", function( ) {
  setScreen("numbersScreen");
});

//This is an onEvent so that when the user clicks the button "Add new number" it will allow them to append another number to their list/set of numbers
onEvent("addBtn","click", function( ) {
  var newNum = getNumber("numInput");
  appendItem(userNum,newNum);
  
  outputUpdate();
});

//This function is to set the output of the list of numbers onto the numOutput text box
function outputUpdate() {
  setProperty("numInput", "text", "");
  setProperty("numOutput", "text", userNum.join(", "));
}


//This function will take the users list of numbers and traverse through them and find the even numbers
function FindEven(inpL) {
  var i;
  var outL = [];
  for(i=0; i < inpL.length; i++)
  {
    if(inpL[i] % 2 == 0)
    {
      appendItem(outL, inpL[i]);
    }
  }
  return outL;
}

//This function will take the users list of numbers and traverse through them to find the odd numbers  
function FindOdd(inpL) {
  var i;
  var outL = [];
  for(i = 0; i < inpL.length; i++)
  {
    if(inpL[i] % 2 != 0)
    {
      appendItem(outL, inpL[i]);
    }
  }
  return outL;
}

// This function is the code on how to find the numbers that are prime 
function isPrime(n)  {
  if ((n == 0) || (n == 1) || (n == 2))
     return 1;
  
  for(var i = 2; i<n; i++)
     if(n%i == 0)
        return 0;
  
  return 1;      
}

// This function uses the function "isPrime" and takes the users input list of numbers and traverses through them to find the prime values 
function FindPrime(inpL) {
 var outL = [];
 for(var i = 0; i< inpL.length; i++) {
  if (isPrime(inpL[i]))
     appendItem(outL, inpL[i]);
 }
return outL;
}

// This function takes the users input list of numbers and traverses through the list to find the composite values
function FindComposite(inpL) {
 var outL = [];
 for(var i = 0; i< inpL.length; i++) {
  if (isPrime(inpL[i]) == 0)
     appendItem(outL, inpL[i]);
 }
return outL;
}

// This function is to set the numbers of the users input list into the correct spots
function updateScreen() {
  setText("evenTxt", "Even Numbers: " + evenList.join(", "));
  setText("oddTxt", "Odd Numbers: " + oddList.join(", "));
  setText("primeTxt", "Prime Numbers: " + primeList.join(", "));
  setText("compTxt", "Composite Numbers: " + compList.join(", "));
  
}

// This onEvent is so that when the user clikcs the calculate button it takes them to the calcScreen
onEvent("calcBtn", "click", function( ){
  setScreen("calcScreen");
  
// These are the updated global variables. They are set equal to the functions with the parameter of the userNum which is the users input list of numbers 
  evenList = FindEven(userNum);
  oddList = FindOdd(userNum);
  primeList = FindPrime(userNum);
  compList = FindComposite(userNum);
  
// When the calculate button is clicked and the screens change the updateScreen function will be called and the information will show up on the screen.
  updateScreen();
  
});
