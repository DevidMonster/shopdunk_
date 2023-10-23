import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';

type IProps = {
   isMenuActive?: boolean;
};

type IMenu = {
   title: string | React.ReactNode;
   icon?: React.ReactNode;
   to?: string;
   href?: string;
   children?: IMenu[];
};

const menu: IMenu[] = [
   { title: 'DashBoard', to: '/admin/dashboard' },
   { title: 'Orders', to: '/admin/orders' },
   {
      title: 'Product Managerment',
      children: [
         { title: 'Products', to: '/admin/products' },
         { title: 'Add Product', to: '/admin/product-add' }
      ]
   },
   {
      title: 'Category Managerment',
      children: [{ title: 'Add Category', to: '/admin/category-add' }]
   }
];

function RenderCategories(props: IProps) {
   const [active, setActive] = useState(props.isMenuActive || true);
   useEffect(() => {
      setActive(props.isMenuActive || true);
   }, [props]);
   return (
      <div
         className={`rounded-md drop-shadow-lg w-64 p-0 bg-white transition-all overflow-y-auto overflow-x-hidden overscroll-y-contain ${
            !active ? '-translate-x-[110%]' : 'translate-x-0'
         }`}
      >
         <div className='p-2'>
            {menu.map((mu, index) => (
               <DropDown key={index} {...mu} />
            ))}
         </div>
      </div>
   );
}

export default RenderCategories;