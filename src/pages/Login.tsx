import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    console.log(values);
    navigate("/");
  };

  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        {/* <Title>Login</Title> */}
        <div className="flex py-8">
          <div className="flex items-center mx-auto gap-2">
            <img src={logo} alt="Logo" className="w-20" />
            <h1 className="font-bold text-3xl">Choozy</h1>
          </div>
        </div>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/auth/forget-password">
              Forgot password
            </Link>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
           className="bg-[#4964C6] h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
