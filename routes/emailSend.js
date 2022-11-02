const express = require("express");
const auth=require('../middleware/auth');
const nodemailer= require('nodemailer');


 

const emailSendRouter = express.Router();

emailSendRouter.post("/",auth,(req,res)=>{
    const {email} = req.body;
    try {
        const transport= nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
    
        const mailOptions ={
            from: process.env.EMAIL,
            to: email,
            subject:'Greetings!!',
            text: 'Wishing You All A Very Happy Diwali!!'
        }
    
        transport.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
            }else {
                console.log('Email Sent'+ info.response)
                res.status(201).json({info})
            }
        })
        
    } catch (error) {
        res.status(400).json({error})
    }
   
         
});


module.exports = emailSendRouter;