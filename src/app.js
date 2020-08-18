const path = require('path')
const express = require('express')
const request = require('request') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
// app.get('',(req ,res) =>{

// 	res.send('<h1>HOME</h1>')
// })
// app.get('/help',(req ,res) =>{
// 	res.send('HELLO MY NAME IS YASH')
// })

// app.get('/about',(req,res) => {
// 	res.send('<h1>THIS IS AN ABOUT PAGE</h1>')
// })

app.get('',(req,res) => {
	res.render('index' ,{
		title : 'WEATHER',
		name : 'yash wandhare'
	})
})
app.get('/about' ,(req,res) =>{
	res.render('about',{
		title : 'ABOUT',
		name: 'yash wandhare'
	})
})
app.get('/help' ,(req,res) => {
	res.render('help' , {
		title:'HELP FOR U',
		content:'This is a help page for the purpose of learning'
	})
})
app.get('/weather', (req,res) =>{
	if(!req.query.address){
		return res.send({
			error:'provide an address of the location'
		})
	}
	geocode(req.query.address,(error, { latitude,longitude,location } = {}) =>{
	if(error){
		return res.send({
			error:error
		})
	}
	forecast(longitude, latitude,(error, data1) => {
		if(error){
			return res.send({
				error:error
			})
		}	
		      res.send({
		      	location:location,
		      	address : req.query.address,
		      	forecast:data1
            })
	   })

	})

})

app.get('/geoloc',(req,res)=>{
	
	forecast(req.query.longitude,req.query.latitude,(error,data) => {
		if(error){
			return res.send({
				error: error
			})
		}
		res.send({
			location:'Your Location',
			forecast:data
		})
	})


})

app.get('/*', (req,res) =>{
	res.render('404', {
		title : '404',
		content : 'ERROR HAS OCCURED!!'
	})
})


app.listen(port, ()=>{
	console.log('server is started on port '+port+' .')
})