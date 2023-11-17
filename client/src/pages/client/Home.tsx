import React from "react";
import Banner from "../../component/client/Banner";
import Item from "../../component/client/Item";
// import Sub from "../../component/client/Subscribe";
import { Link } from "react-router-dom";
import SubBanner from "../../component/client/SubBanner";
import { MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../api/category";
import { Skeleton } from "antd";


const Home = () => {
  const { data, loading } = useQuery(GET_CATEGORIES)    
  return (
    <div>
      <div className="bg-[#f8f9fa]">
        <div className="max-w-full">
          <Banner dataBanner={data?.categories[0]?.banners} />
        </div>
        <div className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-3 gap-5 mb-16">
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/banner_thang10/Banner%20%C3%82m%20thanh.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/banner_thang10/Banner%20TCDM.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://shopdunk.com/images/uploaded/banner/bonus%20banner/387x166%201.png"
                alt=""
              />
            </div>
          </div>
          <div className="mt-24 group">
            {!loading && data?.categories[0] ?
              (
                data.categories[0]?.children.map((category: any, index: number) => (
                  <div key={index} className={category.children.every((child: any) => child.products.length === 0) ? "hidden" : ""}>
                    <div className="text-center text-4xl font-semibold my-10">
                      <Link to={category.name}>{category.name}</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-5 group-[.is-visible]:hidden">
                    {category.children.map((child: any, index: number) => {
                        if (child.products.length > 0) {
                          return (
                            <Item key={index} items={[child.products[0]]} />
                          )
                        }
                      })}
                    </div>
                    <div className="text-sky-600 my-10">
                      <Link
                        to={category.slug}
                        className="mx-auto p-2 w-60 flex justify-center items-center border-[1px] rounded-lg border-sky-600	"
                      >
                        <p> Xem tất cả {category.name} </p>
                        <MdArrowForwardIos />
                      </Link>
                    </div>
                  </div>
                ))
              )
              : (
                <div>
                  <Skeleton></Skeleton>
                </div>
              )}
          </div>
          <div>
            <SubBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
