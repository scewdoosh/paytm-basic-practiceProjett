const express = require('express');
const{ authMiddleware } = require('../middleware');
const{ Account } = require('../db');
const { default:mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId : req.userId,
    });
    if(!account){
        return res.status(404).json({ message: "Account not found" });
    }
    // console.log("near balance---")
    res.json({
        balance: account.balance,
    })
});

router.post("/transfer", authMiddleware , async (req,res) =>{
    console.log("inside transfer 1");
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount , to } =  req.body;
    console.log("inside transfer 2");
    try{
        console.log("inside transfer 3");
        const account = await Account.findOne({userId: req.userId }).session(session);
        
        if(!account || account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Insufficient balance",
            });
        }
        console.log("inside transfer 4");
        const toAccount = await Account.findOne({ userId: req.userId }).session(session);
        console.log("inside transfer 5");

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid acount details",
        });
    }


    await Account.updateOne({userId : req.userId} ,{$inc: {balance :-amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc : {balance : amount}}).session(session);


    await session.commitTransaction();
    res.json({
        message:"Transfered successfilly",
    });
}catch(e){
    console.log(e);
}finally {
        await session.endSession(); // Always close the session
    }
});

module.exports = router;