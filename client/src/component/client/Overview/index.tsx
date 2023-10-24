import React from "react";
// import { Rate } from "antd";
import { AiOutlineDown, AiOutlinePlusCircle } from "react-icons/ai";
import { Button, Form, Radio, Rate } from "antd";
import { BsFillCheckCircleFill, BsGift } from "react-icons/bs";

// const formItemLayout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 14 },
// };

const OverView = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold">iphone 15</div>
        <div className="flex justify-start items-center">
          <div className="mr-2 my-4">
            <Rate allowHalf defaultValue={5} />
          </div>
          <div className="flex items-center text-blue-600">
            1 Đánh giá | <AiOutlinePlusCircle className="mx-2" /> So sánh
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="flex items-end my-4">
          <div className="text-2xl text-blue-600 mr-3">16.600.300 VNĐ</div>
          <del className="text-xl text-gray-400">24.000.000 VNĐ</del>
        </div>
        <div>
          <Form
            name="validate_other"
            onFinish={onFinish}
            initialValues={{
              "input-number": 3,
              "checkbox-group": ["A", "B"],
              rate: 3.5,
              "color-picker": null,
            }}
            style={{ maxWidth: 600 }}
          >
            <div className="mb-3">Dung lượng</div>
            <Form.Item name="radio-group">
              <Radio.Group>
                <Radio.Button
                  className="mr-3 px-4 rounded-md font-medium text-gray-400"
                  value="128GB"
                >
                  128GB
                </Radio.Button>
                <Radio.Button
                  className="mr-3 px-4 rounded-md font-medium text-gray-400"
                  value="256GB"
                >
                  256GB
                </Radio.Button>
                <Radio.Button
                  className="mr-3 px-4 rounded-md font-medium text-gray-400"
                  value="512GB"
                >
                  512GB
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <div className="mb-3">Màu sắc</div>
            <Form.Item name="color">
              <Radio.Group>
                <Radio.Button className="hidden"></Radio.Button>
                <Radio.Button
                  className="mr-3 rounded-full font-medium p-[2px]"
                  value="black"
                >
                  <div className="border rounded-full bg-black p-3"></div>
                </Radio.Button>
                <Radio.Button
                  className="mr-3 rounded-full font-medium p-[2px]"
                  value="pink"
                >
                  <div className="border rounded-full bg-pink-500 p-3"></div>
                </Radio.Button>
                <Radio.Button
                  className="mr-3 rounded-full font-medium p-[2px]"
                  value="red"
                >
                  <div className="border rounded-full bg-red-500 p-3"></div>
                </Radio.Button>
                <Radio.Button
                  className="mr-3 rounded-full rounded-r-full font-medium p-[2px]"
                  value="gray"
                >
                  <div className="border rounded-full bg-gray-500 p-3"></div>
                </Radio.Button>
                <Radio.Button
                  className="hidden mr-3 rounded-full rounded-r-full font-medium p-[2px]"
                  value="gray"
                >
                  <div className="border rounded-full bg-gray-500 p-3"></div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <div className="border font-semibold p-4">
                <div className="border-b ">
                  <div className="flex items-center mb-1">
                    <BsGift className="mr-3 text-xl" /> Khuyến mại
                  </div>
                  <Radio.Group className="ml-8 flex flex-col py-2">
                    <Radio className="mb-2" value="mua thang">
                      Mua thẳng
                    </Radio>
                    <Radio value="tra gop">Trả góp 0%</Radio>
                  </Radio.Group>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex items-center mb-1">
                    <BsGift className="mr-3 text-xl" /> Ưu đãi
                  </div>
                  <div className="flex flex-col ml-8">
                    <div className="flex mb-2 ">
                      <div className="text-red-600 mr-1">Ưu đãi thanh toán</div>{" "}
                      ( <div className="text-blue-600">xem thêm</div> )
                    </div>
                    <div className="flex mb-2 items-start">
                      <img
                        className="mr-2 w-7"
                        src="https://shopdunk.com/images/uploaded/icon-gif/homecredit.jpg"
                        alt=""
                      />{" "}
                      Giảm 5% tối đa 500.000đ qua ({" "}
                      <div className="text-blue-600">xem thêm</div> )
                    </div>
                    <div className="flex mb-2 items-start">
                      <img
                        className="mr-2 w-6"
                        src="https://shopdunk.com/images/uploaded/icon/kredivo.png"
                        alt=""
                      />{" "}
                      Giảm 5% tối đa 500.000đ qua Kredivo (SL có hạn)
                    </div>
                    <hr className="my-3" />
                    <div className="flex items-center text-blue-600 font-normal">
                      Xem thêm các ưu đãi khác{" "}
                      <AiOutlineDown className="ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Form.Item>

            {/* <Form.Item> */}
            <div>
              <Button
                className="w-full h-16 border rounded-xl text-xl bg-blue-600 text-white  py-3"
                type="default"
                htmlType="submit"
              >
                <div className="font-semibold my-auto">Mua ngay</div>
              </Button>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Button className="font-semibold text-blue-600 border-blue-600 border-[2px] my-auto h-16 py-3 text-xl">
                  Trả góp
                </Button>
                <Button className="font-semibold text-blue-600 border-blue-600 border-[2px] my-auto h-16 py-3 text-xl">
                  Thu cũ đổi mới
                </Button>
              </div>
            </div>

            <div className="border rounded-xl mt-4 p-4">
              <div className="flex items-center">
                <BsFillCheckCircleFill className="text-blue-600 text-base mr-2" />{" "}
                Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning
                - Type C
              </div>
              <div className="flex items-center">
                <BsFillCheckCircleFill className="text-blue-600 text-base mr-2" />{" "}
                Bảo hành chính hãng 1 năm ({" "}
                <div className="text-blue-600">xem thêm</div> )
              </div>
              <div className="flex items-center">
                <BsFillCheckCircleFill className="text-blue-600 text-base mr-2" />{" "}
                Giao hàng nhanh toàn quốc ({" "}
                <div className="text-blue-600">xem thêm</div> )
              </div>
              <div className="flex items-center">
                <BsFillCheckCircleFill className="text-blue-600 text-base mr-2" />{" "}
                Hoàn thuế cho người nước ngoài ({" "}
                <div className="text-blue-600">xem thêm</div> )
              </div>
              <div className="flex items-center">
                <BsFillCheckCircleFill className="text-blue-600 text-base mr-2" />
                Gọi đặt mua <div className="text-blue-600 mx-1">1900.6626</div>{" "}
                (7:30 - 22:00)
              </div>
            </div>
            {/* </Form.Item> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OverView;
