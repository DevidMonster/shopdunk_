import React, { useState } from 'react';
import {
   PieChartOutlined,
  //  NotificationOutlined,
  //  UserOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import images from '../assets/images';
import HeaderAdmin from '../component/AdminHeader';
const { Content, Sider } = Layout;
import { BsPhone } from 'react-icons/bs'
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem;
}

const items: MenuItem[] = [
   getItem(<Link to='/admin/dashboard'>Trang chủ</Link>, '1', <PieChartOutlined />),
   getItem('Sản phẩm cửa hàng', '2', <BsPhone />, [
      getItem(<Link to='/admin/products'>Sản phẩm</Link>, '3'),
      getItem(<Link to='/admin/products_add'>Tạo sản phẩm</Link>, '4')
   ]),
  //  getItem(<Link to='/manage/orders'>Đơn hàng</Link>, 'sub1', <OrderIcon />),
  //  getItem(<Link to='/manage/vouchers'>Mã khuyễn mãi</Link>, 'sub2', <TicketIcon />),
  //  getItem(<Link to='/manage/accounts'>Tài khoản</Link>, 'sub3', <UserOutlined />),
  //  getItem(<Link to='/manage/notifications'>Thông báo người dùng</Link>, 'sub4', <NotificationOutlined />)
];

const LayoutAdmin = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [open, setOpen] = useState(false);
   const ButtonTrigger = (
      <button className='bg-greenPrimary text-white w-full font-semibold'>{collapsed ? 'Hiện' : 'Ẩn'}</button>
   );
   const {
      token: { colorBgContainer }
   } = theme.useToken();

   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ background: colorBgContainer }}
            className={
               'fixed z-[999] transition-all ' +
               (open ? '-translate-x-0' : '-translate-x-full') +
               ' md:-translate-x-0 h-screen'
            }
            trigger={ButtonTrigger}
         >
            <div className='max-h-[150px] p-[13px] flex justify-center items-center bg-[#777]'>
               <img src={images.logo} alt='logo' className='w-[80%]' />
            </div>
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
            <Button
               className='absolute right-[-40px] top-[70px] bg-[rgba(190,69,255,0.72)] text-white z-[999] md:hidden md:opacity-0 md:invisible'
               onClick={() => setOpen((prev) => !prev)}
               icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
               style={{ color: 'white' }}
            ></Button>
         </Sider>
         {open ? <div onClick={() => setOpen(false)} className='fixed top-0 right-0 z-[150] w-screen h-full bg-[rgba(0,0,0,0.1)] md:hidden md:opacity-0 md:invisible'></div> : ''}
         <Layout className={'transition-all '+ (!collapsed ? 'md:pl-[250px]' : 'md:pl-[80px]')}>
            <HeaderAdmin />
            <Content className='min-h-screen overflow-auto flex justify-center w-full'>
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};

export default LayoutAdmin;
