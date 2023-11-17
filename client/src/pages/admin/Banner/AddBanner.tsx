import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  Upload,
  UploadFile,
  message,
} from "antd";
import React, { useState } from "react";
import { CREATE_BANNER, GET_ALL_BANNER } from "../../../api/banner";
import { UploadOutlined } from "@ant-design/icons";
import { GET_CATEGORIES, GET_CATEGORIES_NO_TREE } from "../../../api/category";
import { DefaultOptionType } from "antd/es/select";
import { uploadImages } from "../../../api/upload";

type Props = {};
const { Option } = Select;

const AddBanner = (props: Props) => {
  // const [createVoucer, { loading }] = useMutation(CREATE_CODE)
  const { data, loading } = useQuery(GET_CATEGORIES);

  const [createBanner] = useMutation(CREATE_BANNER);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = ({ fileList }: { fileList: UploadFile[] }) => {
    form?.setFieldValue("images", fileList);
    setFileList(fileList);
  };

  const handleBeforeUpload = (file: UploadFile) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt10M = (file.size || 0) / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Kích thước hình ảnh không được vượt quá 10MB!");
    }

    return isJpgOrPng && isLt10M;
  };

  const renderCategories = (
    categories: { id: number; name: string; children: any[] }[] = []
  ): DefaultOptionType[] | undefined => {
    if (categories.length === 0) return [];
    return (
      (categories.map(
        (category: { id: number; name: string; children: any[] }) => ({
          value: category.id,
          title: category.name,
          children:
            category.children.length > 0
              ? renderCategories(category.children)
              : [],
        })
      ) as unknown as DefaultOptionType[]) || []
    );
  };
  const handleFinish = async (values: any) => {
    setIsLoading(true);
    console.log(values, "values");

    try {
      if (fileList.length > 0) {
        try {
          const response = await uploadImages(fileList);
          values.images = response;
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      createBanner({
        variables: {
          createBannerInput: {
            imageUrl: values.images[0],
            redirectUrl: values.redirectUrl,
            categoryId: values.categoryId,
          },
        },
        refetchQueries: [{ query: GET_ALL_BANNER }],
      })
        .then((res) => {
          form.resetFields();
          setFileList([]);
          setIsLoading(false);
          message.success("Thêm banner thành công");
        })
        .catch((err) => {
          message.error("Thêm banner thất bại");
        });
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div className="bg-white rounded-md p-7 mb-3">
      <Form form={form} onFinish={handleFinish}>
        <div className="flex flex-col items-center">
          <Form.Item
            name={"images"}
            label="Images"
            rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
          >
            <Upload
              beforeUpload={handleBeforeUpload}
              customRequest={(option) => {
                setTimeout(() => option.onSuccess!(option?.file), 0);
              }}
              onChange={handleOnChange}
              listType="picture-circle"
              fileList={fileList}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <Button
                  className="border-[0]"
                  icon={<UploadOutlined />}
                ></Button>
              )}
            </Upload>
          </Form.Item>

          <div className="flex">
            <Form.Item
              label="Đường dẫn ảnh sau khi click"
              name="redirectUrl"
              rules={[
                { required: true, message: "Làm phiền nhập ô input này" },
                { type: "string", message: "Đường dẫn này là chữ" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Banner thuộc loại sản phẩm nào"
              initialValue={1}
              name={"categoryId"}
              rules={[
                {
                  required: true,
                  message: "Làm ơn hãy chọn banner theo danh mục",
                },
              ]}
            >
              <TreeSelect
                placeholder="Select a category"
                style={{
                  width: 300,
                }}
                treeData={!loading ? renderCategories(data?.categories) : []}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              // loading={loading}
              className="bg-blue-400"
              type="primary"
              htmlType="submit"
            >
              Thêm Banner
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddBanner;
