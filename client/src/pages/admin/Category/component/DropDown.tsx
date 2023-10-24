import { useRef, useEffect, useState } from 'react';
import Button from './Button';
import InsertModal from './InsertModal';

type IProps = {
   name: string | React.ReactNode;
   slug: string;
   id: number;
   icon?: React.ReactNode;
   to?: string;
   href?: string;
   children?: IProps[];
   products?: unknown[];
   parentId?: number;
   onClick: (products?: unknown[], title?: string) => void;
};

function DropDown(props: IProps) {
   const [dropDown, setDropDown] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);

   const handleOnClick = (products: unknown[], title: string) => {
      // console.log(products, title);    
      props.onClick(products, title)
   } 

   useEffect(() => {
      if (menuRef.current != null && menuRef.current !== undefined) {
         if (dropDown) {
            menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
         } else {
            menuRef.current.style.height = '0';
         }
      }
   }, [dropDown]);

   const toggleButton = () => {
      setDropDown((prev) => !prev);
      handleOnClick(props.products!, props.name as string)
   };

   return (
      <div>
         <Button
            hadChildren={props.children && props.children.length > 0 ? true : false}
            onClick={toggleButton}
            actions={true}
            isDropdown={dropDown}
            parentId={props.parentId}
            name={props.name}
            slug={props.slug}
            id={props.id}
            icon={props.icon}
            to={props.to}
            href={props.href}
         />
         {props.children && (
            <div
               className={`${dropDown ? 'h-auto opacity-1 visible' : 'h-0 overflow-hidden opacity-0 invisible'}  pl-6 transition-all duration-300 rounded-xl`}
               ref={menuRef}
            >
               <div className=''>
                  {props.children.length > 0 && props.children.map((child, index) => (
                     <DropDown key={index} {...child} parentId={props.id} onClick={props.onClick}/>
                  ))}
                  {props.parentId ?
                     <InsertModal parentId={props.id}>
                        <Button
                           name={'+ Thêm danh mục'}
                           onClick={() => { }}
                           parentId={props.id}
                           actions={false}
                           className='bg-[rgba(175,174,174,0.1)] h-2 mb-2'
                        ></Button>
                     </InsertModal>
                     :
                     <></>}
               </div>
            </div>
         )}

      </div>
   );
}

export default DropDown;