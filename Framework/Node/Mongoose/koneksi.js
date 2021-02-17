const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect('mongodb://localhost/tutorial',{
	useNewUrlParser: true, 
	useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error',console.error.bind(console,'Connection Error'))

db.once('open',function(){
	console.log("Koneksi Berhasil")
})

const kelasSchema = new Schema({
	judul : String,
	deskripsi : String,
	tglPosting : {
		type : Date,
		default : Date.now
	}
})

const kelas = mongoose.model('Kelas',kelasSchema)

//cara pertama
// const nodejs = new kelas({
// 	judul : 'nodejs',
// 	deskripsi : 'javascript runtime',
// })

// nodejs.save(function(err,data){
// 	if(err) console.log(err)

// 	console.log(data)
// 	console.log('Succes Created Kelas')
// })

//cara kedua
// const nodejs = new kelas()
// nodejs.judul = 'percobaan'
// nodejs.deskripsi = 'percobaan'

// nodejs.save(function(err,data){
// 	if(err) console.log(err)

// 	console.log(data)
// 	console.log('Succes Created Kelas')
// })

//cara ketiga
// kelas.create({
// 	judul : 'Lala',
// 	deskripsi : 'lili'
// },function(err,data){
// 	if(err) console.log(err)

// 	console.log(data)
// })

//get all data
// kelas.find(function(error,data){
// 	if(error) console.log(error)

// 	console.log(data)
// })

//get spesifik data
// findOne == first() in laravel
// find == get() in laravel
// findByIDd() == find() in laravel
// kelas.findById('602d2121a49fa71c74a749ad',function(error,data){
// 	if(error) console.log(error)

// 	console.log(data)
// })

//query builder
const query = kelas.find({judul : 'nodejs'})
query.select('judul tglPosting')
query.exec(function(err,data){
	if(err) console.log(err)

	console.log(data)
})