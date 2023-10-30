/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import RenderItems from './RenderItems';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../../../api/category';
import Button from './Button';
import { Button as AntdButton, Result, Skeleton, Tooltip, message } from 'antd';
import InsertModal from './InsertModal';
import { AiOutlineReload } from 'react-icons/ai';

type IProps = {
   isMenuActive?: boolean;
};

function RenderCategories(props: IProps) {
   const [showProducts, setShowProducts] = useState<unknown[] | undefined>([]);
   const [title, setTitle] = useState<string>('');
   const [active, setActive] = useState(props.isMenuActive || true);
   const [createCategory, { loading: createLoading }] = useMutation(CREATE_CATEGORY)
   const { data, loading } = useQuery(GET_CATEGORIES)

   useEffect(() => {
      if (!loading && data?.categories) {
         setShowProducts(data?.categories[0]?.products || [])
         setTitle(data?.categories[0]?.name || '')
      }
      setActive(true)
   }, [data, loading]);

   const handleSetProducts = (products: unknown[], title: string) => {
      setShowProducts(products)
      setTitle(title)
   }

   return (
      <div className='w-full flex gap-7'>
         {!loading && data?.categories.length > 0 ? (
            <>
               <div className='sticky top-1'>
                  <Tooltip title={'Reload to firt category'}>
                     <AntdButton className='bg-white absolute top-0 right-0' onClick={() => {
                        setShowProducts(data?.categories[0].products)
                        setTitle(data?.categories[0].name)
                     }}><AiOutlineReload /></AntdButton>
                  </Tooltip>
                  <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Danh mục</h1>
                  <div
                     className={`rounded-md drop-shadow-lg w-64 p-0 bg-white transition-all overflow-y-auto overflow-x-hidden overscroll-y-contain ${!active ? '-translate-x-[110%]' : 'translate-x-0'
                        }`}
                  >
                     <div className='p-2'>
                        {!loading && data.categories[0]?.children ? data.categories[0].children.map((category: any, index: number) => (
                           <DropDown key={index} {...category} parentId={data.categories[0].id} onClick={handleSetProducts} />
                        )) : <Skeleton active />}
                        <InsertModal parentId={data?.categories[0]?.id}>
                           <Button
                              name={'+ Thêm danh mục'}
                              onClick={() => { }}
                              parentId={data?.categories[0].id}
                              actions={false}
                              className='bg-[rgba(175,174,174,0.1)] h-2 mb-2'
                           ></Button>
                        </InsertModal>
                     </div>
                  </div>
               </div>
               <div className='flex-1 w-full h-screen'>
                  <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Sản phẩm</h1>
                  <RenderItems products={showProducts!} title={title} />
               </div>
            </>
         ) : <Result
            status="warning"
            className='w-full'
            title="You must have a default category, add now..."
            extra={
               <AntdButton className='bg-blue-400' loading={createLoading} onClick={async () => {
                  const res = await createCategory({
                     variables: {
                        createCategoryInput: {
                           name: 'Danh mục mặc định'
                        }
                     },
                     refetchQueries: [{ query: GET_CATEGORIES }]
                  })

                  if(res?.data) {
                     message.success('created new category')
                     return
                  }
                  message.error('create failed')
               }} type="primary" key="console">
                  Add Default Category
               </AntdButton>
            }
         />}
      </div>
   );
}

export default RenderCategories;