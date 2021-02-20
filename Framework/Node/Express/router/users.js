const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.route('/users')
	.get(userController.index)
	.post(userController.store)

router.get('/users/create',userController.create)

router.get('/users/:id',userController.show)

router.get('/users/:id/edit',userController.edit)

router.put('/users/:id',userController.update)

router.delete('/users/:userId',userController.delete)

module.exports = router