import { Button, Form, Input, Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GET_PRODUCTS } from "../../api/product";
import { useQuery } from "@apollo/client";
import Item from "../../component/client/Item";

function SearchResultPage() {
    const [q] = useSearchParams()
    const currentSearch = q.get('q')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [form] = Form.useForm()
    const { data, loading } = useQuery(GET_PRODUCTS, { variables: { q: search, page: currentPage } })
    const navigate = useNavigate()

    console.log(data);

    useEffect(() => {
        if (currentSearch && currentSearch !== '') {
            setSearch(currentSearch)
        }
        setCurrentPage(parseInt(q.get('page')!) || 1)
        form?.setFieldValue('search', currentSearch)
    }, [currentSearch, form, q])

    const onFinish = async (values: any) => {
        console.log(values);
        navigate('/search?q=' + values.search)
    }

    const onFinishFailed = async (error: any) => {
        console.log(error);

    }

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page);
        navigate('/search?q=' + search + '&page=' + page)
    };

    return (
        <div className="py-5 px-52 bg-[#f8f9fa]">
            <h1 className="text-center text-2xl font-bold text-black">Tìm kiếm</h1>
            <div className="p-6 my-4 w-[100%] h-52 mx-auto shadow-md bg-white rounded-lg">
                <label>Tìm từ khóa</label>
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name={'search'}
                        rules={[{ required: true, message: 'Hãy nhập từ khóa để tìm kiếm' }]}
                    >
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} size="large" name="search" placeholder="Nhập từ khóa"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" htmlType="submit" className="block mx-auto bg-blue-400 text-white mt-6">Tìm kiếm</Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                {currentSearch != '' && search != '' ? (
                    !loading && data?.products ?
                        <div>
                            <p className="my-2">{data?.products?.data.length || 0} kết quả tìm kiếm được theo từ khóa "{search}"</p>
                            <Item items={data?.products?.data} />
                            <div className="text-center py-10">
                                <Pagination onChange={onChange} pageSize={data?.products?.pageSize} defaultCurrent={data?.products?.currentPage} total={data?.products?.totalPages} />
                            </div>
                        </div>
                        : (
                            <Spin />
                        )

                ) : (
                    <div>
                        <p className="text-red-400 my-2">Không có từ khóa để tìm kiếm</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResultPage;