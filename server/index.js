// const req = require('express/lib/request');
var nodemailer = require('nodemailer');

const SendMail = async (data) => {
console.log('data',data);
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'transporttriangel@gmail.com',
        pass:'transport@123!'
    }
});

var mailOptions = {
    from:'transporttriangel@gmail.com',
    to:data.email,
    subject:'TRANSPORT TRIANGLE',
    text:`your otp is ${data.otp}`
};

transporter.sendMail(mailOptions,function (error,info) {
if(error){
    console.log(error);
}  else{
    console.log('email sent: '+info.response);
}
})
}

module.exports = {
    SendMail
}