import { Form, Input, Radio } from "antd";
import { useState } from "react";
import ReciveStore from "./ReciveStore";

function CheckoutInfo() {
    const [value, setValue] = useState<string>('Nhận tại cửa hàng');
    const [paymentMethod, setPaymentMethod] = useState<string>('Chuyển khoản ngân hàng');

    return (
        <div className="mt-8">
            <h1 className="font-bold text-2xl my-4">Thông tin thanh toán</h1>
            <div className="bg-white rounded-lg shadow-md p-5">
                <Form.Item
                    name='customerName'
                    rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}
                >
                    <Input size="large" name="customerName" placeholder="Nhập tên" />
                </Form.Item>
                <div className="flex gap-5 justify-between my-4">
                    <Form.Item
                        name='email'
                        rules={[{ required: true, message: 'Bạn phải nhập trường này' }, { type: 'email', message: 'Email không đúng định dạng' }]}
                        className="w-full"
                    >
                        <Input size="large" name="email" placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        name='phoneNumber'
                        className="w-full"
                        rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}
                    >
                        <Input size="large" name="phoneNumber" placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </div>
                <div>
                    <h1 className="font-bold text-md my-3">Hình thức nhận hàng</h1>
                        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                            <Radio value={'Nhận tại cửa hàng'}>Nhận tại cửa hàng</Radio>
                            <Radio value={'Giao tận nơi'}>Giao tận nơi</Radio>
                        </Radio.Group>
                    {value === 'Nhận tại cửa hàng' ? (
                        <div className="flex gap-5 justify-between mt-4 flex-wrap">
                            <ReciveStore/>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <Form.Item
                                name='address'
                                className="w-full"
                                rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}
                            >
                                <Input size="large" name="address" placeholder="Nhập địa chỉ cụ thể" />
                            </Form.Item>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 mt-5">
                <h1 className="font-bold text-md">Thông tin thanh toán</h1>
                <p className="text-gray-400 mb-4">Hãy chọn các phương thước thanh toán dưới đây</p>
                <Form.Item
                    name='paymentMethod'
                    className="w-full"
                    initialValue={paymentMethod}
                    rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}
                >
                    <Radio.Group className="grid grid-cols-2" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Radio className="border-[1px] border-gray-300 p-2 rounded-lg" value={'Thanh toán VNPay'}><p className="flex gap-3 items-center"><img src="https://shopdunk.com/Plugins/Payments.VNPay/logo.jpg" className="w-[40px] h-[40px] rounded-md" /><span>Thanh toán VNPay</span></p></Radio>
                        <Radio className="border-[1px] border-gray-300 p-2 rounded-lg" value={'Chuyển khoản ngân hàng'}><p className="flex gap-3 items-center"><img src="https://shopdunk.com/Plugins/Payments.VietQr/logo.jpg" className="w-[40px] h-[40px] rounded-md" /><span>Chuyển khoản ngân hàng</span></p></Radio>
                    </Radio.Group>
                </Form.Item>
            </div>
        </div>
    );
}

export default CheckoutInfo;