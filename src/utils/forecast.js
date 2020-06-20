const request = require('request')

const forecast = (longitude,latitude,call) =>{
     const url = 'http://api.weatherstack.com/current?access_key=7ce2751908a04a2fd8846db53f2c356f&query='+latitude+','+longitude+'&units=f'
     request({url, json:true }, (error,{ body }) =>{
	
	if(error)
	{
		call('unable to connect to weather service!',undefined)    //error handling
	}
	else if(body.error)
	{
		call('unable to find the location!',undefined)
	}
	else{
// 	console.log(response.body.current.weather_descriptions[0]+' IT IS '+response.body.current.temperature +' degrees outside ,' + 'feels like '+response.body.current.feelslike+'with the humidity of '+body.current.humidity+'% in'+body.location.timezone_id
// +'timezone')
	call(undefined,body.current.weather_descriptions[0]+'. IT IS '+body.current.temperature +' degrees outside ,' + 'feels like '+body.current.feelslike+'with the humidity of '+body.current.humidity+'%')
    }

   })
}

module.exports = forecast
// weather:body.current.weather_descriptions[0],
// 		temperature : body.current.temperature,
// 		feelslike : body.current.feelslike,
// 		humidity : body.current.humidity,
// 		cloudcover : body.current.cloudcover,
// 		timezone : body.location.timezone_id