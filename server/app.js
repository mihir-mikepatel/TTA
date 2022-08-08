const dotenv = require('dotenv')
const express = require('express');
const UsersRoutes = require('./api/components/user')
const VehicleRoutes = require('./api/components/vehicle')
const RouteRoutes = require('./api/components/route')
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')
const app = express();
const Userverification = require('./api/models/otpschema');
const { SendMail } = require('.');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

app.set('view engine','handlebars');

require('./db/conn')
app.use(cookieParser())
app.use(fileUpload())
app.use(express.json());
app.use('/route',RouteRoutes)
app.use('/users', UsersRoutes)
app.use('/vehicle',VehicleRoutes)
app.use('/upload',express.static('upload/images'))
app.get('/',(req,res)=>{
    res.send('hellow')
})

console.log('subscribe');

app.post('/email/otp/request', async (req,res,next) =>{
    console.log(`${req.body.email}`);
    const {email} = req.body
    if(email){
        const otp = `${Math.floor(1000+ Math.random() * 9000)}`;
        const data = {email:email,otp:otp}
        await Userverification.deleteMany({email:email})
        .then((result)=>{
            console.log('delete',result);
        })
        const newOTPVerification = await new Userverification({
            // userid:_id,
            email:email,
            otp:otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        })
        await newOTPVerification.save()
        const emailresult = await SendMail(data);
        // console.log('emailresult',emailresult);
        // emailresult
        res.status(200).json({
            data:{
                userid:newOTPVerification._id,
                email:email
            },
            // data1:newOTPVerification,
            message: `send otp to ${email}`,
            status:1
        })
    }else{
       res.status(200).json({
           message:`please enter email id`,
           status:0
       }) 
    }
})

app.post('/mobile/otp/request', (req, res, next) => {
    // res.send('otp');
    console.log(`${req.body.phone}`);
    if(req.body.phone){
        res.status(200).json({
            message: `send otp to ${req.body.phone}`,
            status:1
        })
    }else{
       res.status(200).json({
           message:`please enter phone number`,
           status:0
       }) 
    }
})

app.get('/usertype',async (req,res,next) =>{
    const type = ["driver","owner",'user']
    res.status(200).json({
        type:type
    })
})

app.listen(PORT, () => {
    console.log(`server is runnig at port no`, PORT);
})