const { v4:uuidv4 } = require('uuid')
const User = require('../models/user')

// let users = [
// 	{id:1,name:'Harun',email:'harun@mail.com'},
// 	{id:2,name:'Alysia',email:'alysia@mail.com'},
// ]

module.exports = {
	index : (req,res) => {
		// if(users.length > 0){
		// 	res.json({
		// 		status : true,
		// 		method: req.method,
		// 		url : req.url,
		// 		data : users
		// 	})
		// }else{
		// 	response.json({
		// 		status : false,
		// 		message : 'Data User Masih Kosong'
		// 	})
		// }
		let keyword = {}

		if(req.query.keyword){
			keyword = {name : {$regex : req.query.keyword}}
		}

		//cara pertama
		// User.find(keyword,"_id name",(err,users)=>{
		// 	if(err) console.log(err)

		// 	console.log(users)
		// 	res.render('pages/user/index',{users})
		// })

		//cara kedua
		const query = User.find(keyword)
		query.select('name _id')
		query.exec((err,users)=>{
			if(err) console.log(err)

			console.log(users)
			res.render('pages/user/index',{users})
		})
	},
	create : (req,res) => {
		res.render('pages/user/create')
	},
	store : (req,res) => {
		//cara pertama
		// const user = new User({
		// 	name : req.body.name,
		// 	email : req.body.email,
		// 	password : req.body.password
		// })

		// user.save((err,result) => {
		// 	if(err) console.log(err)

		// 	console.log(result)
		// })

		//cara kedua
		User.create({
			name : req.body.name,
			email : req.body.email,
			password : req.body.password
		},(err,result)=>{
			if(err) console.log(err)

			console.log(result)
		})

		// users.push({
		// 	id : uuidv4(),
		// 	name : req.body.name,
		// 	email : req.body.email
		// })
		res.redirect('/users')
	},
	show : (req,res) => {
		const id = req.params.id
		// const data = users.filter(user => user.id == id)
		User.findById(id,(err,data)=>{
			if(err) console.log(err)

			console.log(data)
			res.render('pages/user/show',{data})
		})
	},
	edit : (req,res) => {
		const id = req.params.id
		// const data = users.filter(user => user.id == id)
		User.findById(id,(err,data)=>{
			if(err) console.log(err)

			console.log(data)
			res.render('pages/user/edit',{data})
		})
	},
	update : (req,res) => {
		const id = req.params.id

		User.updateOne({_id : id},{
			name : req.body.name,
			email : req.body.email
		},(err,result)=>{
			if(err) console.log(err)
			console.log(result)
			res.redirect('/users/'+id)
		})

	},
	delete : (req,res) => {
		User.findById(req.params.userId,(err,user)=>{
			if(err) console.log(err)

			user.remove((err,user)=>{
				if(err) console.log(err)

				console.log(user)
				res.redirect('/users')
			})
		})
	}
}