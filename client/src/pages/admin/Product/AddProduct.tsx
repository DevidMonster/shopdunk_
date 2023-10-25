/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Form, Upload, Input, InputNumber, UploadFile, TreeSelect, Spin, Result } from 'antd';
import TextEditor from '../../../component/TextEditor';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ProductOption from './component/ProductOption';
import ProductSku from './component/ProductSku';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, GET_PRODUCTS } from '../../../api/product';
import { useNavigate } from 'react-router-dom';
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../../api/category';
import { uploadImages } from '../../../api/upload';
import { DefaultOptionType } from 'antd/es/select';

type FieldType = {
    name: string;

    description: string;

    price: number;

    image: string;

    optionName: string;

    optionValue: string;
};

const AddProduct: React.FC = () => {
    const [optionError, setOptionError] = useState('')
    const [optionData, setOptionData] = useState<any[]>([])
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [skuData, setSkuData] = useState<any[]>([])
    const [createProduct] = useMutation(CREATE_PRODUCT)
    const { data, loading } = useQuery(GET_CATEGORIES)
    const [createCategory, { loading: createLoading }] = useMutation(CREATE_CATEGORY)
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const renderCategories = (categories: { id: number, name: string, children: any[] }[] = []): DefaultOptionType[] | undefined => {
        if (categories.length === 0) return []
        return categories.map((category: { id: number; name: string; children: any[]; }) => ({
            value: category.id,
            title: category.name,
            children: category.children.length > 0 ? renderCategories(category.children) : []
        })) as unknown as DefaultOptionType[] || []
    }

    useEffect(() => {
        if (optionData.length > 0) {
            setSkuData(getCartesianProduct(optionData).map((c: any) => typeof c === 'object' && c?.length >= 0 ? { skuName: c.map((v: any) => v.value).join(' | ') } : { skuName: c.value }))
        } else {
            setSkuData([])
        }
    }, [optionData])

    // console.log(skuData);


    const getCartesianProduct = (options: any): any[] => {
        const formattedValues: any[] = options?.map((v: any) =>
            v?.optionValues?.map((a: any) =>
                ({ name: v?.optionName, value: a?.valueName }))).filter((i: any) => i !== undefined);
        if (formattedValues.length == 0) return [];
        return cartesian(...formattedValues);
    }

    const cartesian = (...a: any) => a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

    // console.log(getCartesianProduct(optionData));

    const handleBeforeUpload = (file: UploadFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = (file.size || 0) / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }: { fileList: UploadFile[] }) => {
        form?.setFieldValue('images', fileList)
        setFileList(fileList)
    };

    const onFinish = async (values: any) => {
        setIsLoading(true)
        const options = form?.getFieldValue('options')
        if (!options || options.length === 0) {
            setOptionError('You need to add a option')
        }
        // values.images = []
        // values.skuValues = values?.skuValues?.map((sku: any) => ({ ...sku, images: [] })) || []
        if (fileList.length > 0) {
            try {
                const response = await uploadImages(fileList);
                values.images = response;
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        values.skuValues = await Promise.all(values.skuValues.map(async (value: any) => {
            const res = value.images?.fileList ? await uploadImages(value.images?.fileList) : []
            return {
                ...value,
                images: res
            }
        }));
        console.log('Success:', values);
        const response = await createProduct({
            variables: {
                createProductInput: {
                    ...values,
                }
            }
            ,
            refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_CATEGORIES }]
        })
        setIsLoading(false)

        if (response?.data) {
            message.success('add product successfully')
            navigate('/admin/products')
            return
        }
        message.error('failed to add product')
    };

    const onFinishFailed = (errorInfo: any) => {
        const options = form?.getFieldValue('options')
        if (!options || options.length === 0) {
            setOptionError('You need to add a option')
        }
        console.log('Failed:', errorInfo);
    };


    return <div className="bg-white rounded-md my-10 p-5 w-[90%]">
        {!loading && data?.categories.length > 0 ? (

            <>
                <h1 className="text-3xl font-bold">Create new Product</h1>
                <Spin spinning={isLoading} delay={200}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        style={{ width: '90%', margin: '20px 0' }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Product Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            initialValue={1}
                            name={'categoryId'}
                            rules={[{ required: true, message: 'Please choose a category!' }]}
                        >
                            <TreeSelect
                                placeholder="Select a category"
                                style={{
                                    width: 300,
                                }}
                                // treeData={[
                                //     { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                // ]}
                                treeData={!loading ? renderCategories(data?.categories) : []}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input price!' }, { type: 'number', min: 0, message: 'price is greater than 0' }]}
                            hasFeedback
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }, { min: 20, message: 'Nhập ít nhất 20 ký tự' }]}
                            hasFeedback
                        >
                            <TextEditor />
                        </Form.Item>
                        <Form.Item
                            name={'images'}
                            label="Images"
                            rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
                        >
                            <Upload
                                beforeUpload={handleBeforeUpload}
                                customRequest={(option) => {
                                    setTimeout(() => option.onSuccess!(option?.file), 0)
                                }}
                                onChange={handleOnChange}
                                listType="picture-circle"
                                fileList={fileList}
                            >
                                <Button className='border-[0]' icon={<UploadOutlined />}></Button>
                            </Upload>
                        </Form.Item>
                        <ProductOption error={optionError} setOptionData={setOptionData} form={form} />
                        <ProductSku form={form} skuData={skuData} />
                        <Form.Item className='flex justify-end mt-3'>
                            <Button type="primary" className='bg-[#1677ff]' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </>
        ) : (
            <Result
                status="warning"
                className='w-full'
                title="You must have a default category, add now..."
                extra={
                    <Button className='bg-blue-400' loading={createLoading} onClick={async () => {
                        const res = await createCategory({
                            variables: {
                                createCategoryInput: {
                                    name: 'Danh mục mặc định'
                                }
                            },
                            refetchQueries: [{ query: GET_CATEGORIES }]
                        })

                        if (res?.data) {
                            message.success('created new category')
                            return
                        }
                        message.error('create failed')
                    }} type="primary" key="console">
                        Add Default Category
                    </Button>
                }
            />
        )}
    </div>;
}

export default AddProduct;