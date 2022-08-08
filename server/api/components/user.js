const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwtsecret = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const Emailsender = require('../../index')
var fs = require('fs')
const path = require("path")
// const middleware = require('../../middleware/JWTAuth')
const User = require('../models/userschema');
// const Userverification = require('../models/otpschema');
const UserOTPVerification = require('../models/otpschema');
// const { updateOne, replaceOne } = require('../models/userschema');
// const user = require('../models/userschema');
const middleware = require('../../middleware/JWTAuth');

router.get('/', (req, res, next) => {
    res.send('hello world from user');
});

// router.post('/otp/verify/register', async (req, res, next) => {
//     console.log('verify');
//     console.log(req.body);
//     const { phone, otp } = req.body
//     if (otp == "123456") {
//         console.log('body==>', req.body);
//         console.log('phone==>', phone);
//         const userLogin = User.findOne({ phone: phone }, function (err, data) {
//             if (!data) {
//                 // console.log(userLogin);
//                 const user = new User({ phone })
//                 user.save();
//                 console.log('add new user', user);
//                 let token = jwt.sign({ _id: user._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
//                 console.log(token);
//                 return res.status(200).json({
//                     status: 1,
//                     message: 'new phone number register',
//                     result: {
//                         User: user,
//                         token: token
//                     }
//                 })
//             } else {
//                 console.log(data, 'user already exit');
//                 let token = jwt.sign({ _id: data._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
//                 console.log(token);
//                 return res.status(200).json({
//                     status: 2,
//                     message: 'already register',
//                     result: {
//                         User: data,
//                         token: token
//                     }
//                 })
//             }
//         })
//     } else {
//         console.log('wrong otp');
//         return res.status(200).json({
//             // console.log('here');
//             status: 0,
//             message: 'wrong otp',
//         })
//     }
// })

