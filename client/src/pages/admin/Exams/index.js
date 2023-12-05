import React from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Exams() {
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex justify-between mt-2">
                <PageTitle title="Exams" />

                <button className="primary-outline-btn flex item-center"
                onClick={()=>navigate('/admin/exams/add')}>
                    <i className="ri-add-line"></i>
                    Add Exams
                </button>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default Exams;