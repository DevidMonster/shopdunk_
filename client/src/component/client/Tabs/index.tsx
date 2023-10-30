import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Comment from "../Comment";
import Description from "../Category-Description";

type IProps = {
  description: string;
}

const TabsItem = ({ description }: IProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Mô tả sản phẩm",
      children: (
        <div>
          <Description description={description}/>
        </div>
      ),
    },
    {
      key: "2",
      label: "So sánh Iphone",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Thông số kỹ thuật",
      children: "Chi tiết sản phẩm",
    },
    {
      key: "4",
      label: "Chi tiết sản phẩm",
      children: "Chi tiết sản phẩm",
    },
    {
      key: "5",
      label: "Hỏi đáp",
      children: (
        <div>
          <Comment />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Tabs onChange={onChange} centered type="card" items={items} />
    </div>
  );
};

export default TabsItem;
