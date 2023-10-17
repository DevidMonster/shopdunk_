import React from 'react'
import Header from '../component/client/Header'
import Footer from '../component/client/Footer'
import { Outlet } from 'react-router-dom'
import Sub from '../component/client/Subscribe'

type Props = {}

const LayoutClient = (props: Props) => {
  return (
    <div>
        <Header/>
          <Outlet/>
        <Footer/>
    </div>
  )
}

export default LayoutClient