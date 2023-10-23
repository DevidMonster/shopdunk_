import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input, Layout, MenuProps } from 'antd';
import { useState } from 'react';

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
   const [triggerDrop, setTriggerDrop] = useState(false);
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
         <div className='max-w-[50%] flex justify-end items-center gap-3'>
            <div className='flex justify-around items-center gap-2 border-[1px] border-[rgba(0,0,0,0.1)] p-2 rounded-lg overflow-hidden h-[3rem] w-[50%]'>
               <img src='https://picsum.photos/100/100' alt='avatar' className='rounded-md object-cover w-[20%]' />
               <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  onOpenChange={(open) => {
                     setTriggerDrop(open);
                  }}
               >
                  <div className='flex-1 flex justify-start gap-2 items-center cursor-pointer p-1 text-center'>
                     <span className='font-medium text-sm text-[#6b6765] '>Admin</span>
                     <div className={triggerDrop ? 'round-up' : 'round-down'}>
                        {' '}
                        <DownOutlined color='#6b6765' size={1} />
                     </div>
                  </div>
               </Dropdown>
            </div>
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
