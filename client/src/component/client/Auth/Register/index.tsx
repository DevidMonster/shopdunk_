import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../../../api/auth";
import { saveTokenAndUser } from "../../../../slice/auth.slice";

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { data } = await signupApi(values);
    if(data?.data) {
      dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data }))
      navigate('/')
      message.success('signup success')
    } 
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
        <div className="mb-5 text-3xl font-semibold">Đăng ký</div>
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
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <div>Email</div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: 'Invalid email'}]}
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
          <div>Nhập lại mật khẩu</div>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Please repeat your password!" }]}
          >
            <Input.Password className="h-10" />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full bg-blue-600 text-white py-3 h-12 font-semibold"
              type="default"
              htmlType="submit"
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className="flex">
            <div>Bạn đã Có Tài Khoản?</div>
            <Link className="ml-2 text-blue-600" to={`/login`}>
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
