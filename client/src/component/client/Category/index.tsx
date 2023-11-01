import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css"
import { useQuery } from "@apollo/client";
import { GET_CATEGORIE_PARENT } from "../../../api/category";
import { Spin } from "antd";
import { BiDownArrow } from "react-icons/bi";

type IProps = {
  categoryType: string
}

const Category = ({ categoryType = '' }: IProps) => {
  const [categories, setCategories] = useState<any>({})
  const { data, loading } = useQuery(GET_CATEGORIE_PARENT, { variables: { parentId: 1 } })
  
  useEffect(() => {
    if (!loading && data?.categoryParent && categoryType !== '') {
      data?.categoryParent.map((category: any) => {  
        if (categoryType.toLowerCase().match(category.name.toLowerCase())) {
          setCategories(category)
          return ''
        }
        return ''
      })
    }
  }, [data, loading, categoryType])

  return (
    <div className="flex justify-between items-center h-28" >
      <div className=" w-[80%]">
        {Object.keys(categories).length > 0 ? (
          <ul className="py-5 flex w-[100%] overflow-x-auto">
            <li className={`${categoryType.toLowerCase() === categories?.name.toLowerCase() ? 'text-blue-500 border-blue-500' : 'border-transparent'} min-w-[7%] scroll-ml-10  mr-[40px] border-b-2  hover:text-blue-500 hover:border-blue-500`}>
              <Link className="block pb-2 w-full h-full" to={'/' + categories?.slug}>Tất cả</Link>
            </li>
            {
              categories.children.map((category: any, index: number) => (
                <li key={index} className={`${categoryType.toLowerCase().match(category.name.toLowerCase()) ? 'text-blue-500 border-blue-500' : 'border-transparent'}  min-w-[7%] scroll-ml-10  mr-[40px] border-b-2 hover:text-blue-500 hover:border-blue-500`}>
                  <Link className="block pb-2 w-full h-full" to={'/' + category.slug}>{category.name}</Link>
                </li>
              ))
            }
          </ul>
        ) : (
          <Spin></Spin>
        )}
      </div>
      <div className="">
        <button className="bg-white flex justify-center items-center border px-5 py-3 rounded-md">
          <div className="mr-4 text-2xl">
            <BiDownArrow />
          </div>
          <div className="text-base">
            Sắp xếp
          </div>
        </button>
      </div>
    </div>
  );
};

export default Category;
