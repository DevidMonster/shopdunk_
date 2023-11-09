import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDER } from "../../api/order";
import { Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";

function ShoppingCart({ link }: { link: string }) {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_ORDER, { variables: { id: parseInt(id!) } })
    console.log(data, loading);

    return (
        <div className="bg-[#f8f9fa] p-5 flex flex-col items-center">
            <div className="w-[450px]" ><Button type="link" icon={<LeftOutlined />}><Link to={link || '#'} className="text-blue-500">Get Back</Link></Button></div>
            <div className="bg-white rounded-lg w-[450px] shadow-md p-5">
                <h1 className="text-2xl text-center mb-10">Chi tiết đơn hàng</h1>
                {!loading && data?.order ?
                    <div>
                        <div>
                            <ul>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Mã hóa đơn:</label>
                                    <span className="font-semibold text-right">#{data?.order.id}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Ngày đặt hàng:</label>
                                    <span className="font-semibold text-right">{data?.order.createdAt.slice(0, 10).replace(/-/g, '/')}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Tình trạng:</label>
                                    <span className="text-green-500 font-bold text-right">{data?.order.status}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Tên khách hàng:</label>
                                    <span className="font-semibold text-right">{data?.order.customerName}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Số điện thoại:</label>
                                    <span className="font-semibold text-right">{data?.order.phoneNumber}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Email:</label>
                                    <span className="font-semibold text-right">{data?.order.email}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Địa chỉ nhận hàng:</label>
                                    <span className="font-semibold text-sm  text-right">{data?.order.address}</span>
                                </li>
                            </ul>
                        </div>
                        <hr className="my-5" />
                        <div>
                            <ul>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Phương thức thanh toán:</label>
                                    <span className="font-semibold text-right">{data?.order.paymentMethod}</span>
                                </li>
                                <li className="flex justify-between items-center mb-2">
                                    <label className="min-w-[40%] text-gray-400">Tình trạng thanh toán:</label>
                                    <span className="text-green-500 font-bold text-right">{data?.order.paymentStatus}</span>
                                </li>
                            </ul>
                        </div>
                        <hr className="my-5" />
                        <div>
                            <label className="text-gray-400">Sản phẩm</label>
                            <div>
                                {data?.order.orderDetails.map((item: any, index: number) => (
                                    <div key={index} className="border-[1px] border-gray-400 rounded-md p-2 my-2 flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <img className="w-[60px] h-[60px]" src={item.image} alt={item.productName} />
                                            <div>
                                                <h1 className="font-bold">{item.productName} <span className="text-sm text-gray-400 font-normal">({item.option})</span></h1>
                                                <p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-500">SL: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="flex justify-between items-center mb-2">
                            <label className="min-w-[40%] text-gray-400">Tổng số tiền đã đặt hàng:</label>
                            <span className="text-blue-500 text-2xl font-bold text-right">{data?.order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                        {link == '/admin/order' ?
                            <></>
                            :
                            <div className="mt-10 flex justify-between gap-3">
                                <Button size="large" type="primary" className="bg-blue-500 w-full"><Link to={'/'}>Tiếp tục mua hàng</Link></Button>
                                <Button size="large" type="primary" className="bg-blue-500 w-full"><Link to={'#'}>Thanh toán</Link></Button>
                            </div>
                        }
                    </div>
                    : (
                        <Spin></Spin>
                    )}
            </div>
        </div>
    );
}

export default ShoppingCart; 