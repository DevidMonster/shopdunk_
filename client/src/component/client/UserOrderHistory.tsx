import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../api/order";
import { Button, Card, Spin } from "antd";
import { Link } from "react-router-dom";

type IProps = {
    userId?: number,
}

function UserOrderHistory({ userId }: IProps) {
    const { data, loading } = useQuery(GET_ORDERS, { variables: { userId: userId } })
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
            {!loading && data?.orders ? (
                data.orders.map((order: any, index: number) => (
                    <Card key={index} className="mx-auto w-full" title={"Mã hóa đơn: #" + order.id} extra={<Button type="primary" className="bg-blue-500"><Link to={"/shoppingCart/completed/" + order.id}>Detail</Link></Button>}>
                        <ul>
                            <li className="flex justify-between items-center mb-2">
                                <label className="min-w-[40%] text-gray-400">Ngày đặt hàng:</label>
                                <span className="font-semibold text-right">{order.createdAt.slice(0, 10).replace(/-/g, '/')}</span>
                            </li>
                            <li className="flex justify-between items-center mb-2">
                                <label className="min-w-[40%] text-gray-400">Tình trạng:</label>
                                <span className="text-green-500 font-bold text-right">{order.status}</span>
                            </li>
                            <li className="flex justify-between items-center mb-2">
                                <label className="min-w-[40%] text-gray-400">Tình trạng thanh toán:</label>
                                <span className="text-green-500 font-bold text-right">{order.paymentStatus}</span>
                            </li>
                            <li className="flex justify-between items-center mb-2">
                                <label className="min-w-[40%] text-gray-400">Tổng số tiền đã đặt hàng:</label>
                                <span className="text-blue-500 text-lg font-bold text-right">{order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </li>
                        </ul>
                    </Card>
                ))
            ) : (
                <Spin></Spin>
            )}
        </div>
    );
}

export default UserOrderHistory;