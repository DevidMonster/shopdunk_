/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Rate } from "antd";
import { AiOutlineDown, AiOutlinePlusCircle } from "react-icons/ai";
import { Button, Form, Radio, Rate } from "antd";
import { BsFillCheckCircleFill, BsGift } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../slice/cart.slice";

// const formItemLayout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 14 },
// };

type IProps = {
  productSkus: any[],
  productOptions: any[],
  productName: string,
  productDiscount: number,
  onChangeImages: (images: string[]) => void
}

const OverView = ({ onChangeImages, productSkus = [], productOptions = [], productName = '', productDiscount = 0 }: IProps) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [currentSku, setCurrentSku] = useState<any>({
    price: 0,
  })
  const onFinish = (values: any) => {
    console.log("Received values of form: ", {
      id: currentSku.id,
      name: productName,
      image: currentSku.images[0]?.imageUrl,
      price: currentSku.price,
      option: { ...values },
      quantity: 1,
      maxQuantity: currentSku.quantity,
    });
    const item = {
      id: currentSku.id,
      name: productName,
      image: currentSku.images[0]?.imageUrl,
      price: productDiscount === 0 ? currentSku.price : currentSku.price - (productDiscount / 100 * currentSku.price),
      option: { ...values },
      quantity: 1,
      maxQuantity: currentSku.quantity,
    }
    dispatch(addItem(item))
  };

  useEffect(() => {
    if (productOptions.length > 0 && productSkus.length > 0) {
      const obj: any = {};
      productOptions.forEach((option: { optionName: string, optionValues: any[] }) => {
        obj[option.optionName] = option.optionValues[0].valueName
      })
      form.setFieldsValue(obj)
      handleCurrentSku()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productOptions, productSkus])

  const handleCurrentSku = () => {
    // console.log(productSkus.map((sku: any) => sku?.skuValues?.map((value: any) => value.optionValue.valueName).join(' | '),), Object.values(form?.getFieldsValue(true)).join(' | '))
    const skuValues = productSkus.map((sku: any) => sku?.skuValues?.map((value: any) => value.optionValue.valueName).join(' | '),)
    skuValues.forEach((value: any, index: number) => {
      if (
        value == Object.values(form?.getFieldsValue(true)).join(' | ')
      ) {
        onChangeImages(productSkus[index].images)
        setCurrentSku(productSkus[index])
      }
    })
  }

  return (
    <div>
      <div className="relative">
        {currentSku.quantity === 0 && <div className="z-[999] flex justify-center items-center absolute top-0 left-[-105%] w-[calc(100vw*0.42)] h-[calc(100vw*0.42)] bg-[rgba(0,0,0,0.2)]">
          <p className="text-white font-bold text-[50px]">Hết hàng</p>
        </div>}
        <div className="text-2xl font-semibold">{productName}</div>
        <div className="flex justify-start items-center">
          <div className="mr-2 my-4">
            <Rate allowHalf />
          </div>
          <div className="flex items-center text-blue-600">
            1 Đánh giá | <AiOutlinePlusCircle className="mx-2" /> So sánh
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="flex items-end my-4">
          {productDiscount > 0 ? (
            <>
              <div className="text-2xl text-blue-600 mr-3">{(currentSku.price - (productDiscount / 100 * currentSku.price)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
              <del className="text-xl text-gray-400">{currentSku.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
            </>
          ) : (
            <div className="text-2xl text-blue-600 mr-3">{currentSku.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
          )}
        </div>
        <div>
          <Form
            form={form}
            layout="vertical"
            name="validate_other"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            {productOptions.length > 0 ?
              (
                productOptions.map((option: any, index: number) => (
                  <Form.Item initialValue={option.optionValues[0]} label={option.optionName} key={index} name={option.optionName}>
                    <Radio.Group onChange={handleCurrentSku}>
                      {option.optionName.toLowerCase() == "color" || option.optionName.toLowerCase() == "màu sắc"
                        ? option.optionValues.map((value: any, index: number) => (
                          <Radio.Button style={{ background: value.valueName.toLowerCase() }} className={`before:bg-transparent mr-2 rounded-full w-[32px] h-[32px] border-[2px]`} key={index + 'sub'} value={value.valueName}></Radio.Button>
                        ))
                        :
                        option.optionValues.map((value: any, index: number) => (
                          <Radio.Button key={index + 'sub'} value={value.valueName}>{value.valueName}</Radio.Button>
                        ))
                      }
                    </Radio.Group>
                  </Form.Item>
                ))
              )
              : <></>}

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
                className={`${currentSku.quantity === 0 ? 'bg-gray-400' : ''} w-full h-16 border rounded-xl text-xl bg-blue-600 text-white  py-3`}
                type="default"
                htmlType="submit"
                disabled={currentSku.quantity === 0}
              >
                <div className="font-semibold my-auto">Mua ngay</div>
              </Button>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Button disabled={currentSku.quantity === 0} className="font-semibold text-blue-600 border-blue-600 border-[2px] my-auto h-16 py-3 text-xl">
                  Trả góp
                </Button>
                <Button disabled={currentSku.quantity === 0} className="font-semibold text-blue-600 border-blue-600 border-[2px] my-auto h-16 py-3 text-xl">
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
