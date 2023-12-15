import React, { useEffect, useState } from 'react';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { getExamById } from '../../../apicalls/exams';
import Instructions from './Instructions';

function WriteExam() {
    const [examData, setExamData] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState("instructions");
    const [questions = [], setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [result = {}, setResult] = useState({});
    const [secondsLeft=0,setSecondsLeft]=useState(0);
    const [timeUp,setTimeUp]=useState(false);
    const [intervalId,setIntervalId]=useState(null);

    const getExamData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getExamById({
                examId: params.id
            });
            dispatch(HideLoading());
            if (response.success) {
                setQuestions(response.data.questions);
                setExamData(response.data);
                setSecondsLeft(response.data.duration);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const calculateResult = () => {
        let correctAnswers = [];
        let wrongAnswers = [];
        questions.forEach((question, index) => {
            if (question.correctOption === selectedOptions[index]) {
                correctAnswers.push(question);
            } else {
                wrongAnswers.push(question);
            }
        });

        let verdict = "Pass!";
        if (correctAnswers.length < examData.passingMarks) {
            verdict = "Fail!";
        }
        setResult({
            correctAnswers,
            wrongAnswers,
            verdict,
        });
        setView("result");
    };

    const startTimer = () => {
        let totalSeconds = examData.duration;
        const intervalId = setInterval(() => {
          if (totalSeconds > 0) {
            totalSeconds = totalSeconds - 1;
            setSecondsLeft(totalSeconds);
          } else {
            setTimeUp(true);
          }
        }, 1000);
        setIntervalId(intervalId);
      };

    useEffect(()=>{
        if(timeUp){
            clearInterval(intervalId);
            calculateResult();
        }
    },[timeUp]);
    useEffect(() => {
        if (params.id) {
            getExamData();
        }
    }, []);
    return (
        examData && (
            <div className='mt-2'>
                <div className='divider'></div>
                <h1 className='text-center'>{examData.name}</h1>
                <div className='divider'></div>

                {view === "instructions" && <Instructions examData={examData} setView={setView} startTimer={startTimer} />}
                {view === "questions" && <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl'>
                            {selectedQuestionIndex + 1}: {" "}
                            {questions[selectedQuestionIndex].name}
                        </h1>
                        <div className='timer'>
                        <span className='text-2xl'>{secondsLeft}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {
                            return (
                                <div className={`flex gap-2 flex-col ${selectedOptions[selectedQuestionIndex] === option ? "selected-option" : "option"}`} key={index} onClick={() => {
                                    setSelectedOptions({
                                        ...selectedOptions,
                                        [selectedQuestionIndex]: option,
                                    });
                                }}>
                                    <h1 className='text-xl'>
                                        {option}:{questions[selectedQuestionIndex].options[option]}
                                    </h1>
                                </div>
                            )
                        })}
                    </div>

                    <div className='flex justify-between'>
                        {selectedQuestionIndex > 0 && (<button className='primary-outline-btn' onClick={() => {
                            if (selectedQuestionIndex > 0) {
                                setSelectedQuestionIndex(selectedQuestionIndex - 1);
                            }
                        }}>Previous</button>)}

                        {selectedQuestionIndex < questions.length - 1 && (
                            <button className='primary-contained-btn' onClick={() => {
                                setSelectedQuestionIndex(selectedQuestionIndex + 1);
                            }}>Next</button>
                        )}

                        {selectedQuestionIndex === questions.length - 1 && (
                            <button className='primary-contained-btn' onClick={() => {
                                setTimeUp(true);
                                clearInterval(intervalId);
                                calculateResult();

                            }}>Submit</button>
                        )}
                    </div>
                </div>
                }

                {view === "result" && (
                    <div className='flex item-center mt-2 justify-center'>
                        <div className='flex flex-col gap-2 result'>
                            <h1 className='text-2xl'>RESULT</h1>

                            <div className='marks'>
                                <h1 className='text-md'>Total Marks: {examData.totalMarks}</h1>
                                <h1 className='text-md'>Obtained Marks: {result.correctAnswers.length} </h1>
                                <h1 className='text-md'>Wrong Answers: {result.wrongAnswers.length}</h1>
                                <h1 className='text-md'>Passing Marks: {examData.passingMarks}</h1>
                                <h1 className='text-md'>VERDICT : {result.verdict}</h1>
                            </div>
                        </div>
                        <div className='lottie-animation'>
                            {result.verdict === "Pass!" && (
                                <dotlottie-player
                                    src="https://lottie.host/c9b28efc-0a4d-4bdd-90bb-55a53338b9d9/fBGADkeFgB.json"
                                    background="transparent"
                                    speed="1"
                                    loop
                                    autoplay></dotlottie-player>
                            )}

                            {result.verdict === "Fail!" && (
                                <dotlottie-player src="https://lottie.host/8bbef95e-e806-47fa-b90c-95765ed77af7/sGhHAW1Pxd.json"
                                    background="transparent"
                                    speed="1"
                                    loop
                                    autoplay></dotlottie-player>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    );
}

export default WriteExam;