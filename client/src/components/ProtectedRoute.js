import React, { useEffect } from 'react';
import {getUserInfo} from "../apicalls/users";
import {message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {SetUser} from '../redux/usersSlice.js';

function ProtectedRoute({children}){
    const {user}=useSelector((state)=>state.users);
    const dispatch=useDispatch();
    const getUserData=async()=>{
        try {
            const response= await getUserInfo();
            if(response.success){
                message.success(response.message)
                dispatch(SetUser(response.data));
            }else{
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>
            {user?.name}
            {user?.email}
           {children}
        </div>
    )
}

export default ProtectedRoute;