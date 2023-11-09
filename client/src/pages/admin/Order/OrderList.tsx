import { Table, Space, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../../api/order';

const OrderList = () => {
    const { data, loading, refetch } = useQuery(GET_ORDERS)

    useEffect(() => {
        if (data) {
            refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record: any) => (
                <p className='text-green-500 font-semibold'>{record.status}</p>
            )
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (_, record: any) => (
                <p className='text-green-500 font-semibold'>{record.paymentStatus}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Button type='default'><Link to={'/admin/order/' + record.id}>View</Link></Button>
            ),
        },
    ];

    return <div className='w-[80%]'>
        <h1 className="text-2xl font-bold">Branch</h1>
        <Table loading={loading} columns={columns} dataSource={data?.orders} />
    </div>
}
export default OrderList;