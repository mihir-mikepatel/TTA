const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userschema = new mongoose.Schema({
    profileimg:{
        type:String,
    },
    fname:{  
        type:String,
        required:false
    },
    lname:{  
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    education:{  
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    category:{  
        type:String,
        required:false
    },
    type_of_skill:{  
        type:String,
        required:false
    },
    work_position:{
        type:String,
        required:false
    },
    year_of_experience:{
        type:String,
        required:false
    },
    available_time:{  
        type:String,
        required:false
    },
    job_description:{  
        type:String,
        required:false
    },
    address:{  
        type:String,
        required:false
    },
    city:{  
        type:String,
        required:false
    },
    landmark:{  
        type:String,
        required:false
    },
    zipcode:{
        type:String,
        required:false
    },
    usertype:{
        type:String,
        required:false
    }
})

userschema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        this.cpassword = await bcrypt.hash(this.cpassword,10);
    }
    next();
})

userschema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens = await this.tokens.concat({token:token});
    //    this.token = await this.token.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const user = mongoose.model('users',userschema);

module.exports = user;
