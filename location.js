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
let card= document.getElementsByClassName("card");
let card1= document.getElementById("card1");
let card2= document.getElementById("card2");
let card3= document.getElementById("card3");
let card4= document.getElementById("card4");
let card5= document.getElementById("card5");
let card6= document.getElementById("card6");
let card7= document.getElementById("card7");
let card8= document.getElementById("card8");
let card9= document.getElementById("card9");
let card10= document.getElementById("card10");
//Use logic (a switch for multiple cases) to provide content based on the query string.
//NOTE: the string includes the ? so you need to include that in your check.
if( searchString === "?card1" ){
	card1.style.display = "block" ;
	card.style.display = "none" ;
	// outBox.innerHTML = "<p>You used the LEFT QR code!</p>";

	
}else if ( searchString === "?card2" ){
	// outBox.innerHTML = "<p>You used the RIGHT QR code!</p>";
	card2.style.display = "block" ;
	card.style.display = "none" ;
}else if ( searchString === "?card3" ){
	// outBox.innerHTML = "<p>You used the RIGHT QR code!</p>";
	card3.style.display = "block" ;
	card.style.display = "none" ;
}else if ( searchString === "?card4" ){
	// outBox.innerHTML = "<p>You used the RIGHT QR code!</p>";
	card4.style.display = "block" ;	
	card.style.display = "none" ;
}
else if ( searchString === "?card5" ){
	// outBox.innerHTML = "<p>You used the RIGHT QR code!</p>";
    card5.style.display = "block" ;
    card.style.display = "none" ;
}
else if ( searchString === "?card6" ){
	
	card6.style.display = "block" ;
	card.style.display = "none" ;

}

else if ( searchString === "?card7" ){
	
	card7.style.display = "block" ;
	card.style.display = "none" ;

}

else if ( searchString === "?card8" ){
	
    card8.style.display = "block" ;
    card.style.display = "none" ;

}

else if ( searchString === "?card9" ){
	
    card9.style.display = "block" ;
    card.style.display = "none" ;

}

else if ( searchString === "?card10" ){
	
	card10.style.display = "block" ;
	card.style.display = "none" ;

}