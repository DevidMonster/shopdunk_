import { useQuery } from "@apollo/client";
import { Button, Popconfirm, Table, message } from "antd";
import React from "react";
import { GET_ALL_DISCOUNT_CODE } from "../../../api/discount";

type Props = {};

const ListComment = (props: Props) => {
  const { data, loading } = useQuery(GET_ALL_DISCOUNT_CODE);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Percent",
      dataIndex: "discountPercent",
      key: "discountPercent",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Are you sure to delete this voucher?"
          onCancel={() => message.error("Cancel")}
          okButtonProps={{ className: "bg-blue-400" }}
          // onConfirm={async () => {
          //   await deleteCode({
          //     variables: {
          //       id: parseInt(record.id),
          //     },
          //     refetchQueries: [{ query: GET_ALL_DISCOUNT_CODE }],
          //   });
          //   message.success("Voucher deleted successfully");
          // }}
        >
          <Button className="mr-2">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="w-[80%] py-3">
      <div>
        <h1 className="text-2xl font-bold">Bình luận</h1>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data?.getAllDiscountCodes}
        />
      </div>
    </div>
  );
};

export default ListComment;
