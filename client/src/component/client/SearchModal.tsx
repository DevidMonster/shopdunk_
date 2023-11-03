import { useQuery } from "@apollo/client";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { GET_PRODUCTS } from "../../api/product";
import { Link, useNavigate } from "react-router-dom";

type IProps = {
    children: React.ReactNode
}

function SearchModal({ children }: IProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const { data, loading } = useQuery(GET_PRODUCTS, { variables: { q: search, page: null } })
    const navigate = useNavigate()

    return (
        <>
            <Button type="text" onClick={() => setOpen(true)}>
                {children}
            </Button>
            <Modal
                title="Search"
                style={{ top: 10 }}
                width={'50%'}
                open={open}
                onCancel={() => setOpen(false)}
                footer={() => <></>}
            >
                <Form
                    onFinish={() => {
                        setOpen(false);
                        navigate('/search?q=' + search)
                    }}
                >
                    <Input placeholder="Search here" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Form>
                {search !== '' ?
                    !loading && data?.products ? (
                        data?.products?.data.map((product: any, index: number) => (
                            <Link to={'/products/' + product.slug} className="flex products-center justify-between mb-2" key={index}>
                                <div className="flex gap-2 items-center">
                                    <img className="w-[60px] h-[60px]" src={product.images[0].imageUrl} alt={product.name} />
                                    <div>
                                        <h1 className="font-bold">{product.name} </h1>
                                        <p>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <Spin></Spin>
                    )
                    : (
                        <></>
                    )}
            </Modal>

        </>
    );
}

export default SearchModal;