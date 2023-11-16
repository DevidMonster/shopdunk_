import { useMutation } from "@apollo/client";
import { CREATE_CODE, GET_ALL_DISCOUNT_CODE } from "../../../api/discount";
import { Button, Form, Input, InputNumber, message } from "antd";

function CreateVoucher() {
    const [createVoucer, { loading }] = useMutation(CREATE_CODE)
    const [form] = Form.useForm()
    const handleFinish = async (values: any) => {
        console.log(values);
        try {
            const res = await createVoucer({
                variables: {
                    createDiscountCodeInput: {
                        ...values,
                    }
                },
                refetchQueries: [{ query: GET_ALL_DISCOUNT_CODE }]
            })

            if (res?.data?.createDiscountCode) {
                form.resetFields()
                message.success('Tạo thành công')
            }
        } catch (error: any) {
            message.error(error.message);
        }
    }
    return (
        <div className="bg-white rounded-md p-7 mb-3">
            <Form
                form={form}
                onFinish={handleFinish}
            >
                <div className="flex justify-around items-center">
                    <Form.Item
                        label="Voucher Code"
                        name={'code'}
                        rules={[{ required: true, message: 'Code is required' }]}
                    >
                        <Input placeholder="enter code"></Input>
                    </Form.Item>
                    <Form.Item
                        label="Discount Percent"
                        name="discountPercent"
                        initialValue={0}
                        rules={[{ required: true, message: 'Please input discount!' }, { type: 'number', min: 0, message: 'discount is greater than 0' }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} className='bg-blue-400' type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default CreateVoucher;