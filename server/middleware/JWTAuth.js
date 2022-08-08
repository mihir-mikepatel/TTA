const jwt = require("jsonwebtoken");
const User = require('../api/models/userschema')
const JWTSECRET = process.env.SECRET_KEY;

// const authtoken = async function (req, res, next) {
//     try {
//         console.log('middleware');
//         const access_token = req.headers['authorization'];
//         console.log(access_token); 
//         if (!access_token){
//           return req.user = { _id: "", isAuthenticated: false };}
//         if (access_token) {
//             const verifytoken = jwt.verify(token,process.env.SECRET_KEY);
//             console.log(verifytoken);
//             if (!verifytoken){
//                 return req.user = { _id: "", isAuthenticated: false };}
//             else{
//                 console.log(verifytoken);
//                 return req.user = verifytoken;
//                 }
//         }
//         next();
//     } catch (error) {
//         res.user = {_id:"" ,isAuthenticated:false};
//     }
// }

// module.exports = authtoken;


const Authenticate = async (req,res,next) => {
    try{
        // console.log(req.headers);
       const token = req.headers['authorization'];
        // const token = req.Cookies.jwtoken;
        // console.log('token',token);

        // const verifytoken = jwt.verify(token,process.env.SECRET_KEY);
        // console.log('we are trying')
        // console.log("verify",verifytoken);
        if(!token){
            return req.user = {_id:"",isAuthenticated: false }
        }
        if(token){
            const verifytoken = jwt.verify(token,process.env.SECRET_KEY);
        // console.log('we are trying')
        // console.log("verify",verifytoken);
        if(!verifytoken){
            return req.user = {_id:"",isAuthenticated:false}
        }else{
         req.user = verifytoken
            
        next();
        }
        }
        // const rootUser = await User.findOne({_id:verifytoken._id, 'tokens.token':token});
        // if(!rootUser){
        //     throw new Error('user not found')
        // }
        // req.user = verifytoken;
        // req.token = token;
        // req.rootUser = rootUser;
        // req.userId = rootUser._id;

    }catch(err){
        res.status(401).send('unauthorized')
        console.log(err)
    }
}

module.exports = Authenticate;

// const middleware = async (req, res, next) => {
//     const token = req.headers['authorization'];
//     console.log(token);
//     if (!token)
//         return res.status(401).json({ msg: "no token" });
//     try{
//         const decoded = jwt.verify(token,JWTSECRET);
//         req.user = decoded;
//         console.log(decoded);
//         next();
//     }catch(e){
//         res.status(400).json({msg:"token is not valid"});
//     }
// }

// module.exports = middleware;