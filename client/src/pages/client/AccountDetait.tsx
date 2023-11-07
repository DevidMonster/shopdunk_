import { Link } from 'react-router-dom';
import { Button, Descriptions, Modal, Spin, Tabs, message } from 'antd';
import { ArrowLeftOutlined, CameraOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import type { DescriptionsProps, TabsProps } from 'antd';
import DraggerImage from '../../component/client/DraggerImage';
import EditAccount from '../../component/client/EditAccount';
import { useMutation } from '@apollo/client';
import { GET_USER, UPDATE_USER } from '../../api/user';
import { uploadImages } from '../../api/upload';
import { getToken } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { saveTokenAndUser } from '../../slice/auth.slice';
import { setCartName, setItem } from '../../slice/cart.slice';



function AccountDetail() {
    const [user, setUser] = useState<any>({})
    const dispatch = useDispatch()
    const getTokenAndUser = async () => {
        console.log(1);
        
        const { data } = await getToken()
        if (Object.keys(data?.data).length > 0) {
            setUser(data.data)
            dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data }))
            dispatch(setCartName(data.data.email || 'cart'))
        }
        dispatch(setItem())
    }
    useEffect(() => {
        getTokenAndUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [updateUser] = useMutation(UPDATE_USER);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    // Hàm callback để lấy dữ liệu từ ImageUploader
    const handleDataChange = (data: any) => {
        setFiles(data);
    };
    console.log(files, 'file');

    const itemsDesc: DescriptionsProps['items'] = [
        {
            key: '1',
            span: 3,
            label: 'UserName',
            children: <p>{user.userName}</p>,
        },
        {
            key: '2',
            span: 3,
            label: 'Email',
            children: <p>{user.email}</p>,
        },
        {
            key: '3',
            span: 3,
            label: 'Phone Number',
            children: <p>{user.phoneNumber == null ? 'Not Phone number yet' : user.phoneNumber}</p>,
        },
        {
            key: '4',
            span: 3,
            label: 'Address',
            children: <p>{user.address == null ? 'Not address yet' : user.address}</p>,
        },
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Thông tin tài khoản',
            children: <div className='bg-white rounded-md p-5'>
                <Descriptions size='default' title="Thông tin của người dùng" items={itemsDesc} />
            </div>
        },
        {
            key: '2',
            label: 'Đơn hàng',
            children: 'Đơn hàng'
        }
    ];

    const handleOk = async () => {
        setConfirmLoading(true);
        const response = files.length > 0 ? await uploadImages(files) : [user?.avatar];
        const dataRequest: any = {
            ...user,
            userName: user?.userName,
            email: user?.email,
            avatar: response[0],
            id: parseInt(user.id!)
        };
        delete dataRequest.createdAt
        delete dataRequest.updatedAt
        delete dataRequest.password
        updateUser({
            variables: {
                updateUserInput: {
                    ...dataRequest
                }
            },
            refetchQueries: [{ query: GET_USER, variables: { id: parseInt(user.id!) } }]
        })
            .then(() => {
                message.success('Change avatar successfully');
                getTokenAndUser()
                setConfirmLoading(false);
                setOpen(false);
            });
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    console.log(files);

    return (
        <>
            <div className='bg-[#f8f9fa] w-full flex justify-start p-5 items-center min-h-screen flex-col'>
                <div className='w-[90%] rounded-lg mt-5'>
                    {Object.keys(user).length == 0 ? (
                        <Spin />
                    ) : (
                        <div>
                            <h1 className='text-3xl my-3 flex items-center font-semibold text-[rgba(0,0,0,0.7)]'>
                                <Link to={'/'}><Button icon={<ArrowLeftOutlined />} className='bg-transparent border-transparent'></Button></Link>
                                {user ? user.userName : 'Người dùng'}
                            </h1>
                            <header className='flex flex-col md:flex-row gap-4 p-5 bg-white rounded-lg justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='min-w-[80px] w-[80px] min-h-[80px] h-[80px] rounded-full relative'>
                                        <img
                                            src={user?.avatar || 'https://firebasestorage.googleapis.com/v0/b/cloud-app-b7625.appspot.com/o/product_images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=b03a15d3-3ad1-45ae-a982-75503482d8ec&_gl=1*182p1sq*_ga*MjAxMjA3Nzc0MS4xNjkzOTgzNjYw*_ga_CW55HF8NVT*MTY5ODY0MDU2Ny4xMy4xLjE2OTg2NDA2MzUuNTYuMC4w'}
                                            alt='user avatar'
                                            className='rounded-full w-full h-full object-cover'
                                        />
                                        <Button
                                            onClick={() => setOpen(true)}
                                            type='text'
                                            shape='circle'
                                            className='bg-white border-[1px] border-[rgba(0,0,0,0.5)] absolute -right-1 -bottom-1'
                                            icon={<CameraOutlined />}
                                        ></Button>
                                        <Modal
                                            open={open}
                                            confirmLoading={confirmLoading}
                                            onOk={handleOk}
                                            okButtonProps={{ className: 'bg-blue-400' }}
                                            onCancel={() => {
                                                setOpen(false)
                                                setConfirmLoading(false)
                                            }}
                                        >
                                            <DraggerImage maxCount={1} multiple name={'avatar'} onDataChange={handleDataChange} />
                                        </Modal>
                                    </div>
                                    <div>
                                        <h1 className='font-bold text-[1.4rem] lg:w-[400px] break-words'>{user.userName}</h1>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <div className='self-end w-full md:w-auto'>
                                    <EditAccount onRefetch={getTokenAndUser}  id={user?.id}>
                                        <Button className='text-white w-full bg-blue-400'>Chỉnh sửa tài khoản</Button>
                                    </EditAccount>
                                </div>
                            </header>
                            <div className='flex justify-between gap-4'>
                                <Tabs className='flex-1' defaultActiveKey='1' items={items} onChange={onChange} />
                                <div className='pt-16'>
                                    <div className='bg-white p-5 w-[400px] rounded-md'>
                                        <h1>Hộp thư đến</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AccountDetail;
