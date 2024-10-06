import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/LogoOkProPadel.png";

// Assuming `Input.OTP` is a custom input component
interface OTPInputProps {
  size?: "large" | "small" | "middle";
  className?: string;
  style?: React.CSSProperties;
  length: number;
  formatter?: (str: string) => string;
  onChange: (text: string) => void;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  // Define the `onChange` handler with the correct type
  const onChange = (text: string) => {
    console.log("onChange:", text);
  };

  const handleVerify = () => {
    navigate("/auth/set-new-password");
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
          We sent a reset link to {"fahim"}, enter the 5-digit code mentioned in
          the email.
        </p>
      </div>

      {/* Assuming `Input.OTP` is a custom component */}
      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={5}
        formatter={(str: string) => str.toUpperCase()}
        onChange={onChange}
      />

      <Button
        className="bg-[#4964C6] h-12 text-white text-lg w-full mt-14"
        onClick={handleVerify}
      >
        Verify Code
      </Button>

      <p className="text-center mt-10">
        You have not received the email?
        <Button className="pl-0" type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
