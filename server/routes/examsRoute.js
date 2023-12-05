const router = require('express').Router();
const Exam = require('../models/examModel');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, async (req, res) => {
    try {
        //check if exam already exist
        const examExists = await Exam.findOne({ name: req.body.name });
        if (examExists) {
            return res.status(200).send({
                message: "Exam already exist!",
                success: false
            });
        }
        req.body.questions = [];
        const newExam = new Exam(req.body);
        await newExam.save();
        res.send({
            message: 'Exam added successfully!',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

module.exports = router