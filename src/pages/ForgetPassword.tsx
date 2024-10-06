import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";

interface ForgetPasswordFormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: ForgetPasswordFormValues) => {
    console.log(values);
    navigate("/auth/verify");
  };

  return (
    <AuthWrapper>
      <div className="text-center mb-12">
      <div className="flex py-8">
          <div className="flex items-center mx-auto gap-2">
            <img src={logo} alt="Logo" className="w-20" />
            <h1 className="font-bold text-3xl">Choozy</h1>
          </div>
        </div>
        <p>Please enter your email and click send</p>
      </div>
      <Form<ForgetPasswordFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Enter your email" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-[#4964C6] h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
