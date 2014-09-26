$(function(){
	$("#getLocal").on("click",getLocalClick);
	$("#getWeather").on("click",getWeatherClick);
});

var isLocalClick = false;
function getLocalClick(){
	if(isLocalClick){
		isLocalClick = false;
		$("#output pre").text("");
	}else{
		isLocalClick = true;
		$.ajax({
			url:"../download/json/glossary.json",
			dataType:"json",
			success:function(result,status,xhr){
				//console.log(result);
				var str = JSON.stringify(result, undefined, 2); // indentation level = 2
				//console.log(str);
				$("#output pre").text(str);
			},
			error:function(xhr,status,error){
				alert("error");
			}
		});
	}
	
}
/*
找規則
"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22taipei%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22taichung%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kaohsiung%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
*/
function getWeatherClick(){
	//城市溫度 [台北,台中,高雄]
	var city = ["taipei","taichung","kaohsiung"];
	var api = [];
	var apiNative = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22xxxxx%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

	//console.log(apiNative.replace("xxxxx","value"));
	$.each(city,function(index,value){
		var tmp = apiNative.replace("xxxxx",value);
		api.push(tmp);
	});
	
	$.each(api,function(index,value){
		yahooWeatherApi(value);
	});
}
function yahooWeatherApi(url){
	$.ajax({
			url:url,
			dataType:"json",
			success:function(result,status,xhr){
				//console.log(result);
				
				var cityName = result.query.results.channel.title;
				var fahrenheit_temperature = result.query.results.channel.item.condition.temp;
				var celsius_temperature = fahrenheitToCelsius(fahrenheit_temperature);
				
				$("#outputWeather").append("<p>"+cityName+" : <strong>"+celsius_temperature+"</strong></p>");
			},
			error:function(xhr,status,error){
				alert("error");
			}
		});
}

function fahrenheitToCelsius(f){
	var celsius = (f-32)*5/9 ;
	return celsius;
}