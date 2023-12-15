const authMiddleware = require('../middleware/authMiddleware');
const router=require('express').Router();
const Exam=require('../models/examModel');
const User=require('../models/userModel');
const Report=require('../models/reportModel');
const { route } = require('./examsRoute');

// add attempt

router.post('/add-report',authMiddleware,async(req,res)=>{
    try {
        const newReport=new Report(req.body);
        await newReport.save();
        res.send({
            message:"Attempt has been added successfully!",
            success:true,
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data:error,
            success:false,
        });
    }
});

//get All Attempt
router.post('/get-all-ettempts',authMiddleware,async(req,res)=>{
    try {
        const reports= await Report.find();
        res.send({
            message:"Attempts has been fetched successfully!",
            data:reports,
            success:true,
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data:error,
            success:false,
        });
    }
});

//get all reports by user
router.post('get-all-attempts-by-user',authMiddleware,async(req,res)=>{
    try {
        const reports=await Report.find({user:req.body.userId});
        res.send({
            message:"Attempts has been fetched successfully!",
            data:reports,
            success:true,
        });
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data:error,
            success:false,
        });
    }
});

module.exports=router;