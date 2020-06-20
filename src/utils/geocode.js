const request = require('request')

const geocode = (address,call) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzaDc4MTgiLCJhIjoiY2s5eHMyZXNvMDN0ZjNmcGl5dGNhcTdhbyJ9.iuGeqZUofVqJOmSfQiRITA&limit=1'
	request({url, json:true} ,(error,{ body }) =>{
		if(error)
    	{
    		call('unable to connect to location!', undefined)
    	}
    else if(body.features.length===0)
    	{
    		call('unable to find the location!,TRY ANOTHER LOCATION',undefined)
    	}
    else{
    	const latitude=body.features[0].center[1]
    	const longitude=body.features[0].center[0]
    	call(undefined,{
    		latitude:latitude,
    		longitude: longitude,
    		location : body.features[0].place_name
    	})
    }

	})
}

module.exports = geocode