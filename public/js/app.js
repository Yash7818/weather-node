// console.log('client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) =>{
// 		console.log(data)
// 	})
// })

// fetch('http://localhost:3000/weather?address=wardha').then((response) =>{
// 	response.json().then((data) =>{
// 		if(data.error)
// 		console.log(data.error)
// 		else{
// 			console.log(data.location)
// 			console.log(data.forecast)
// 		}
// 	})
// })

const weather = document.querySelector('form')

const search = document.querySelector('input')

const one = document.querySelector('#one')

const sec = document.querySelector('#sec')

// one.textContent = 'from javascript'

weather.addEventListener('submit',(e) => {
	e.preventDefault()
	const location = search.value
	one.textContent = 'loading...'
	sec.textContent =''

	// console.log(location)
	fetch('/weather?address='+location).then((response) =>{
	response.json().then((data) =>{
		if(data.error){
		console.log(data.error)
		one.textContent = data.error
	}
		else{
			console.log(data.location)
			one.textContent = data.location
			// sec.textContent = 'Weather in '+location+' is '+data.forecast.weather+' with '+data.forecast.temperature+' degrees tempreature and it feels like '+data.forecast.feelslike+' degrees'
			console.log(data.forecast)
			sec.textContent = data.forecast
		}
	// console.log(data)
	})
})
})