import React from "react";
import Item from "../../component/client/Item";
import Navbar from "../../component/client/Nav";
import ItemImage from "../../component/client/ItemImage";
import OverView from "../../component/client/Overview";
import TabsItem from "../../component/client/Tabs";

const ProductDetail = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div>
            <Navbar/>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <ItemImage/>
          </div>
          <div>
            <OverView/>
          </div>
        </div>
        <div>
          <div className="text-3xl font-semibold mb-5">Gợi ý phụ kiện đi kèm</div>
          <div>
            <Item />
          </div>
          <div className="py-10">
            <TabsItem/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
