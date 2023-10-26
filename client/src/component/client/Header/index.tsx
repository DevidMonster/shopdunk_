/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GET_CATEGORIES } from "../../../api/category";
import { useQuery } from "@apollo/client";
import { Dropdown, DropdownProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Fragment } from "react";

const Header = () => {
  const { data, loading } = useQuery(GET_CATEGORIES)

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
                    {category.children.length > 0 && <DownOutlined className="text-white w-[10px]"/>}
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
            <Link to={`login`}>
              <IoIosSearch className="text-[white] text-2xl" />
            </Link>
            <Link to={`login`}>
              <BsBag className="text-[white]  text-2xl" />
            </Link>
            <Link to={`login`}>
              <AiOutlineUser className="text-[white]  text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Header;
