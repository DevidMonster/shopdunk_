import { Button, message, Form, Upload, Input, InputNumber, UploadFile } from 'antd';
import TextEditor from '../../../component/TextEditor';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ProductOption from './component/ProductOption';
import ProductSku from './component/ProductSku';

type FieldType = {
    name: string;

    description: string;

    price: number;

    image: string;

    optionName: string;

    optionValue: string;
};

const AddProduct: React.FC = () => {
    const [optionData, setOptionData] = useState<any[]>([])
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [skuData, setSkuData] = useState<any[]>([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (optionData.length > 0) {
            setSkuData(getCartesianProduct(optionData).map((c: any) => typeof c === 'object' && c?.length >= 0 ? c.map((v: any) => v.value).join(' | ') : c.value))
        }
    }, [optionData])

    console.log(optionData);

    const getCartesianProduct = (options: any): any[] => {
        const formattedValues: any[] = options?.map((v: any) =>
            v?.optionValues?.map((a: any) =>
                ({ name: v?.optionName, value: a?.valueName }))).filter((i: any) => i !== undefined);
        if (formattedValues.length == 0) return [];
        return cartesian(...formattedValues);
    }

    const cartesian = (...a: any) => a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

    console.log(getCartesianProduct(optionData));

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
        setFileList(fileList);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return <div className="bg-white rounded-md my-5 p-5 w-[90%]">
        <h1 className="text-3xl font-bold">Create new Product</h1>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ width: '90%', margin: '20px 0' }}
            initialValues={{ remember: true }}
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
                name="images"
                label="Images"
                rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
            >
                <Upload
                    name="images"
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
            <ProductOption optionData={optionData} setOptionData={setOptionData} form={form} />
            <ProductSku form={form} skuData={skuData} />
            <Form.Item className='flex justify-end mt-3'>
                <Button type="primary" className='bg-[#1677ff]' htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default AddProduct;