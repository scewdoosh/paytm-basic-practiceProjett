const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User , Account} = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

//signup and sigin routes
const signupSchema = zod.object({
    username: zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password:zod.string(),
})  
router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email is already taken / Invalid input"
        })
    }
    const user = await User.findOne({
        username : req.body.username,
    })
    if(user){
        return res.status(411).json({
            message:"Email is already taken / Invalid input"
        })
    }
    const dbUser = await User.create(body);
    
    
    await Account.create({
        userId : dbUser._id,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId : dbUser._id,
    },JWT_SECRET);
    
    res.json({
        message : "User created successfully",
        token : token
    })
})

const signinBody = zod.object({
    username : zod.string().email(),
    password: zod.string(),
})

router.post("/signin",async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "email already exist / Incorrect Inputs",
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password,
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in",
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName:zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authMiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while updating information ...",
        })
    }
    const userId = req.userId;
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message:"changes updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    // console.log("inside bulk")
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName :{
                "$regex" : filter
            }
        },{
            lastName :{
                $regex : filter
            }
        }]
    })
    res.json({
        users: users.map(user =>({
            username: user.username,
            firstName:user.firstName,
            lastName : user.lastName,
            _id : user._id,
        }))
    })
})

module.exports = router;