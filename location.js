//LEVEL UP: LINKS - LOCATION Object 
console.log(window.location);//Check it out!

//=WE CAN GET VALUES FROM THE location OBJECT
myLocInfo = location.href;//LOCATION OF THE FILE
//myLocInfo = location.host;//WEBSITE
//myLocInfo = location.hostname;//INCLUDES PROTOCOL
//myLocInfo = location.pathname;//PATH AFTER WEBSITE
myLocInfo = location.search;//GETS THE QUERY STRING
//=CHECKOUT http://bl.ocks.org/abernier/3070589 FOR MORE INFO

var outBox = document.getElementById("outPut");
outBox.innerHTML = myLocInfo;

//==USING THE QUERY STRING FROM .search PROGRAMATICALLY==
//Create a variable to hold the search property query string.
var searchString = location.search;

//Use logic (a switch for multiple cases) to provide content based on the query string.
//NOTE: the string includes the ? so you need to include that in your check.
if( searchString === "?leftcode" ){
	outBox.innerHTML = "<p>You used the LEFT QR code!</p>";
	
}else if ( searchString === "?rightcode" ){
	outBox.innerHTML = "<p>You used the RIGHT QR code!</p>";
}