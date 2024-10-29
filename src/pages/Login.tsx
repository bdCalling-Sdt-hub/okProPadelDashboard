import React, { useState } from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";
import { usePostLoginMutation } from "../redux/features/postLoginApi";
import Swal from "sweetalert2";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [setData, { isLoading, isError, status, error, data }] = usePostLoginMutation();

  const onFinish = async () => {
    const payload = { email, password };
    console.log("Sending payload:", payload);
  
    try {
      const response = await setData(payload);
      console.log("27, Response:", response);
      console.log("28", response?.data.data?.token);
  
      if (response?.error) {
        // Show error message from the server, if available
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.error.data?.message || "An error occurred.",
        });
      } else if (response?.data) {
        // Handle successful login
        localStorage.setItem("token", response?.data.data?.token);
        // localStorage.setItem("refresh_token", response.data?.data?.attributes?.token?.refreshToken);
        // localStorage.setItem("user-update", JSON.stringify(response.data.data));
  
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong, please try again.",
      });
    }
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
        <p>Please enter your email and password to continue</p>
      </div>
      <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            placeholder="Enter your email"
            style={{ height: "50px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{ height: "50px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
