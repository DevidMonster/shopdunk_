import { Link } from "react-router-dom";

type IProps = {
  items: any[]
}
const Item = ({ items = [] }: IProps) => {  
  return (
    <div className="">
      <div>
        <div>
          <div className={items.length > 1 ? `grid grid-cols-4 gap-5` : ``}>
            {items.length > 0 && items.map((item: any, index: number) => {              
              if (index < 4) {
                return (
                  <div key={index} className="max-w-[300px] relative border rounded-xl  bg-[#fff] p-5 hover:drop-shadow-xl">
                    {/* <img
                      className="absolute right-2 top-2 w-28"
                      src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                      alt=""
                    /> */}
                    <div className="mt-9 ">
                      <Link to={'/products/'+item?.slug}>
                        <img
                          className="mx-auto"
                          src={item?.images[0]?.imageUrl || ''}
                          alt={item?.name}
                        />
                      </Link>
                    </div>
                    <div className="my-5 text-lg font-medium">
                      {item?.name}
                    </div>
                    <div className="flex item?s-end">
                      {item?.discount > 0 ? (
                        <>
                          <div className="text-sky-600 font-bold">{(item?.price - (item?.discount / 100 * item?.price))?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                          <del className="mx-3 text-sm text-[#aaa]">{item?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                          <div className="text-sm text-[#aaa]">-{item?.discount}%</div>
                        </>
                      ) : (
                        <div className="text-sky-600 font-bold">{item?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                      )}
                    </div>
                  </div>
                )
              }
            })}
            {/* <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 "
                src="https://shopdunk.com/images/uploaded/icon/new.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0022255_iphone-15-128gb_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex item?s-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
            <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 w-28"
                src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0022263_iphone-15-pro-128gb_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex item?s-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
            <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 w-28"
                src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0022266_iphone-15-pro-max-256gb_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex item?s-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div>
        <div>
          <div className="grid grid-cols-4 gap-5">
            <div className="relative border rounded-xl  bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 w-28"
                src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0000594_ipad-air-4_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex item?s-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
            <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 "
                src="https://shopdunk.com/images/uploaded/icon/new.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0006205_ipad-gen-9-102-inch-wifi-64gb_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex item?s-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
            <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 w-28"
                src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0007071_ipad-pro-m2-11-inch-wifi-128gb_240.png"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex items-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
            <div className="relative border rounded-xl bg-[#fff] p-5 hover:drop-shadow-xl">
              <img
                className="absolute right-2 top-2 w-28"
                src="https://shopdunk.com/images/uploaded/icon/20_10.png"
                alt=""
              />
              <div className="mt-9 ">
                <a href="">
                  <img
                    className="mx-auto"
                    src="https://shopdunk.com/images/thumbs/0010883_ipad-pro-m1-129-inch-wifi-cellular-512gb_240.webp"
                    alt="ip14"
                  />
                </a>
              </div>
              <div className="my-5 text-lg font-medium">
                IPhone 14 Pro Max 128GB
              </div>
              <div className="flex items-end">
                <div className="text-sky-600 font-bold">30.990.000đ</div>
                <del className="mx-3 text-sm text-[#aaa]">35.990.000đ</del>
                <div className="text-sm text-[#aaa]">-24%</div>
              </div>
            </div>
          </div>
          <div className="text-sky-600 my-10">
            <Link
              to={`iphone`}
              className="mx-auto p-2 w-60 flex justify-center items-center border-[1px] rounded-lg border-sky-600	"
            >
              <p> Xem tất cả Ipad </p>
              <MdArrowForwardIos />
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Item;
