const mongoose=require("mongoose");
const Schema = mongoose.Schema; 

const RouteSchema = new Schema({
    from :{type: String},
    to :{ type: String},
    date :{ type : Date},
    // user_id:{type:mongoose.Schema.Types.ObjectId,ref:'Vehicle'},
    user_id:{type: Schema.Types.ObjectId,required:true},
    // vehicle_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'}
    vehicle_id:{type: Schema.Types.ObjectId,required:true}
});

 const Route=mongoose.model(
"routes",
RouteSchema
);
module.exports = Route;
