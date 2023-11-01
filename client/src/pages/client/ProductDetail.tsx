/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Item from "../../component/client/Item";
import Navbar from "../../component/client/Nav";
import ItemImage from "../../component/client/ItemImage";
import OverView from "../../component/client/Overview";
import TabsItem from "../../component/client/Tabs";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_SLUG } from "../../api/product";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

const ProductDetail = () => {
  const { id } = useParams()
  const [images, setImages] = useState<string[]>([])
  const { data, loading } = useQuery(GET_PRODUCT_SLUG, { variables: { slug: id } })

  const handleSetSkuImages = (images: string[]) => {
    setImages([...data?.productSlug.images as string, ...images])
  }

  // Hàm để tìm và đẩy các đối tượng có id là 1 xuống cuối mảng
  // function moveObjectWithOptionColorToEnd(arr: any[]) {
  //   const objectsToMove = arr.filter((obj: any) => obj.optionName.toLowerCase() === "color" || obj.optionName.toLowerCase() === "màu sắc");
  //   const otherObjects = arr.filter((obj: any) => obj.optionName.toLowerCase() != "color" && obj.optionName.toLowerCase() != "màu sắc" );

  //   return [...otherObjects, ...objectsToMove];
  // }

  // useEffect(() => {
  //   if (!loading && data?.productSlug) {
  //     setOptions(moveObjectWithOptionColorToEnd(data?.productSlug.options))
  //   }
  // }, [data, loading])

  return (
    <div className="bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div>
          <Navbar title={data?.productSlug.name}/>
        </div>
        {!loading && data?.productSlug ? (
          <>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ItemImage images={images} />
              </div>
              <div>
                <OverView
                  onChangeImages={handleSetSkuImages}
                  productDiscount={data?.productSlug.discount}
                  productName={data?.productSlug.name}
                  productOptions={data?.productSlug.options}
                  productSkus={data?.productSlug.productSkus}
                />
              </div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-5">Gợi ý phụ kiện đi kèm</div>
              <div>
                <Item items={[]}/>
              </div>
              <div className="py-10">
                <TabsItem description={data?.productSlug?.description}/>
              </div>
            </div>
          </>
        ) : <Spin />}

      </div>
    </div>
  );
};

export default ProductDetail;
