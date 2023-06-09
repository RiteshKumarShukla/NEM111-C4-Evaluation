const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    device: {
        type: String,
        required: true,
        enum : ['PC', 'TABLET','MOBILE']
    }
},
    {
        versionKey: false
    }
)

const postModel = mongoose.model('post', postSchema);
module.exports = {
    postModel
}