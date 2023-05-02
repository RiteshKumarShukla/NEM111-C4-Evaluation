const express = require('express');
require('dotenv').config();
const { connectionDB } = require('./db');
const { userRouter } = require('./routes/user.route');
const { postRouter } = require('./routes/post.route');
const { auth } = require('./middlewares/auth.middleware');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json());

app.use('/users', userRouter);
app.use(auth);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Social Media App !!!")
});

app.listen(process.env.port, () => {
    connectionDB()
    console.log(`Server is running on port ${process.env.port}`);
})