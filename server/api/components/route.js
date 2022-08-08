const express = require('express')
const route = require('../models/routeschema')
const router = express.Router()
const middleware = require('../../middleware/JWTAuth')
const { default: mongoose } = require('mongoose')
const user = require('../models/userschema')




//add route
router.post('/add', middleware, async (req, res, next) => {
    // console.log('here');
    // console.log(req.user);
    // console.log(req.body);
    const user_id = req.user._id
    const { from, to, date, vehicle_id } = req.body
    // console.log('data',from,to,date,user_id,vehicle_id);
    if (!from || !to || !date || !user_id || !vehicle_id) {
        res.status(200).json({
            message: 'please insert data',
            status: 0
        })
    } else {
        const Route = new route({ from, to, date, user_id, vehicle_id })
        // console.log(Route);
        await Route.save()
        res.status(200).json({
            data: Route,
            message: 'succesfull data inserted',
            status: 1
        })
    }
})

//GET DRIVER ROUTE
router.get('/get', middleware, async (req, res, next) => {
    const user_id = req.user._id
    const droutes = await route.find({ user_id: user_id })
    console.log(droutes);
    if (droutes.toString() == []) {
        res.status(200).json({
            message: 'no record found',
            status: 0
        })
    } else {
        res.status(200).json({
            data: droutes,
            message: 'no record found',
            status: 1
        })
    }
})

//get vehicle route
router.get('/getroute/data/:id', async (req, res, next) => {
    const vehicle_id = req.params.id
    // const user_id = req.user._id
    const vroutes = await route.find({ vehicle_id: vehicle_id })
    console.log(vroutes);
    if (vroutes.toString() == []) {
        res.status(200).json({
            message: 'no record found',
            status: 0
        })
    } else {
        res.status(200).json({
            data: vroutes,
            message: 'no record found',
            status: 1
        })
    }
})


// router.get('/getroute', middleware, async (req, res, next) => {
//     const user_id = req.user._id
//     const droutes = await route.find({ user_id: user_id })

// })


//demo for multiple table
router.get('/getroute', middleware, async (req, res, next) => {
    console.log(req.user._id);
    const data = await route.aggregate([
        { $match: { 'user_id': mongoose.Types.ObjectId(req.user._id) } },
        // {"$addFields"}    
        {
            $lookup: {
                from: 'vehicles',
                localField: 'vehicle_id',
                foreignField: '_id',
                as: 'vehicle_data'
            }
        },
        { $unwind: "$vehicle_data" },
    ])
    console.log(data);
    if (data.toString() == []) {
        res.status(200).json({
            message: 'no record found',
            status: 0
        })
    } else {
        res.status(200).json({
            message: 'successfully fetch data',
            statys: 1,
            data: data
        })
    }
})

router.post('/find', async (req, res, next) => {
    console.log(req.body)
    const { from, to } = req.body
    if (!from || !to) {
        console.log('plz filled the blank')
        return res.status(200).json({
            error: "plz filled the blank"
        });
    } else {
        const data = await route.aggregate([
            {
                "$match": {
                    "$and": [
                        { "from": { '$regex': from, '$options': 'xi' } },
                        { "to": { '$regex': to, '$options': 'xi' } },
                    ]
                }
            },
            {
                $lookup: {
                    from: 'vehicles',
                    localField: 'vehicle_id',
                    foreignField: '_id',
                    as: 'vehicle_data'
                }
            },
            { $unwind: "$vehicle_data" },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_data'
                }
            },
            { $unwind: "$user_data" },


        ])
        console.log(data.toString());
        console.log(data);
        if (data.toString() == []) {
            res.status(200).json({
                message: 'no record found',
                status: 0
            })
        } else {
            res.status(200).json({
                message: 'successfully data found',
                status: 1,
                data: data
            })
        }
    }

})

router.get('/', async (req, res, next) => {
    console.log('here');
})

module.exports = router