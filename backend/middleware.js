const JWT_SECRET  = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    // console.log("authMiddleware running 1");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        // console.log("authMiddleware running 2");
        return res.status(403).json({});
    }
    
    const token = authHeader.split(' ')[1]; //this will only take the jwt nowt the bearer
    // console.log("authMiddleware running 3");
    console.log(token);
    try{
        console.log("inside try")
        const decode = jwt.verify(token,JWT_SECRET);
        console.log("Decoded JWT:", decode)
        req.userId = decode.userId;
        // console.log("authMiddleware running 4");
        next();
        
    }catch(err){
        res.status(403).json({});
    }
}

module.exports = {
    authMiddleware
}