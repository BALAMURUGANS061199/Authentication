const  router = require('express').Router()
const {CreateUser,Login,GetUsers} = require('../controller/UserCon')

router.post('/add',CreateUser)
router.post('/login',Login)
router.get('/get',GetUsers)


module.exports = router