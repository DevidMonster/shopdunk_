import React from 'react'

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type IProps = {
  title: string,
}

const Navbar = ({ title= '' }: IProps) => {
  return (
    <Breadcrumb 
    className='py-4'
    items={[
      {
        title: <Link className='text-black' to="/">Trang chủ</Link>,
      },
      {
        title: <Link className='text-black' to="">{title}</Link>,
      },
    ]}
  />
  )
}

export default Navbar