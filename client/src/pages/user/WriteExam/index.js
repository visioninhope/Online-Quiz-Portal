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

            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
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

                {view === "instructions" && <Instructions examData={examData} view={view} setView={setView} />}
                {view === "questions" && <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl'>
                        {selectedQuestionIndex + 1}: {" "}
                        {questions[selectedQuestionIndex].name}
                    </h1>

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

                        {selectedQuestionIndex<questions.length-1 && (
                            <button className='primary-contained-btn' onClick={()=>{
                                setSelectedQuestionIndex(selectedQuestionIndex+1);
                            }}>Next</button>
                        )}
                    </div>
                </div>
                }
            </div>
        )
    );
}

export default WriteExam;