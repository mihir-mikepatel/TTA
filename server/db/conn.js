const mongoose = require('mongoose')

const DB = process.env.DATABASE;
// console.log('data',DB);
// console.log(DB);
mongoose.connect(DB);

mongoose.connection.on('error',err=>{
    console.log('connection failed',err);
})

mongoose.connection.on('connected',connected=>{
    console.log('connected with database.....');
});
