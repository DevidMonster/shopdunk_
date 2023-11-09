import { Button, Popconfirm, Table, message } from "antd";
import Column from "antd/es/table/Column";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { removeFromCart, updateItem } from "../../slice/cart.slice";

type IProps = {
    items: any[]
}

function CartTable({ items = [] }: IProps) {
    items = items.map((item: any, index: number) => {
        return {
            ...item,
            key: index
        }
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, id: string, maxQuantity: number) => {
        const value = e.target.value
        if (e.target.value === '') {
            return dispatch(updateItem({ id: id, quantity: '' }));
         }
        if (Number(value) <= maxQuantity && Number(value) > 0) {
            dispatch(updateItem({ id: id, quantity: Number(value) }));
        }
    }

    const handleRemoveItemInCart = (id: number) => {
        dispatch(removeFromCart({ id }))
    }

    const dispatch = useDispatch()
    return (
        <Table dataSource={items} pagination={{ pageSize: 5 }}>
            <Column
                title='Ảnh sản phẩm'
                fixed='left'
                dataIndex='image'
                key='image'
                width={150}
                render={(image) => <img src={image} className='w-[3rem] h-[3rem]' />}
            />
            <Column title='Tên' dataIndex='name' key='name' width={150}
                render={(_, record: any) => (
                    <h1 className="font-bold">{record.name} <span className="text-sm block text-gray-400 font-normal">({Object.values(record.option).join(' - ')})</span></h1>
                )}
            />
            <Column title='Giá' dataIndex='price' key='price' width={150}
                render={(price) => <p className="font-bold">{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>}
            />
            {/* <Column title='Danh mục lớn' dataIndex='category' key='category' width={150} /> */}
            <Column title='Số lượng' dataIndex='quantity' key='quantity' width={150}
                render={(_, record: any) => (<div className="flex flex-wrap">
                    <input
                        onChange={(e) => handleInput(e, record.id, record.maxQuantity)}
                        type='text'
                        value={record.quantity}
                        className={`outline-none border ${record.price == '' ? 'border-red-500' : ''
                            } pl-[10px] ml-[10px] input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]`}
                    />
                    <div className='flex flex-col'>
                        <button
                            onClick={() =>
                                dispatch(
                                    updateItem({
                                        id: record.id,
                                        quantity:
                                            record.quantity == record.maxQuantity &&
                                                record.quantity + 1 >= record.maxQuantity
                                                ? record.quantity
                                                : record.quantity + 1
                                    })
                                )
                            }
                            type='button'
                            className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                        >
                            +
                        </button>
                        <button
                            onClick={() =>
                                dispatch(
                                    updateItem({
                                        id: record.id,
                                        quantity:
                                            record.quantity == 0 && record.quantity - 1 <= 0
                                                ? record.quantity
                                                : record.quantity - 1
                                    })
                                )
                            }
                            type='button'
                            className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                        >
                            -
                        </button>
                    </div>
                    <p className='text-red-500 w-full'>{record.quantity == '' ? 'Bạn phải nhập số lượng' : ''}</p>
                </div>)
                }
            />
            <Column
                width={150}
                title='Chức năng '
                key='id'
                dataIndex={'id'}
                render={(id) => (
                    <>
                        <Popconfirm
                            title="Are you sure to delete this product?"
                            onCancel={() => message.error('Cancel')}
                            okButtonProps={{ className: 'bg-blue-400' }}
                            onConfirm={() => handleRemoveItemInCart(id)}
                        >
                            <Button className='mr-2 border-0' icon={<BiTrash />}></Button>
                        </Popconfirm>
                    </>
                )}
            />
        </Table>
    );
}

export default CartTable;