const mongoose=require("mongoose");
const Schema = mongoose.Schema; 

const VehicleSchema = new Schema({
    vehicle_no : String,
    chassis_no : String,
    owner_name: String,
    userid:{type: Schema.Types.ObjectId,required:true}
    // userid:String
});

 const Vehicle=mongoose.model(
"vehicles",
VehicleSchema
);
module.exports = Vehicle;
