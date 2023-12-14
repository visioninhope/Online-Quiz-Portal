import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getAllExams } from "../../../apicalls/exams";
import { Col, Row, message } from 'antd';
import PageTitle from '../../../components/PageTitle';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [exams, setExams] = useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { user } = useSelector((state) => state.users);
    const getExam = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllExams();
            if (response.success) {
                setExams(response.data)
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    useEffect(() => {
        getExam();
    }, []);
    return (
        <div>
        {/*`Hi ${user.name}, Welcome to Online Quiz Portal!`*/}
            <PageTitle title={`Hi ${user.name}, Welcome to Online Quiz Portal!`} />
            <div className='divider'></div>
            <Row gutter={[16, 16]}>
                {exams.map((exam) => (
                    <Col span={6}>
                        <div className='card-lg flex flex-col gap-1 p-2'>
                            <h1 className='text-2xl'><b>{exam.name}</b></h1>
                            <h1 className='text-md'>Category: {exam.category}</h1>
                            <h1 className='text-md'>Total Marks: {exam.totalMarks}</h1>
                            <h1 className='text-md'>Passing Marks: {exam.passingMarks}</h1>
                            <h1 className='text-md'>Duration: {exam.duration}</h1>

                            <button className='primary-outline-btn' onClick={()=>{
                                navigate(`/user/write-exam/${exam._id}`)
                            }}>
                            Start Exam</button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home;