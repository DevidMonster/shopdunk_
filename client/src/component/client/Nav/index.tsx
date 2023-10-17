import React from 'react'

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Breadcrumb 
    className='py-4'
    items={[
      {
        title: <Link className='text-black' to="/">Trang chủ</Link>,
      },
      {
        title: <Link className='text-black' to="">Iphone</Link>,
      },
    ]}
  />
  )
}

export default Navbar