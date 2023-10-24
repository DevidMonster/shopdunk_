/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "antd";
import { AiFillCaretRight } from "react-icons/ai";

type IProps = {
    products: unknown[],
    title: string
}

function RenderItems({ products, title }: IProps) {
    return (  
        <div className="bg-white h-full rounded-md w-full p-4">
            <h2 className='text-xl font-semibold text-[rgba(0,0,0,0.7)] flex gap-2 items-center'><AiFillCaretRight/> {title}</h2>
            {!products?.length && products?.length === 0 ? (
                <div className="flex justify-center items-center h-20">
                    <h3 className="text-[rgba(0,0,0,0.7)] font-medium">No Item</h3>
                </div>
            ) : (
                <div className="my-11 flex gap-6 flex-wrap">
                    {products.map((product: any, index: number) => (
                        <div key={index} className="w-20%">
                            <Image width={150} height={150} className="rounded-md overflow-hidden" src={product.images[0].imageUrl}/>
                            <p className="font-semibold text-center">{product.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RenderItems;