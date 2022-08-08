const express = require('express')
const vehicle = require('../models/vehicleschema')
const route = require('../models/routeschema')
const router = express.Router()
const middleware = require('../../middleware/JWTAuth')

//ADD NEW VEHICLE
router.post('/register', middleware, async (req, res, next) => {
    // console.log('h', req.body);
    const userid = req.user._id;
    // console.log('userid', userid);
    // console.log('v', req.user);
    const com = []
    const { vehicle_no, chassis_no, owner_name } = req.body
    const Myvehicle = await vehicle.find({ vehicle_no: vehicle_no })
    if (!Myvehicle.toString() == com) {
        res.status(200).json({
            message: 'vehicle already register'
        })
    } else {
        console.log(Myvehicle);
        const Vehicle = new vehicle({ vehicle_no, chassis_no, owner_name, userid })
        console.log('vehicle', Vehicle);
        await Vehicle.save()
        res.status(200).json({
            vehicle: Vehicle,
            message: 'sucessfully vehicle register'
        })
    }
})

//GET USER'S VEHICLE DETAIL
router.get('/myvehicle', middleware, async (req, res, next) => {
    console.log(req.user);
    const userid = req.user._id
    vehicle.find({ userid: userid })
        .then((response) => {
            console.log('myvehicle', response);
            if (response) {
                res.status(200).json({
                    message: 'your vehicle',
                    vehile: response
                })
            } else {
                res.status(200).json({
                    message: 'no vehicle register',
                })
            }
        })
        .catch((error) => console.log(error))
})

router.get('/getroute', async (req, res, next) => {
    const data = await vehicle.aggregate([
        // { $match: { 'user_id': { $eq: req.user._id } } },
        // {"$addFields"}    
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "trainer_data"
            }
        },
    ])
    console.log(data);

})


//DELETE VEHICLE
router.delete('/delete/:id', async (req, res, next) => {
    console.log(req.params);
    const id = (req.params.id)
    console.log(id);
    vehicle.deleteOne({ _id: id })
        .then((response) => {
            console.log(response);
            res.status(200).json({
                message: 'sucess fully delete vehicle',
                status: 1
            })
        }).catch((error) => {
            res.status(200).json({
                message: 'something went wrong',
                status: 0
            })
        })
})

//demo 
router.delete('/demo/delete/:id', async (req, res, next) => {
    // console.log(req.params);
    const id = (req.params.id)
    // console.log(id);
    const Vehicle = await vehicle.findById(id)
    console.log(Vehicle);
    const RS1 = await route.find({ vehicle_id: id })
    console.log(RS1);
    const RS = await route.deleteMany({vehicle_id: id})
    console.log(RS);
    vehicle.deleteOne({ _id: id })
        .then((response) => {
            console.log(response);
            res.status(200).json({
                message: 'sucess fully delete vehicle',
                status: 1
            })
        }).catch((error) => {
            res.status(200).json({
                message: 'something went wrong',
                status: 0
            })
        })
})

module.exports = router;