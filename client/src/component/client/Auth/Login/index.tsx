import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="grid grid-cols-2 gap-10 py-20">
      <div>
        <img
          src="https://shopdunk.com/images/uploaded/banner/VNU_M492_08%201.jpeg"
          alt=""
        />
      </div>
      <div>
        <div className="mb-5 text-3xl font-semibold">Đăng nhập</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>Tên đăng nhập</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <div>Mật khẩu</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="h-10" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <div className="flex justify-between">
              <Checkbox>Nhớ mật khẩu</Checkbox>
              <Link className="text-blue-600" to={`/`}>
                Quên mật khẩu ?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-blue-600 text-white py-3 h-12 font-semibold"
              type="default"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="flex">
            <div>Bạn Chưa Có Tài Khoản?</div>
            <Link className="ml-2 text-blue-600" to={`/register`}>Tạo tài khoản ngay</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
