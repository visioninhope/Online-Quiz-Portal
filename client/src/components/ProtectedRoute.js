import React, { useEffect, useState } from 'react';
import { getUserInfo } from "../apicalls/users";
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice.js';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapset] = useState(false);
    const navigate = useNavigate();
    const userMenu = [
        {
            title: "Home",
            paths: ['/'],
            icon: <i className='ri-home-line'></i>,
            onclick: () => navigate('/')

        },
        {
            title: "Reports",
            paths: ['/reports'],
            icon: <i className='ri-bar-chart-line'></i>,
            onclick: () => navigate('/reports')
        },
        {
            title: "Profile",
            paths: ['/profile'],
            icon: <i className='ri-user-line'></i>,
            onclick: () => navigate('/profile')
        },
        {
            title: "Logout",
            paths: ['/logout'],
            icon: <i className='ri-logout-box-line'></i>,
            onclick: () => {
                localStorage.removeItem('token');
                navigate('/login');
            },
        }
    ];
    const adminMenu = [
        {
            title: "Home",
            paths: ['/'],
            icon: <i className='ri-home-line'></i>,
            onclick: () => navigate('/')

        },
        {
            title: "Exams",
            paths:["/admin/exams","/admin/exams/add"],
            icon:<i className='ri-file-list-line'></i>,
            onclick:()=>navigate('/admin/exams'),
        },
        {
            title: "Reports",
            paths: ['/reports'],
            icon: <i className='ri-bar-chart-line'></i>,
            onclick: () => navigate('/admin/reports')
        },
        {
            title: "Profile",
            paths: ['/profile'],
            icon: <i className='ri-user-line'></i>,
            onclick: () => navigate('/profile')
        },
        {
            title: "Logout",
            paths: ['/logout'],
            icon: <i className='ri-logout-box-line'></i>,
            onclick: () => {
                localStorage.removeItem('token');
                navigate('/login');
            },
        }
    ]
    const getUserData = async () => {
        try {
            const response = await getUserInfo();
            if (response.success) {
                dispatch(SetUser(response.data));
                if (response.data.isAdmin) {
                    setMenu(adminMenu);
                } else {
                    setMenu(userMenu);
                }
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

    const activeRoute = window.location.pathname;

    const getIsActiveOrNot=(paths)=>{
        if(paths.includes(activeRoute)){
            return true;
        }else{
            return false;
        }
    }
    return (
        <div className="layout">
            <div className="flex gap-1 w-full h-full h-100">
                <div className="sidebar">
                    <div className='menu'>
                    <div className='close'>
                        {!collapsed && <i class="ri-close-line"
                            onClick={() => setCollapset(true)}></i>}
                        {collapsed && <i class="ri-menu-line"
                            onClick={() => setCollapset(false)}></i>}

                    </div>

                        {menu.map((item, index) => {


                            return <div className={`menu-item ${getIsActiveOrNot(item.paths) && "active-menu-item"
                                }`} key={index} onClick={item.onclick}>
                                {item.icon}
                                {!collapsed && <span>{item.title}</span>}
                            </div>;
                        })}
                    </div>
                </div>
                <div className='body'>

                    <div className='header flex justify-between'>
                        <h1 className='text-2xl'>Online Quiz Portal</h1>
                        <div className=' flex gap-1 item-center'>
                            <i className='ri-user-line'></i>
                            <h1 className="text-md underline">{user?.name}</h1>
                        </div>
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