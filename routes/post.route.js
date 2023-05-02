const { Router } = require('express');
const { postModel } = require('../models/post.model');


const postRouter = Router();

postRouter.get('/', async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "hello");

    try {
        if (decoded) {
            const post  = await postModel.find({'postID':decoded.userID});
            res.status(200).send(post)
        }
    }catch(error){
        res.status(400).send({'msg': error.message});
    }
})


//post
postRouter.post('/add', async(req, res) => {
    const payload = req.body;
    try{
      const post = new postModel(payload);
      await post.save();
      res.status(200).send({'msg' :  'Post Created successfully'})
    }catch(error){
        res.status(400).send({'msg' : error.message})
    }
})

//update a post 
postRouter.patch('/update/:postID', async(req, res) => {
   const { postID}  = req.params;
   const payload = req.body;
    try{
      await postModel.findByIdAndUpdate({_id : postID}, payload)
      res.status(200).send({'msg' :  'Post Updated successfully'})
    }catch(error){
        res.status(400).send({'msg' : error.message})
    }
})

//delete a post 
postRouter.delete('/delete/:postID', async(req, res) => {
    const { postID}  = req.params;
    
     try{
       await postModel.findByIdAndDelete({_id : postID}, payload)
       res.status(200).send({'msg' :  'Post Deleted successfully'})
     }catch(error){
         res.status(400).send({'msg' : error.message})
     }
 })


 module.exports = {
    postRouter
 }