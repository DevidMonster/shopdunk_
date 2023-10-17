import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';
import UploadImage from './UploadImage';

interface IProps {
    form: FormInstance<unknown>;
    skuData: any[];
}

function ProductSku({ skuData, form }: IProps) {
    useEffect(() => {
        // Initialize the 'skuValues' field with the required structure
        form.setFieldsValue({
            skuValues: skuData.map((value) => ({ 'sku_name': value, status: true }))
        });
    }, [skuData, form]);

    return skuData.length === 0 ? null : (
        <div className='px-[40px]'>
            <h2 className='font-bold text-xl'>Product Variations</h2>
            <Form.List name={'skuValues'}>
                {(fields) => fields.map(({ name, key, fieldKey }) => (
                    <div key={key} className='p-5 m-5 border-[1px]'>
                        {/* <Form.Item hidden label={skuData[key]} name={[name, 'sku_name']} fieldKey={fieldKey}>
                            <Input />
                        </Form.Item> */}
                        <h3 className='font-semibold my-3'><span className='text-gray-500'>Variation name: </span>{skuData[key]}</h3>
                        <Form.Item
                            label="SKU"
                            name={[name, "sku"]}
                            rules={[{ required: true, message: 'Please input SKU!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name={[name, 'price']}
                            rules={[{ required: true, message: 'Please input price!' }, { type: 'number', min: 0, message: 'price is greater than 0' }]}
                            hasFeedback
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Quantity"
                            name={[name, 'quantity']}
                            rules={[{ required: true, message: 'Please input quanity!' }, { type: 'number', min: 0, message: 'quanity is greater than 0' }]}
                            hasFeedback
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            initialValue={true}
                            label="Status"
                            name={[name, 'status']}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                options={[
                                    {
                                        value: true,
                                        label: 'In Stock',
                                    },
                                    {
                                        value: false,
                                        label: 'Out of Stock',
                                    }
                                ]}
                            />
                        </Form.Item>
                        <UploadImage name={name} />
                    </div>
    ))
}
            </Form.List >
        </div >
    );
}

export default ProductSku;
