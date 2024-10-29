import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";
import { usePostSetPasswordMutation } from "../redux/features/postSetPasswordApi";
import Swal from "sweetalert2";

interface SetNewPasswordFormValues {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [setSetPassword, { isLoading: setPasswordLoading }] = usePostSetPasswordMutation();


  const onFinish = async (values: SetNewPasswordFormValues) => {
    try {
        console.log("Received values of form:", values);

        if (values.password !== values.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Passwords do not match.",
            });
            return;
        }

        const data = {
            current_password: values.currentPassword,
            new_password: values.password,
            c_password: values.confirmPassword,
        };
        console.log("Data to send:", data);

        const response = await setSetPassword(data).unwrap();
        console.log("API response:", response);

        if (response?.success) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/auth/login");
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response?.message || "Validation Error.",
            });
        }
    } catch (error: any) {
        console.error("Error response:", error);

        const errorMessage = error?.data?.message || "An error occurred. Please try again.";
        const validationErrors = error?.data?.data;

        let formattedError = errorMessage;
        if (validationErrors) {
            formattedError += Object.entries(validationErrors)
                .map(([field, messages]) => `\n${field}: ${messages.join(", ")}`)
                .join("\n");
        }

        Swal.fire({
            icon: "error",
            title: "Error...",
            text: formattedError,
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
        <p>Create a new password. Ensure it differs from previous ones for security.</p>
      </div>
      <Form<SetNewPasswordFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Current password"
          name="currentPassword"
          rules={[{ required: true, message: "Please enter your current password" }]}
        >
          <Input.Password placeholder="Write current password" style={{ height: "50px" }} />
        </Form.Item>
        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: "Please enter your new password" }]}
        >
          <Input.Password placeholder="Write new password" style={{ height: "50px" }} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password placeholder="Write confirm password" style={{ height: "50px" }} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-[#4964C6] h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
            loading={setPasswordLoading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
