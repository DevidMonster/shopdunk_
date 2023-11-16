import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../component/client/Nav";
import CartTable from "../../component/client/CartTable";
import CheckoutInfo from "../../component/client/CheckoutInfo";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER } from "../../api/order";
import { resetCart } from "../../slice/cart.slice";
import { useNavigate } from "react-router-dom";
import { GET_DISCOUNT_BY_CODE } from "../../api/discount";

function Cart() {
    const cart = useSelector((state: any) => state.cartReducer)
    const user = useSelector((state: any) => state.authReducer.user)
    const [discountCode, setDiscountCode] = useState<any | null>(null)
    const [value, setValue] = useState("")
    const [code, setCode] = useState("")
    const { data, loading, error } = useQuery(GET_DISCOUNT_BY_CODE, { variables: { code: code } })
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [createOrder] = useMutation(CREATE_ORDER)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (code.length > 0 && error?.message) {
            message.error(error?.message);
        }
    }, [error, code]);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            form.setFieldsValue({
                customerName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            })
        }
    }, [form, user])

    useEffect(() => {
        if (data?.getDiscountCodeByCode && !loading) {
            setDiscountCode(data?.getDiscountCodeByCode)
        }
    }, [data, loading])

    const onFinish = async (values: any) => {
        const items = cart.items.map((item: any) => {
            return {
                id: parseInt(item.id),
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                productName: item.name,
                option: Object.values(item.option).join(' - ')
            }
        })
        values.userId = Object.keys(user).length > 0 ? parseInt(user.id) : null
        values.items = items
        values.totalAmount = discountCode?.code ? cart.totalPrice - (cart.totalPrice * discountCode.discountPercent) / 100 : cart.totalPrice
        setIsLoading(true)
        try {
            const response = await createOrder({
                variables: {
                    createOrderInput: {
                        ...values,
                    }
                }
            })
            dispatch(resetCart())
            navigate('/shoppingCart/completed/' + response.data.createOrder.id)
        } catch (error: any) {
            message.error(error.message, 5);
        }
        setIsLoading(false)
    }
    return (
        <div className="bg-[#f8f9fa]">
            {cart.items.length > 0 ?
                <Spin spinning={isLoading} delay={2000}>
                    <div className="bg-white ">
                        <div className="max-w-7xl mx-auto">
                            <Navbar title={'cart'} />
                        </div>
                    </div>
                    <div className="">
                        <Form
                            form={form}
                            className="w-full p-5 px-24 pb-28 flex gap-5 relative"
                            onFinish={onFinish}
                        >
                            <div className="flex-1">
                                <div className="bg-white rounded-lg p-3 shadow-md">
                                    <CartTable items={cart.items}></CartTable>
                                </div>
                                <CheckoutInfo />
                            </div>
                            <div className="bg-white w-[350px] p-4 h-[400px] sticky top-2 rounded-lg shadow-md">
                                <div className="flex">
                                    <Input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1" placeholder="Mã giảm giá" size="large" />
                                    <Button onClick={() => setCode(value)} danger type="primary" size="large">Áp dụng</Button>
                                </div>
                                <div className="grid grid-cols-2 gap-y-3 my-5">
                                    <h1 className="text-gray-400">Tổng phụ:</h1>
                                    <p className="font-bold text-right">{cart.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    {discountCode?.code && (
                                        <>
                                            <h1 className="text-gray-400">Áp dụng mã: {discountCode.code}</h1>
                                            <p className="font-bold text-right">Giảm {discountCode.discountPercent}%
                                                <Button shape="round" size="small" danger className="mx-2" onClick={() => {
                                                    setDiscountCode(null)
                                                    setCode("")
                                                }}>cancel</Button>
                                            </p>

                                        </>
                                    )}
                                    <h1 className="font-bold text-lg">Tổng cộng:</h1>
                                    <p className="font-bold text-blue-500 text-lg text-right">{
                                        discountCode?.code ?
                                            (cart.totalPrice - (cart.totalPrice * discountCode.discountPercent) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                            :
                                            (cart.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }</p>
                                </div>
                                <hr />
                                <div className="py-5">
                                    <Checkbox onChange={() => setIsChecked(prev => !prev)} checked={isChecked}>
                                        Tôi đã đọc và đồng ý với <a className="text-blue-500" href="/" target="_blank">điều khoản và điều kiện</a> của website
                                    </Checkbox>
                                </div>
                                <Button disabled={!isChecked} htmlType="submit" size="large" className={`w-full ${!isChecked ? 'bg-gray-300' : 'bg-blue-500'}`} type="primary">Tiến hành đặt hàng</Button>
                                <p className="text-red-500 mt-5">(*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.</p>
                            </div>
                        </Form>
                    </div>
                </Spin>
                : (
                    <div className="flex h-[600px] justify-center p-4">
                        <p>Giỏ hàng của bạn đang trống</p>
                    </div>
                )}
        </div>
    );
}

export default Cart;