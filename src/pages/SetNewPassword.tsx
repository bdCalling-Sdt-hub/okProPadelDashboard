import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";

// Define an interface for the form values
interface SetNewPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();

  // Define the `onFinish` function with appropriate types
  const onFinish = (values: SetNewPasswordFormValues) => {
    console.log(values);
    navigate("/auth/login");
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
        <p>
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
      </div>
      <Form<SetNewPasswordFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="New password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password
            placeholder="Write new password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password
            placeholder="Write confirm password"
            style={{ height: "50px" }}
          />
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

export default SetNewPassword;
