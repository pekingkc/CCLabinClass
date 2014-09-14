var city = "";
var state = "";
var APIKey = "ce7aae6fa27e2dc0";

//loadWeather
var loadWeather = function(response){
	// console.log(response);

	if(response.response.error){
		alert(response.response.error.description);
		return;
	}

	// var thisCity = response.location.city;
	var thisCity = response.current_observation.display_location.city;
	var temp = response.current_observation.temp_c + "°";
	var weather = response.current_observation.weather;
	var icon = response.current_observation.icon_url;
	// console.log("this current weather in" + thisCity + "is" + weather + "with a temperature of" + temp);

	$(".temperature").text(temp);
	$(".weather").text(weather);
	$(".currentCity").val(thisCity);
	$(".weatherIcon").html('<img src="' + icon + '">');
	
}






//get weather funciton
var getWeather = function(){

	var thisURL = "http://api.wunderground.com/api/" + APIKey + "/conditions/q/" + state + "/" + city + ".json";

	console.log(thisURL);
	$.ajax({
		url : thisURL,
		dataType : "jsonp",
		success : function(response){
			loadWeather(response);
			console.log(response);
		}
	});

}


//set location function
var setLocation = function(){

	//define the current city
	city = $(".currentCity").val();
	state = $(".currentState").val();
	// $(".currentCity").val("");

	console.log("you want the weather for" + city + "," + state);
	getWeather();

	if(city == null || city == ""){

		alert("you need to list a city!");
		return;

	}

}




//init

var init = function(){

	console.log("what\'s the weather");

	$("#submit").click(function(e){
		e.preventDefault();
		setLocation();
	});

}

$(document).ready(function(){

	init();

});