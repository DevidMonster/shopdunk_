/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Popover, TreeSelect, message } from "antd";
import { GET_CATEGORIES, UPDATE_CATEGORY } from "../../../../api/category";
import { useMutation, useQuery } from "@apollo/client";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

type IProps = {
    open: boolean;
    children: React.ReactNode;
    id: number | undefined;
    parentId: number | undefined;
    name: string | undefined;
    onOpen(e: React.MouseEvent): void;
}

function UpdateModal({ open, children, id, name, parentId, onOpen }: IProps) {
    const [form] = Form.useForm()
    const { data, loading } = useQuery(GET_CATEGORIES)
    const [updateCategory] = useMutation(UPDATE_CATEGORY)
    const [isPopoverVisible, setIsPopoverVisible] = useState(open || false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!loading && data?.categories && form) {
            setIsPopoverVisible(open)
            form?.setFieldsValue({
                name: name,
                categoryId: parentId,
            })
        }
    }, [data, form, loading, name, parentId, open])

    const renderCategories = (categories: { id: number, name: string, children: any[] }[] = []): DefaultOptionType[] | undefined => {
        if (categories.length === 0) return []
        const array = categories.filter((category) => category.id !== id);
        return array.map((category: { id: number, name: string, children: any[] }) => {
            // console.log(category.id, id,);
            return ({
                value: category.id,
                title: category.name,
                children: category.children.length > 0 ? renderCategories(category.children) : []
            })
        }) as unknown as DefaultOptionType[] || []
    }

    const onFinish = async (values: { name: string, categoryId: number }) => {
        setIsLoading(true)
        const res = await updateCategory({
            variables: {
                updateCategoryInput: {
                    id: id,
                    name: values.name,
                    parentId: parseInt(values.categoryId as unknown as string)
                }
            },
            refetchQueries: [{ query: GET_CATEGORIES }]
        })

        setIsLoading(false)
        setIsPopoverVisible(false)
        if(res?.data) {
            message.success('update category successfully')
            return
        }
        message.error('failed to update category')
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('error', errorInfo);
    };

    const handleClose = (e: React.MouseEvent) => {
        form?.setFieldsValue({
            name: name,
            categoryId: parentId,
        })
        onOpen(e)
    }

    return (
        <Popover
            open={isPopoverVisible}
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
                        <Form.Item
                            label="Category"
                            name={'categoryId'}
                            rules={[{ required: true, message: 'Please choose a category!' }]}
                        >
                            <TreeSelect
                                placeholder="Select a category"
                                style={{
                                    width: 160,
                                }}
                                // treeData={[
                                //     { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                // ]}
                                treeData={!loading ? renderCategories(data?.categories) : []}
                            />
                        </Form.Item>
                        <Button onClick={e => handleClose(e)} shape="round" size="middle" htmlType="button">Cancel</Button>
                        <Button loading={isLoading} className="bg-blue-400 text-white" shape="round" size="middle" htmlType="submit">Save</Button>
                    </Form>
                </div>
            )}
            trigger={'click'}
        >
            <div>{children}</div>
        </Popover>
    );
}

export default UpdateModal;