const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    correctOption:{
        type:String,
        require:true,
    },
    options:{
        type:Object,
        require: true,
    },
    exam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"exams",
    },
},
{
    timestamps: true,
});

const Question = mongoose.model('questions',questionSchema);
module.exports=Question;