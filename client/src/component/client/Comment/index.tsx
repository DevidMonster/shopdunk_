import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Comment = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-2xl border-b-2  font-semibold pb-3">Bình luận</div>
      <div className="flex">
        <div className="p-5  border-r">
          <div>
            <div className="font-semibold">Viết bình luận của bạn</div>
          </div>
          <div className="w-96">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>Tên của bạn</div>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <div>Email hoặc số điện thoại</div>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <div>Nội dung bình luận</div>
              <Form.Item
                name="comment"
                rules={[
                  { required: true, message: "Please input your comment!" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item >
                <Button className="bg-blue-500 text-white font-semibold" size="large" type="default" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item> */}
              <button
                className="bg-blue-500 text-white rounded-xl font-semibold px-14 py-2"
                type="submit"
              >
                Gửi
              </button>
            </Form>
          </div>
        </div>
        <div className="flex justify-center items-start p-5">
          <div className="flex justify-center items-center">
            <button>
              <img
                className="w-[50px] h-[40px] rounded-full"
                src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                alt=""
              />
            </button>
            <div className="ml-4">
              <div className="font-semibold text-base">Đăng khoai to</div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Officia, esse.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
