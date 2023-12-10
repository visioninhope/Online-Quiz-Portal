import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Row, Form, Select, message, Tabs } from 'antd';
import { addExam, editExamById, getExamById } from "../../../apicalls/exams";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import TabPane from "antd/es/tabs/TabPane";
function AddEditExams() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [examData, setExamData] = useState(null);

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;

            if (params.id) {
                response = await editExamById({
                    ...values,
                    examId: params.id,
                });
            } else {
                response = await addExam(values);
            }
            if (response.success) {
                message.success(response.message);
                navigate('/admin/exams');
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

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
    }, [])
    return (
        <div>
            <PageTitle title={
                params.id ? "Edit Exam " : "Add Exam"
            } />
            <div className='divider'></div>
            {(examData || !params.id) && (
                <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Exam Details" key='1'>
                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Form.Item label="Exam Name" name='name'>
                                        <input type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Exam Duration" name='duration'>
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Categoty" name='category'>
                                        <select name="" id="">
                                            <option value="">Select Category</option>
                                            <option value='JavaScript'>JavaScript</option>
                                            <option value='Python'>Python</option>
                                            <option value='C++'>C++</option>
                                            <option value='Java'>Java</option>

                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Total Marks' name='totalMarks'>
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Passing Marks' name='passingMarks'>
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="flex justify-end gap-2">
                                <button className="primary-outline-btn" type="button" onClick={()=>navigate("/admin/exams")}>Cancel</button>

                                <button className="primary-contained-btn" type="submit">Save</button>
                            </div>
                        </TabPane>
                        {params.id && (
                            <TabPane tab="Questions" key='2'>
                                <h1> Questions</h1>
                            </TabPane>
                        )}
                    </Tabs>
                </Form>
            )}
        </div>
    )
}

export default AddEditExams;