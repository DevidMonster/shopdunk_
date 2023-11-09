import { Button } from "antd";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../slice/cart.slice";

type IProps = {
    items: unknown[]
}

function ItemsInCart({ items = [] }: IProps) {
    const dispatch = useDispatch()
    const handleRemoveItemInCart = (id: number) => {
        dispatch(removeFromCart({ id }))
    }
    return (
        <div>
            {items.length > 0 ? items.map((item: any, index: number) => (
                <div className="flex items-center justify-between mb-2" key={index}>
                    <div className="flex gap-2 items-center">
                        <img className="w-[60px] h-[60px]" src={item.image} alt={item.name} />
                        <div>
                            <h1 className="font-bold">{item.name} <span className="text-sm text-gray-400 font-normal">({Object.values(item.option).join(' - ')})</span></h1>
                            <p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} x {item.quantity}</p>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => handleRemoveItemInCart(item.id)} shape="circle" icon={<BiTrash />}>
                        </Button>
                    </div>
                </div>
            )) : (
                <div className="flex justify-center items-center p-2">
                    <p>Giỏ hàng của bạn đang trống</p>
                </div>
            )}
            <div>
                <Link to={'/cart'}><Button danger size="large" className="w-full">View Cart</Button></Link>
            </div>
        </div>
    );
}

export default ItemsInCart;