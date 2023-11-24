import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, MenuProps, Popover } from 'antd';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../api/auth';
import { deleteTokenAndUser } from '../slice/auth.slice';
import { setCartName, setItem } from '../slice/cart.slice';
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;

const items: MenuProps['items'] = [
   {
      label: <a href='https://www.antgroup.com'>1st menu item</a>,
      key: '0'
   },
   {
      label: <a href='https://www.aliyun.com'>2nd menu item</a>,
      key: '1'
   },
   {
      type: 'divider'
   },
   {
      label: '3rd menu item',
      key: '3'
   }
];
const HeaderAdmin = () => {
   // const [triggerDrop, setTriggerDrop] = useState(false);
   const user = useSelector((state: { authReducer: { user: any, accessToken: string } }) => state.authReducer.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleLogout = async () => {
      await clearToken()
      dispatch(deleteTokenAndUser())
      dispatch(setCartName('cart'))
      dispatch(setItem())
      navigate('/')
   }
   return (
      <Header
         style={{
            paddingLeft: 10,
            paddingRight: 10,
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 72,
            zIndex: '100',
            boxShadow: ' 0 3px 4px -2px rgba(0, 0, 0, 0.123)',
         }}
      >
         <div className='w-[40%] flex justify-start items-center gap-2 rounded-lg border-[1px] border-[rgba(0,0,0,0.1)] px-3 py-2'>
            <SearchOutlined width={'1.5rem'} height={'1.5rem'} color='rgba(0,0,0,0.2)' />
            <Input className='outline-none border-none' placeholder='Tìm kiếm' />
         </div>
         <div className='flex justify-end items-center gap-3 h-[80%]'>
            {Object.keys(user).length > 0 ? (
               <Popover arrow={false} content={() => (
                  <div className="flex flex-col gap-2">
                     <Button className="text-red-500" onClick={handleLogout}>Đăng xuất</Button>
                  </div>
               )}>
                  <div className='border-[1px] border-[rgba(0,0,0,0.1)] p-2 rounded-lg flex gap-2 items-center justify-between overflow-hidden h-full'>
                     <div className="w-[30px] h-[30px] border-[1.5px] border-gray-400 rounded-full overflow-hidden">
                        <img className="w-full h-full" src={user.avatar || 'https://firebasestorage.googleapis.com/v0/b/cloud-app-b7625.appspot.com/o/product_images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=b03a15d3-3ad1-45ae-a982-75503482d8ec&_gl=1*182p1sq*_ga*MjAxMjA3Nzc0MS4xNjkzOTgzNjYw*_ga_CW55HF8NVT*MTY5ODY0MDU2Ny4xMy4xLjE2OTg2NDA2MzUuNTYuMC4w'}></img>
                     </div>
                     <p>{user.userName}</p>
                  </div>
               </Popover>
            ) : (
               <Link to={'/login'}>
                  <AiOutlineUser className="text-[white]  text-2xl" />
               </Link>
            )}
            {/* <div className='w-[3rem] h-[3rem] flex justify-center items-center rounded-xl p-2 bg-[#dfdede] cursor-pointer'>
               <BellIcon />
            </div>
            <div className='w-[3rem] h-[3rem] flex justify-center items-center rounded-xl p-2 bg-[#2c2c2c] cursor-pointer'>
               <MoonIcon />
            </div> */}
         </div>
      </Header>
   );
};

export default HeaderAdmin;
