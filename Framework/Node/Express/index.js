const express = require('express')
const userRouter = require('./router/users')
const app = express()
const port = 3000
const mongoose = require('mongoose')

//() => {} itu sama seperi function(){}

//baris code 9 dan 10 digunakan untuk menerima inputan dari bagina body(postman)
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

//ini middleware
var myLogger = function(req,res,next){
	req.time = new Date()
	next()
}

//Menghubungkan ke database
mongoose.connect('mongodb://localhost/balademia',{useNewUrlParser : true, useUnifiedTopology : true})

//manggil midleware
app.use(myLogger)

//menggunakan template engine
app.set('view engine','ejs')

//menggunakan static file
app.use(express.static('public'))

app.get('/', (req, res) => {
	const kelas = {
		id : '1',
		name : 'Lala',
		date : req.time.toString()
	}
	// res.json(kelas)
	res.render('pages/index',{kelas : kelas})
})

app.get('/about',(req,res) => {
	res.render('pages/about')
})

app.use(userRouter)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})