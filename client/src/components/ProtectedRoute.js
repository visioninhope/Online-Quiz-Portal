import React, { useEffect } from 'react';
import { getUserInfo } from "../apicalls/users";
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice.js';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const getUserData = async () => {
        try {
            const response = await getUserInfo();
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        getUserData()
    }, []);

    return (
        <div className="layout">
            <div className="flex gap-2 w-full h-full h-100">
                <div className="sidebar">
                    <div className='close'>
                    <i class="ri-close-line"></i>
                    </div>
                    <h1 className='text-xl text-white'>Sidebar</h1>
                </div>
                <div className='body'>

                    <div className='header flex justify-between'>
                        <h1 className='text-2xl'>Online Quiz Portal</h1>
                        <h1 className="text-xl text-white">{user?.name}</h1>
                    </div>

                    <div className='content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProtectedRoute;