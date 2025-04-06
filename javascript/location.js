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
if( searchString === "?chp1" ){
	
	card1.style.display = "block" ;
	
}

else if ( searchString === "?chp1card1" ){
	
	card2.style.display = "block" ;
	
}

else if ( searchString === "?chp1card2" ){
	
	card3.style.display = "block" ;
	
}

else if ( searchString === "?chp1card3" ){

	card4.style.display = "block" ;	
	
}

else if ( searchString === "?chp2" ){
	card5.style.display = "block" ;
    
}

else if ( searchString === "?chp2card1" ){

	card6.style.display = "block" ;
	
}

else if ( searchString === "?chp2card2" ){
	
	card7.style.display = "block" ;
	
}

else if ( searchString === "?chp2card3" ){

   
  card8.style.display = "block" ;
}

else if ( searchString === "?chp3" ){
	
	card9.style.display = "block" ;
   

}

else if ( searchString === "?chp3card1" ){
	
	card10.style.display = "block" ;
	
}

else if ( searchString === "?chp3card2" ){
	
	card10.style.display = "block" ;
	
}

else if ( searchString === "?chp3card3" ){
	
	card10.style.display = "block" ;
	
}
