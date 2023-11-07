import { useMutation, useQuery } from '@apollo/client';
import { Modal, Form, Input, Button, Select, Spin, message } from 'antd';
import { useState, useEffect } from 'react';
import { GET_USER, UPDATE_USER } from '../../api/user';
type IProps = {
    id: string;
    children: React.ReactNode;
    onRefetch: () => void;
};

type FieldType = {
    userName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    role?: string;
    status?: boolean | string;
};

function EditAccount({ id, children, onRefetch }: IProps) {
    const [open, setOpen] = useState(false);
    const { data, loading } = useQuery(GET_USER, { variables: { id: parseInt(id!) } });
    const [updateUser] = useMutation(UPDATE_USER);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setOpen(true);
    };
    console.log('account', data);

    useEffect(() => {
        if (!loading && data?.user) {
            form.setFieldsValue({
                userName: data?.user.userName,
                email: data?.user.email,
                phoneNumber: data?.user.phoneNumber || undefined,
                address: data?.user.address || undefined,
                role: data?.user.role,
                status: data?.user.status
            });
        }
    }, [loading, data, form]);

    const handleUpdate = async (value: any) => {
        setConfirmLoading(true);

        await updateUser({
            variables: {
                updateUserInput: {
                    id: parseInt(id),
                    ...value,
                }
            },
            refetchQueries: [{ query: GET_USER, variables: { id: parseInt(id) } }]
        })
            .then(() => {
                setConfirmLoading(false);
                message.success('Update Account Success')
                onRefetch()
                setOpen(false)
            });
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <span onClick={showModal}>{children}</span>
            <Modal
                title={form?.getFieldValue('userName') || 'Account'}
                open={open}
                footer={() => <></>}
                onCancel={handleCancel}
            >
                {confirmLoading || (loading && !data) ? (
                    <div className='flex justify-center items-center h-3'>
                        <Spin />
                    </div>
                ) : (
                    <Form
                        form={form}
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={handleUpdate}
                        autoComplete='off'
                    >
                        <Form.Item<FieldType>
                            label='Tên người dùng'
                            name='userName'
                            rules={[{ required: true, message: 'Hãy nhập tên cho tài khoản!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label='Email'
                            name='email'
                            rules={[
                                { required: true, message: 'Hẫy nhập email của bạn!' },
                                { type: 'email', message: 'Hãy nhập email hợp lệ' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType> label='Số điện thoại' name='phoneNumber'>
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType> label='Địa chỉ' name='address'>
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label='Vai trò'
                            name='role'
                            rules={[{ required: true, message: 'Hãy chọn vai trò!' }]}
                        >
                            <Select value='member'>
                                <Select.Option value='member'>Member</Select.Option>
                                <Select.Option value='admin'>Admin</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item<FieldType>
                            label='Trạng thái'
                            name='status'
                            rules={[{ required: true, message: 'Chọn trạng thái cho tài khoản!' }]}
                        >
                            <Select value={true}>
                                <Select.Option value={true}>Hoạt động</Select.Option>
                                <Select.Option value={false}>Không hoạt động</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type='primary' className='bg-blue-400' loading={loading} htmlType='submit'>
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
}

export default EditAccount;
