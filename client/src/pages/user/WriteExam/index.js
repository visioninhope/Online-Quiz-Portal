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


    const getExamData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getExamById({
                examId: params.id
            });
            dispatch(HideLoading());
            if (response.success) {
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

                <Instructions examData={examData}/>
            </div>
        )
    );
}

export default WriteExam;