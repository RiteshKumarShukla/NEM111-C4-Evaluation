const { Router } = require('express');
const { userModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRouter = Router();

//get
userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({ 'users': users })
    } catch (error) {
        res.status(400).send({ 'message': error.message })
    }
})


//registered user
userRouter.post('/register', async (req, res) => {
    const { name, email, gender, password } = req.body;

    const ifUserPresent = await userModel.findOne({ email });
    if (ifUserPresent) {
        return res.status(400).send({ 'msg': 'User already registered, Please Login' })
    }

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new userModel({ name, email, gender, password: hash });
            await user.save();
            res.status(200).send({ 'msg': 'User Registered SuccessFully !!!' })
        })

    } catch (error) {
        res.status(400).send({ 'message': error.message })
    }
})

//Login user router / token expires in 1 hour
userRouter.post('/register', async (req, res) => {
    const { email,password } = req.body;

    try {

        const user  = await userModel.findOne({ email });
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(200).send({'msg' : 'Login SuccessFull !!!'})
                }else{
                    res.status(400).send({'msg' : 'Wrong Password'})
                }
            })
        }else{
            res.status(400).send({'msg' : ' Email not found , Please register yourself first'})
        }
    } catch (error) {
        res.status(400).send({ 'message': error.message })
    }
})


module.exports ={
    userRouter
}