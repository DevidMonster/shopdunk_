import Banner from "../../component/client/Banner";
// import Sub from "../../component/client/Subscribe";
import Navbar from "../../component/client/Nav";
import Item from "../../component/client/Item";
import Category from "../../component/client/Category";
import { Pagination, PaginationProps, Spin } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Topic from "../../component/client/Topic";
import Description from "../../component/client/Category-Description";
import Comment from "../../component/client/Comment";
import FeedBack from "../../component/client/Feedback";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIE_SLUG } from "../../api/category";
import { useEffect, useState } from "react";

const Product = () => {
  const [page] = useSearchParams();
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<any>({});
  const { data, loading, refetch } = useQuery(GET_CATEGORIE_SLUG, {
    variables: { slug: category, page: currentPage },
  });
  const navigate = useNavigate();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    refetch({ slug: category, page: page });
    navigate("/" + category + "?page=" + page);
  };

  useEffect(() => {
    if (!loading && data?.categorySlug) {
      setCurrentCategory(data?.categorySlug);
      setCurrentPage(parseInt(page.get("page")!) || 1);
    }
  }, [data, loading, page]);
  // const dataBannerParent = data?.categorySlug?.banners

  const dataBanner =  data?.categorySlug?.children?.map((item :any) => {
    if(item?.banners.length == 0){
      return null;
    }
    if (item?.banners.length != 0) {      
      return item?.banners[0];
    }
  });
  return (
    <div>
      {Object.keys(currentCategory).length > 0 ? (
        <div className="">
          <div className="bg-white ">
            <div className="max-w-7xl mx-auto">
              <Navbar title={currentCategory.name} />
            </div>
          </div>
          <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <div>
                <div>
                  <div className="text-center text-4xl font-semibold mb-5">
                    {currentCategory?.name}
                  </div>
                  <div>
                    <Banner dataBanner={dataBanner} />
                  </div>
                  <div className="my-3">
                    <Category categoryType={currentCategory?.name} />
                  </div>
                  <div>
                    {currentCategory?.products.length === 0 ? (
                      <div className="flex justify-center items-center h-28">
                        <p>No Item</p>
                      </div>
                    ) : (
                      <>
                        <Item items={currentCategory?.products} />
                        <div className="text-center py-10">
                          <Pagination
                            onChange={onChange}
                            pageSize={currentCategory?.pageSize}
                            defaultCurrent={currentCategory?.currentPage}
                            total={currentCategory?.totalPages}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Topic />
              </div>
              <div className="mt-10">
                <Description description="" />
              </div>
              <div className="my-10">
                <FeedBack somthing="" />
              </div>
              <div className="pb-10">{/* <Comment /> */}</div>
            </div>
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Product;
