const jwt  = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, "hello");
        if(decoded){
            req.body.userID = decoded.userID;
            next();
        }else{
            res.status(400).send({"msg" : "Invalid Token"})
        }
    }else{
        res.status(400).send({"msg" : "Please Register First"})
    }
}

module.exports = {
    auth
}