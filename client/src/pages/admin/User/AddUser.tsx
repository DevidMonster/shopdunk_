import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_USERS } from "../../../api/user";
import { uploadImages } from "../../../api/upload";


function AddUser() {
    const [fileList, setFileList] = useState<any>([])
    const [createUser, { loading }] = useMutation(CREATE_USER)
    const navigate = useNavigate()

    const dummyRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleBeforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }: any) => {
        setFileList(fileList)
    }

    const validatePhoneNumber = (_, value: any) => {
        const phoneRegex = /^0\d{9}$/; // Regex để kiểm tra số điện thoại bắt đầu bằng số 0 và có tổng 10 số
        if (value && !phoneRegex.test(value)) {
            return Promise.reject('Please enter a valid phone number!');
        }
        return Promise.resolve();
    };


    const onFinish = async (values: any) => {
        // console.log({ ...values, avatar: fileList.length > 0 ? [fileList[0].thumbUrl] : [] });
        const response = fileList.length > 0 ? await uploadImages(fileList) : ["https://res.cloudinary.com/dpwto5xyv/image/upload/v1692587346/learnECMAS/t%E1%BA%A3i_xu%E1%BB%91ng_zdwt9p.png"];
        await createUser({ variables: { createUserInput: { ...values, avatar: response[0] } }, refetchQueries: [{ query: GET_USERS }] });
        message.success('created successfully')
        navigate('/admin/users')
    };

    return (<div className="w-[80%]">
        <h1 className="text-2xl font-bold">Create New</h1>
        <Form
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', }, { type: 'email', message: 'Please enter a valid email address!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                hasFeedback
                label="Phone"
                name="phoneNumber"
                rules={[{ validator: validatePhoneNumber }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                hasFeedback
                label="Address"
                name="address"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'The password must be at least 6 characters long!' }]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="ConfirmPassword"
                name="confirmPassword"
                dependencies={['passWord']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('passWord') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}          >
                <Input.Password />
            </Form.Item>
            <Form.Item
                initialValue={'member'}
                label="Role"
                name="role"
            >
                <Select
                    style={{
                        width: 200,
                    }}
                    options={[
                        {
                            value: 'member',
                            label: 'member',
                        },
                        {
                            value: 'contributor',
                            label: 'contributor',
                        },
                        {
                            value: 'admin',
                            label: 'admin',
                        }
                    ]}
                />
            </Form.Item>
            <Form.Item
                initialValue={true}
                label="Status"
                name="status"
            >
                <Select
                    style={{
                        width: 200,
                    }}
                    options={[
                        {
                            value: true,
                            label: 'ACTIVE',
                        },
                        {
                            value: false,
                            label: 'DISIBLED',
                        }
                    ]}
                />
            </Form.Item>
            <Form.Item
                label='Choose avatar'
            >
                <Upload
                    name="avatar"
                    beforeUpload={handleBeforeUpload}
                    customRequest={dummyRequest}
                    onChange={handleOnChange}
                    listType="picture"
                    fileList={fileList}
                >
                    {fileList.length === 1 ? "" : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                </Upload>
            </Form.Item>
            <Form.Item style={{ margin: '20px 0' }}>
                <Button loading={loading} className='bg-blue-400' type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    </div>);
}

export default AddUser;