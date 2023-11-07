import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select, Upload, message, Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER, GET_USERS, UPDATE_USER } from "../../../api/user";
import { uploadImages } from "../../../api/upload";

function EditUser() {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_USER, { variables: { id: parseInt(id!) } })
    const [fileList, setFileList] = useState<any>([])
    const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER)
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        if (!loading && data) {
            form.setFieldsValue({
                userName: data.user?.userName,
                email: data.user?.email,
                phoneNumber: data.user?.phoneNumber,
                address: data.user?.address,
                role: data.user?.role,
                status: data.user?.status
            })
        }
    }, [data, form, loading])

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

    const onFinish = async (values: any) => {
        // console.log({ ...values, avatar: fileList.length > 0 ? [fileList[0].thumbUrl] : [] });
        const response = fileList.length > 0 ? await uploadImages(fileList) : [data?.user?.avatar];
        await updateUser({
            variables: {
                updateUserInput: { id: parseInt(id!), ...values, password: !values.passWord ? null : values.passWord, avatar: response[0] }
            }, refetchQueries: [{ query: GET_USERS }, { query: GET_USER, variables: { id: parseInt(id!) } }]
        });
        message.success('update success')
        navigate('/admin/users')
    };
    console.log(data?.user?.avatar);

    return <div className="w-[80%]">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
            <Image
                style={{ borderRadius: '20px' }}
                width={300}
                height={300}
                src={data?.user?.avatar}
            />
            <Form
                form={form}
                style={{ width: '70%', margin: '0 auto', flex: '1' }}
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
                    label="Change password"
                    name="password"
                    rules={[{ min: 6, message: 'The password must be at least 6 characters long!' }]}
                    hasFeedback
                >
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
                    <Button loading={updateLoading} className="bg-blue-400" type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>;
}

export default EditUser;