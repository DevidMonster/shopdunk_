import { useRef, useEffect, useState } from 'react';
import Button from './Button';

type IProps = {
   title: string | React.ReactNode;
   icon?: React.ReactNode;
   to?: string;
   href?: string;
   children?: IProps[];
};

function DropDown(props: IProps) {
   const [dropDown, setDropDown] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);
  
   
   useEffect(() => {
      if(menuRef.current != null && menuRef.current !== undefined) {
         if (dropDown) {
            menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
         } else {
            menuRef.current.style.height = '0';
         }
      }
   }, [dropDown]);

   const toggleButton = () => {
       setDropDown((prev) => !prev);
    };
    
    console.log(dropDown);

   return (
      <div>
         <Button
            hadChildren={props.children && props.children.length > 0 ? true : false}
            onClick={props.children && props.children.length > 0 ? toggleButton : () => undefined}
            isDropdown={dropDown}
            title={props.title}
            icon={props.icon}
            to={props.to}
            href={props.href}
         />
         {props.children && props.children.length > 0 && (
            <div
               className={`${dropDown ? 'h-[' + props.children.length*56 + 'px]' : 'h-0'}  pl-3 transition-all overflow-hidden duration-100 rounded-xl`}
               ref={menuRef}
            >
               <div className='border-l-[1px] border-gray-400'>
                   {props.children.map((child, index) => (
                      <Button
                         key={index}
                         hadChildren={child.children && child.children.length > 0 ? true : false}
                         onClick={child.children && child.children.length > 0 ? toggleButton : () => undefined}
                         isDropdown={dropDown}
                         title={child.title}
                         icon={child.icon}
                         to={child.to}
                         href={child.href}
                      />
                   ))}
               </div>
            </div>
         )}
      </div>
   );
}

export default DropDown;