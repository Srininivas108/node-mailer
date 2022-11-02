const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const cors=require('cors');
const userRouter = require('./routes/userRoutes');
const emailSendRouter = require('./routes/emailSend');


const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "*"
}))


dotenv.config();

//Connect with MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err.message);
});

app.use((req,res,next)=>{
    console.log('going through middleware');
    next();
})

//routes
app.use('/users',userRouter);
app.use('/emailsend',emailSendRouter);


const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server running ...')
});
