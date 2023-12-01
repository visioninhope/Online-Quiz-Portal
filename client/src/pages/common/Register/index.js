import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";

function Register() {
    const onFinish = async (values) => {
        try {
            const response = await registerUser(values);
            if (response.success) {
                message.success(response.message);

            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <div className="flex justify-center item-center h-screen w-screen">
            <div className="card w-400 p-3">
                <div className="flex flex-col">
                    <h1 className="text-2xl">Register</h1>
                    <div className="divider"></div>
                    <Form layout="vertical" className="mt-2" onFinish={onFinish}>
                        <Form.Item name="name" label="Name">
                            <input type="text" />
                        </Form.Item>
                        <Form.Item name="email" label="Email">
                            <input type="text" />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <input type="password" />
                        </Form.Item>

                        <div className="flex flex-col gap-2">
                            <button type="submit" className="primary-contained-btn mt-2 w-100">Login</button>
                            <Link to='/login' className="underline">Already a member? Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;