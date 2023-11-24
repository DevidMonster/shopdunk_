import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import AddBanner from "./AddBanner";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BANNER, GET_ALL_BANNER } from "../../../api/banner";
type Props = {};

const BannerList = (props: Props) => {
  const [removeBanner] = useMutation(DELETE_BANNER);
  const { data, loading } = useQuery(GET_ALL_BANNER);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (item: any) => <img src={item} className="w-[300px]" alt="" />,
    },
    {
      title: "Danh mục của ảnh",
      dataIndex: "category",
      key: "category",
      render: (item: any) => <div>{item?.name}</div>,
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Bạn có muốn xóa banner không ?"
          onCancel={() => message.error("Cancel")}
          okButtonProps={{ className: "bg-blue-400" }}
          onConfirm={async () => {
            console.log("Confirm", record.id);

            await removeBanner({
              variables: {
                removeBannerId: parseInt(record.id),
              },
              refetchQueries: [{ query: GET_ALL_BANNER }],
            })
              .then((res) => {
                console.log(res, "res");

                message.success(res?.data?.removeBanner?.message);
              })
              .catch(() => {
                message.error("Xóa banner thất bại");
              });
          }}
        >
          <Button className="mr-2">Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="w-[80%] py-3">
      <div>
        <h1 className="text-2xl font-bold">Thêm Banner</h1>
        <AddBanner />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Banner</h1>
        <Table loading={loading} columns={columns} dataSource={data?.banners} />
      </div>
    </div>
  );
};

export default BannerList;
