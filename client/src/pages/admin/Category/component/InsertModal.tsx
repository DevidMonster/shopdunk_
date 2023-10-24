import { Button, Form, Input, Popover, message } from "antd";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../../../../api/category";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type IProps = {
    children: React.ReactNode;
    parentId: number | undefined;
}

function InsertModal({ children, parentId }: IProps) {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [createCategory] = useMutation(CREATE_CATEGORY)
    const [isPopoverVisible, setPopoverVisible] = useState(false)

    const onFinish = async (values: { name: string }) => {
        console.log('success', values, parentId);
        setIsLoading(true)
        const response = await createCategory({
            variables: {
                createCategoryInput: {
                    ...values,
                    parentId: parseInt(parentId! as unknown as string)
                }
            },
            refetchQueries: [{ query: GET_CATEGORIES }]
        })

        setIsLoading(false)
        if (response?.data) {
            form?.resetFields()
            message.success('Create new category')
            setPopoverVisible(false)
            return
        }
        message.error('failed to create category')
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('error', errorInfo);
    };

    return (
        <Popover
            open={isPopoverVisible}
            onOpenChange={() => form?.resetFields()}
            content={() => (
                <div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 25 }}
                        style={{ width: '92%', margin: '20px 0' }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Category name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your category name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button loading={isLoading} className="bg-blue-400 text-white" shape="round" size="middle" htmlType="submit">Add</Button>
                    </Form> 
                </div>
            )}
            trigger={'click'}
        >
            <div onClick={() => setPopoverVisible(prev => !prev)}>{children}</div>
        </Popover>
    );
}

export default InsertModal;