//MOBILE NUMBER VERIFICATION REGISTER OR LOGIN
router.post('/mobile/otp/verify/register', async (req, res, next) => {
    console.log('verify');
    console.log(req.body);
    const { phone, otp } = req.body
    if (otp == "1234") {
        console.log('body==>', req.body);
        console.log('phone==>', phone);
        const userLogin = User.findOne({ phone: phone }, function (err, data) {
            if (!data) {
                // console.log(userLogin);
                const user = new User({ phone })
                user.save();
                console.log('add new user', user);
                let token = jwt.sign({ _id: user._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
                console.log(token);
                return res.status(200).json({
                    status: 2,
                    message: 'new phone number register',
                    result: {
                        User: user,
                        token: token
                    }
                })
            } else {
                console.log(data, 'user already exit');
                let token = jwt.sign({ _id: data._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
                console.log(token);
                return res.status(200).json({
                    status: 2,
                    message: 'already register',
                    result: {
                        User: data,
                        token: token
                    }
                })
            }
        })
    } else {
        console.log('wrong otp');
        return res.status(200).json({
            // console.log('here');
            status: 0,
            message: 'wrong otp',
        })
    }
})

//EMAIL ID VERIFICATION REGISTER OR LOGIN
router.post('/email/otp/verify/register', async (req, res, next) => {
    console.log(req.body);
    const { userid, email, otp } = req.body
    if (!userid || !email || !otp) {
        return res.status(200).json({
            // console.log('here');
            status: 0,
            message: 'please enter email and otp',
        })
    } else {
        await UserOTPVerification.findById(userid)
            .then((result) => {
                console.log('result', result);
                if (result) {
                    if (result.expiresAt < Date.now()) {
                        UserOTPVerification.deleteMany({ userid: userid })
                            .then((result) => {
                                console.log('expiresAt delete', result);
                            })
                        return res.status(200).json({
                            status: 2,
                            message: 'code has expired. please request again'
                        })
                    } else {
                        console.log('out otp');
                        if (result.otp == otp) {
                            console.log('otp');
                            User.findOne({ email: email }, function (err, data) {
                                if (!data) {
                                    UserOTPVerification.deleteMany({ email: email })
                                        .then((result) => {
                                            console.log('add verify delete', result);
                                        })
                                    // console.log(userLogin);
                                    const user = new User({ email })
                                    user.save();
                                    console.log('add new user', user);
                                    let token = jwt.sign({ _id: user._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
                                    console.log(token);
                                    return res.status(200).json({
                                        status: 1,
                                        message: 'new email register',
                                        result: {
                                            User: user,
                                            token: token
                                        }
                                    })
                                } else {
                                    UserOTPVerification.deleteMany({ email: email })
                                        .then((result) => {
                                            console.log('already verify delete', result);
                                        })
                                    console.log(data, 'email already exit');
                                    let token = jwt.sign({ _id: data._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY, {});
                                    console.log(token);
                                    return res.status(200).json({
                                        status: 1,
                                        message: 'already register',
                                        result: {
                                            User: data,
                                            token: token
                                        }
                                    })
                                }
                            })
                        } else {
                            return res.status(200).json({
                                status: 2,
                                message: 'wrong otp',
                            })
                        }
                    }
                }
                // res.status(200).json({
                //     status: 2,
                //     message: 'please resend otp',
                // })
            })
            .catch((error) => console.error(error))
    }
})

//GET USER DATA
router.get('/data', middleware, async (req, res) => {
    const id = req.user._id
    console.log('id', id);
    User.findById(id)
        .then((response) => {
            console.log('response',response);
            if (response) {
                res.status(200).json({
                    result: response,
                    status: 0
                })
            } else {
                res.status(200).json({
                    message: 'no record found',
                    status: 1
                })
            }
        }).catch((error) => console.error(error))
})

//UPDATE USER DETAILS DATA
router.post('/update', middleware, async (req, res) => {
    console.log('files', req.files);
    console.log('verify', req.user);
    // const id = req.params.id
    const id = req.user._id
    console.log('id', id);
    const { fname, lname, email, phone, education, gender, category, type_of_skill, work_position, year_of_experience, available_time, job_description, address, city, landmark, zipcode,usertype} = req.body;
    // let curRec = await User.findById(id)
    //     .then((result) => {
    //         console.log('data', result);
    //         if (result.profileimg != undefined) {
    //             const uri = result.profileimg;
    //             console.log("uri==>", uri);
    //             const myArray = uri.split("http://192.168.151.227:5000/upload/")[1];
    //             const oldImage = myArray.split("/")[1];
    //             console.log("oldimagename==>", oldImage);
    //             console.log("oldimagename==>", myArray);
    //         }
    //     })
    //     .catch((error) => console.log(error))
    // let oldImage = ""

    if (req.files) {
        await User.findById(id)
            .then((result) => {
                console.log('data', result);
                if (result.profileimg != undefined) {
                    const uri = result.profileimg;
                    console.log("uri==>", uri);
                    const myArray = uri.split("http://192.168.151.227:5000/upload/")[1];
                    const oldImage = myArray.split("/")[1];
                    console.log("oldimagename==>", oldImage);
                    console.log("oldimagename==>", myArray);
                }
            })
            .catch((error) => console.log(error))
        let oldImage = ""

        let imgFile = req.files.profileimg;
        let profileimg = `http://192.168.151.227:5000/upload/${req.params.id}/${imgFile.name}`;
        console.log("setimage==>", profileimg);
        User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                profileimg: profileimg, fname, lname, email, phone, education, gender, category, type_of_skill, work_position, year_of_experience, available_time, job_description, address, city, landmark, zipcode,usertype
            }
        })
            .then((result) => {
                let labourDir = 'upload/images/';
                let deleteFile = 'upload/images/' + req.params.id + '/' + oldImage;
                console.log('deletefile', deleteFile);
                console.log('existfile', fs.existsSync(deleteFile));
                if (fs.existsSync(deleteFile)) {
                    fs.unlink(deleteFile, (err) => {
                        if (err) {
                            console.log('1delete err', err);
                        }
                        console.log('1file deleted');
                    })
                    imgFile.mv(labourDir + id.toString() + '/' + imgFile.name, function (err) {
                        if (err) {
                            console.log('1image update err', err);
                        }
                    });
                } else {
                    if (fs.existsSync(deleteFile)) {
                        fs.unlink(deleteFile, (err) => {
                            if (err) {
                                console.log('2delete err', err);
                            }
                            console.log('2file deleted');
                        })
                        imgFile.mv(labourDir + id.toString() + '/' + imgFile.name, function (err) {
                            if (err) {
                                console.log('2image update err', err);
                            }
                        });
                    }
                    console.log('Directory not found.');
                    let file = labourDir + id.toString();
                    console.log('exist file==>', fs.existsSync(file));
                    if (!fs.existsSync(file)) {
                        fs.mkdir(path.join('upload/images/', id.toString()), (err) => {
                            if (err) {
                                return console.error('mkdir==>', err);
                            }
                        })
                    }
                    imgFile.mv(labourDir + id.toString() + '/' + imgFile.name, function (err) {
                        if (err) {
                            console.log('mv==>', err);
                        }
                    });
                    console.log('Directory created successfully!');
                }
                console.log("Updated with image successfully1");

                return res.status(200).json({
                    status: 2,
                    message: "Updated with image successfully",
                    updateduser: result
                })
            }).catch((err) => {
                console.log("image update err", err);
                return res.status(200).json({
                    status: 1
                })
            })



    } else {
        User.findOneAndUpdate({ _id: id }, {
            $set: {
                fname, lname, email, phone, education, gender, category, type_of_skill, work_position, year_of_experience, available_time, job_description, address, city, landmark, zipcode,usertype
            }
        }).then(result => {
            console.log('Updated successfully');
            return res.status(200).json({
                status: 2,
                message: 'Updated successfully',
                result: result
            })
        })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    }

})

router.post('/signup', async (req, res, next) => {
    console.log('start');
    const { name, email, phone, gender, work, rolename, password, cpassword } = req.body;
    if (!name || !email || !phone || !gender || !work || !rolename || !password || !cpassword) {
        console.log('plz filled the blank')
        return res.status(200).json({
            error: "plz filled the blank"
        });
    }
    try {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkmail = re.test(String(email).toLowerCase());
        if (checkmail === true) {
            const userExit = await User.findOne({ email: email });
            if (userExit) {
                return res.status(422).json({ error: "Email already exit" });
            } else if (password !== cpassword) {
                return res.status(422).json({ error: 'password not matching' })
            } else {

            }
            const user = new User({ name, email, phone, gender, work, work, rolename, password, cpassword });
            await user.save();
            console.log(user);
            res.status(201).json({
                newuser: user,
                message: "user registered successfully"
            });
        }
        else {
            return res.status(422).json({ error: 'invalid email' })
        }
    }
    catch (err) { console.log(err); }
})

router.post('/signin', async (req, res, next) => {
    console.log('start');
    try {
        // if (req.user.isAuthenticated)
        //     return res.status(200).json({ status: 2, message: "you can't log in again " })


        const { email, password } = req.body;
        if (!email || !password) {
            console.log('plz filled the blank')
            return res.status(400).json({ error: "plz filled the blank" })
        }
        const userLogin = await User.findOne({ email: email });
        if (!userLogin) {
            res.status(400).json({ error: "invalid mail" })
        } else {
            console.log("update==>", userLogin);
            const isMatch = await bcrypt.compare(password, userLogin.password);
            // const token = await userLogin.generateAuthToken();
            let token = jwt.sign({ _id: userLogin._id, isAuthenticated: true, role: "user" }, process.env.SECRET_KEY);
            // console.log(token);
            // const token = jwt.sign({_id: userLogin._id}, process.env.SECRET_KEY,{});
            // User.updateOne(token)
            // userLogin.save();
            // res.cookie('jwtoken',token,{
            //     expires: Date(Date.now() + 25892000000),
            //     httpOnly:true 
            // });

            if (!isMatch) {
                res.status(400).json({ error: "wrong password!!" })
            } else {
                res.status(201).json({
                    userData: { user: userLogin, token: token },
                    message: "successfully login"
                })
            }

        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/demo/check', async (req, res, next) => {
    console.log('start');
    User.find()
        .then(result => {
            res.status(200).json({
                labour: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;