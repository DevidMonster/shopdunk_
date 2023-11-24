import { SearchOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Table from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Column from 'antd/es/table/Column';
// import ActionTable from '../../../components/ActionTable/ActionTable';
// import FilterIcon from '../../../components/Icons/FilterIcon';
import { Button, Layout, Popconfirm, message, theme } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../../../api/product';
import { GET_CATEGORIES } from '../../../api/category';

const ProductAdmin = () => {
    const [valueSearch, setValueSearch] = useState<string>('');
    const [collapsed, setCollapsed] = useState(true);
    const { data, loading } = useQuery(GET_PRODUCTS, { variables: { q: '' } });
    const [deleteProduct] = useMutation(DELETE_PRODUCT)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = data?.products?.data?.map((item: any, index: number) => ({ ...item, key: index })) || [];

    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
        <>
            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
                <div className='flex-1 flex justify-center items-center flex-col my-10 w-[90%]'>
                    <div className='flex justify-between items-center w-[90%]'>
                        <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Sản phẩm</h1>
                        <Link to='/admin/products_add'>
                            <button className='bg-greenPrimary duration-100 bg-green-600 text-white text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'>
                                <PlusCircleOutlined style={{ color: 'white' }} />
                                Sản phẩm mới
                            </button>
                        </Link>
                    </div>
                    <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>
                        <header className='flex justify-start gap-4 items-center px-5 py-5'>
                            <div className='flex justify-between items-center max-w-[50%] gap-2 rounded-[100px] border-[1px] border-[#80b235] p-2'>
                                <SearchOutlined style={{ fontSize: '1rem', color: '#80b235' }} />
                                <input
                                    type='text'
                                    value={valueSearch}
                                    onChange={(e) => setValueSearch(e.target.value)}
                                    className='text-sm outline-none border-none w-full flex-1'
                                    placeholder='Tìm kiếm sản phẩm'
                                />
                                {valueSearch !== '' && (
                                    <button
                                        className='flex justify-center items-center rounded-full text-greenPrimary bg-[#80b23552] w-4 h-4  pb-1'
                                        onClick={() => setValueSearch('')}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        </header>
                        <Table dataSource={products} pagination={{ pageSize: 50 }} loading={loading}>
                            <Column
                                title='Ảnh sản phẩm'
                                fixed='left'
                                dataIndex='images'
                                key='images'
                                width={150}
                                render={(images) => <img src={images[0]?.imageUrl} className='w-[3rem] h-[3rem]' />}
                            />
                            <Column title='Tên' dataIndex='name' key='name' width={150} />
                            <Column title='Giá' dataIndex='price' key='price' width={150} />
                            {/* <Column title='Danh mục lớn' dataIndex='category' key='category' width={150} /> */}
                            <Column title='Miêu tả' dataIndex='description' key='description' width={150}
                                render={(description) => <div style={{ WebkitLineClamp: '4', wordBreak: 'break-word', overflowWrap: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{ __html: description }}></div>}
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
                                            onConfirm={async () => {
                                                await deleteProduct({
                                                    variables: {
                                                        id: parseInt(id),
                                                    },
                                                    refetchQueries: [{ query: GET_PRODUCTS, variables: { q: '' }}, { query: GET_CATEGORIES }]
                                                })
                                                message.success('Product deleted successfully')
                                            }}
                                        ><Button className='mr-2'>Delete</Button></Popconfirm>
                                        <Link to={'/admin/products/' + id}><Button className='bg-red-500 text-white'>Edit</Button></Link>
                                    </>
                                )}
                            />
                        </Table>
                    </div>
                </div>
                <Layout.Sider
                    width='300'
                    style={{
                        background: colorBgContainer,
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        minHeight: '100vh',
                        boxShadow: '-10px 0px 10px -2px #d8d6d6',
                        zIndex: '100'
                    }}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    trigger={null}
                    collapsedWidth={0}
                >
                    <div className='flex justify-between items-center p-3'>
                        <p className='text-lg font-semibold text-[rgba(0,0,0,0.5)]'>Lọc sản phẩm</p>
                        <button onClick={() => setCollapsed(true)}>
                            <CloseOutlined className='text-greenPrimary' />
                        </button>
                    </div>
                </Layout.Sider>
            </Layout>
        </>
    );
};

export default ProductAdmin;
