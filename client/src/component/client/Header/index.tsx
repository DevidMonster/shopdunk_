/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GET_CATEGORIES } from "../../../api/category";
import { useQuery } from "@apollo/client";
import { Badge, Button, Drawer, Dropdown, DropdownProps, Popover, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../api/auth";
import { deleteTokenAndUser } from "../../../slice/auth.slice";
import { setCartName, setItem } from "../../../slice/cart.slice";
import ItemsInCart from "../ItemsInCart";
import SearchModal from "../SearchModal";

const Header = () => {
  const { data, loading } = useQuery(GET_CATEGORIES)
  const user = useSelector((state: { authReducer: { user: any, accessToken: string } }) => state.authReducer.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await clearToken()
    dispatch(deleteTokenAndUser())
    dispatch(setCartName('cart'))
    dispatch(setItem())
    navigate('/')
  }

  const items = useSelector((state: { cartReducer: { items: any[] } }) => state.cartReducer.items)
  const renderCategories = (categories: { id: number, name: string, slug: string, children?: { id: number, name: string, slug: string }[] }[]): any[] => {
    return categories.map((category: { id: number, name: string, slug: string, children?: { id: number, name: string, slug: string }[] }, index: number) => {
      return {
        key: index,
        label: (<Link className="text-sm" to={category.slug}>
          {category.name}
        </Link>),
        children: category?.children!.length > 0 ? renderCategories(category.children!) : undefined,
      }
    })
  }

  return (
    <div className="static bg-[#515154] py-2 ">
      <div className="flex justify-around items-center max-w-7xl mx-auto">
        <div className="w-2/12">
          <Link to={`/`}>
            <img
              className="w-40"
              src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="w-full mx-5">
          <ul className="flex gap-9 ">
            {!loading && data?.categories[0].children.map((category: { id: number, name: string, slug: string, children: { id: number, name: string, slug: string }[] }, index: number) => {
              const Comp = category.children.length > 0 ? Dropdown : Fragment
              const items = category.children.length > 0 ? renderCategories(category.children) : []
              const prop: DropdownProps = category.children.length > 0 ? { menu: { items: items }, placement: "bottomLeft", arrow: true } : {}
              return (<Comp key={index} {...prop}>
                <li>
                  <Space>
                    <Link className="text-[#d2d2d7] text-sm h-full" to={category.slug}>
                      {category.name}
                    </Link>
                    {category.children.length > 0 && <DownOutlined className="text-white w-[10px]" />}
                  </Space>
                </li>
              </Comp>)
            })
            }
          </ul>
        </div>
        <div className="w-2/12">
          <div className="hidden">
            <input type="text" />
          </div>
          <div className="flex justify-around">
            <SearchModal><IoIosSearch className="text-[rgb(255,255,255)] text-2xl" /></SearchModal>
            <Badge count={items.length} size="small">
              <button onClick={showDrawer}>
                <BsBag className="text-[white]  text-2xl" />
              </button>              </Badge>
            <Drawer title={"Items in cart (" + items.length + ")"} placement="right" onClose={onClose} open={open}>
              <ItemsInCart items={items} />
            </Drawer>
            {Object.keys(user).length > 0 ? (
              <Popover arrow={false} content={() => (
                <>
                  <Button className="text-red-500" onClick={handleLogout}>Đăng xuất</Button>
                </>
              )}>
                <div className="w-[30px] h-[30px] border-[1.5px] border-gray-400 rounded-full overflow-hidden">
                  <img className="w-full h-full" src={user.avatar || 'https://firebasestorage.googleapis.com/v0/b/cloud-app-b7625.appspot.com/o/product_images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=b03a15d3-3ad1-45ae-a982-75503482d8ec&_gl=1*182p1sq*_ga*MjAxMjA3Nzc0MS4xNjkzOTgzNjYw*_ga_CW55HF8NVT*MTY5ODY0MDU2Ny4xMy4xLjE2OTg2NDA2MzUuNTYuMC4w'}></img>
                </div>
              </Popover>
            ) : (
              <Link to={'/login'}>
                <AiOutlineUser className="text-[white]  text-2xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Header;
