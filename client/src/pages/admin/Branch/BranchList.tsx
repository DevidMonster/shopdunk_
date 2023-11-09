import { Table, Space, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_BRANCH, GET_BRANCHS } from '../../../api/branch';

const BranchList = () => {
    const { data, loading, refetch } = useQuery(GET_BRANCHS)
    const [deleteBranch] = useMutation(DELETE_BRANCH)

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
            title: 'Branch Name',
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this branch?"
                        onCancel={() => message.error('Cancel')}
                        okButtonProps={{ className: 'bg-blue-400' }}
                        onConfirm={async () => {
                            await deleteBranch({
                                variables: {
                                    id: parseInt(record.id),
                                },
                                refetchQueries: [{ query: GET_BRANCHS }]
                            })
                            message.success('Branch deleted successfully')
                        }}
                    ><Button danger type='primary' className='mr-2'>Delete</Button></Popconfirm>
                    <Link to={'/admin/branch/edit/' + record.id}>Edit</Link>
                </Space>
            ),
        },
    ];

    return <div className='w-[80%]'>
        <h1 className="text-2xl font-bold">Branch</h1>
        <Table loading={loading} columns={columns} dataSource={data?.branchs} />
    </div>
}
export default BranchList;