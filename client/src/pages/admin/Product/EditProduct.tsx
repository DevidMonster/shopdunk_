/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Form, Upload, Input, InputNumber, UploadFile, TreeSelect, Spin } from 'antd';
import TextEditor from '../../../component/TextEditor';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ProductOption from './component/ProductOption';
import ProductSku from './component/ProductSku';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from '../../../api/product';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_CATEGORIES } from '../../../api/category';
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

const EditProduct: React.FC = () => {
    const [optionError, setOptionError] = useState('')
    const { id } = useParams()
    const [optionData, setOptionData] = useState<any[]>([])
    const [fileListParent, setFileListParent] = useState<UploadFile[]>([]);
    const [skuData, setSkuData] = useState<any[]>([])
    const [updateProduct] = useMutation(UPDATE_PRODUCT)
    const { data: productData, loading: prdLoading, refetch } = useQuery(GET_PRODUCT, { variables: { id: parseInt(id!) } })
    const { data, loading } = useQuery(GET_CATEGORIES)
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
    }, [optionData, productData])

    useEffect(() => {
        setIsLoading(true)
        if (!prdLoading && productData.product) {
            form.setFieldsValue({
                ...productData.product,
                categoryId: productData.product.category.id,
            })
            if (productData?.product?.images && productData?.product?.images.length > 0) {
                console.log('data', productData.product);
                
                const images = productData?.product?.images?.map((image: { imageUrl: string }, index: number) => ({
                    uid: index.toString(),
                    name: 'image.png',
                    status: 'done',
                    url: image.imageUrl,
                }))
                form?.setFieldsValue({ images: images })
                console.log(images);
                
                setFileListParent(images)
            }
            if (productData?.product) {
                setSkuData([...productData.product.productSkus.map((c: any) => typeof c.skuValues === 'object' && c?.skuValues?.length >= 0 ?
                    {
                        skuName: c?.skuValues?.map((v: any) => v.optionValue.valueName).join(' | '),
                        status: c?.status,
                        price: c?.price,
                        quantity: c?.quantity,
                        sku: c?.sku,
                        images: c?.images?.map((image: { imageUrl: string }, index: number) => ({
                            uid: index.toString() + ' sub',
                            name: 'image.png',
                            status: 'done',
                            url: image.imageUrl,
                        }))
                    } : {
                        skuName: c.optionValue.valueName,
                        status: c?.skuValues?.status,
                        price: productData.product.price,
                        quantity: c?.skuValues?.quantity,
                        sku: c?.skuValues?.sku,
                        images: c?.images?.map((image: { imageUrl: string }, index: number) => ({
                            uid: index.toString(),
                            name: 'image.png',
                            status: 'done',
                            url: image.imageUrl,
                        }))
                    })])
            }
            setIsLoading(false)
            // setOptionData([...productData.product.options])
        }
    }, [productData, prdLoading, form])

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
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
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
        setFileListParent(fileList);
    };

    const onFinish = async (values: any) => {
        setIsLoading(true)
        const options = form?.getFieldValue('options')
        if (!options || options.length === 0) {
            setOptionError('You need to add a option')
            return;
        }

        if (fileListParent.length > 0) {
            try {
                const response = await uploadImages(fileListParent);
                values.images = response;
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        values.skuValues = await Promise.all(values.skuValues.map(async (value: any) => {
            // console.log(value);
            const res = value?.images?.length > 0 || value?.images !== undefined || value?.images?.fileList ? await uploadImages(value.images?.fileList || value.images) : []
            return {
                ...value,
                images: res
            }
        }));

        // values.images = []
        // values.skuValues = values?.skuValues?.map((sku: any) => ({ ...sku, images: [] })) || []
        values.options = form?.getFieldValue('options')
        console.log('Success:', values);
        const response = await updateProduct({
            variables: {
                updateProductInput: {
                    id: parseInt(id!),
                    ...values,
                }
            }
            ,
            refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT, variables: { id: parseInt(id!) } }, { query: GET_CATEGORIES }]
        })
        setIsLoading(false)
        if (response?.data) {
            message.success('Updated product')
            form?.resetFields()
            navigate('/admin/products')
            return
        }
        message.error('failed to update product')
    };

    const onFinishFailed = (errorInfo: any) => {
        const options = form?.getFieldValue('options')
        if (!options || options.length === 0) {
            setOptionError('You need to add a option')
        }
        console.log('Failed:', errorInfo);
    };


    return <div className="bg-white rounded-md my-10 p-5 w-[90%]">
        <h1 className="text-3xl font-bold">Update Product</h1>
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
                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input discount!' }, { type: 'number', min: 0, message: 'discount is greater than 0' }]}
                    hasFeedback
                >
                    <InputNumber
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                    />
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
                    name='images'
                    label="Images"
                    initialValue={fileListParent}
                    rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
                >
                    <Upload
                        beforeUpload={handleBeforeUpload}
                        customRequest={(option) => {
                            setTimeout(() => option.onSuccess!(option?.file), 0)
                        }}
                        onChange={handleOnChange}
                        listType="picture-circle"
                        fileList={fileListParent}
                    >
                        <Button className='border-[0]' icon={<UploadOutlined />}></Button>
                    </Upload>
                </Form.Item>
                <ProductOption error={optionError} setOptionData={setOptionData} form={form} />
                <ProductSku form={form} skuData={skuData} />
                <Form.Item className='flex justify-end mt-3'>
                    <div className='w-[30%] flex gap-3'>
                        <Button onClick={() => {
                            form?.resetFields()
                            navigate('/admin/products')}
                        } type="text" className='border-[1px] border-black' htmlType="button">
                            Cancel
                        </Button>
                        <Button type="primary" className='bg-[#1677ff]' htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Spin>
    </div>;
}

export default EditProduct;