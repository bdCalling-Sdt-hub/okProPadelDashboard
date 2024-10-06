import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import React from "react";

// Define the types for the API response
interface ApiResponse {
  data: {
    statusCode: number;
    message: string;
  };
}

// Mock data for content (replace this with real data fetching logic)
const data = {
  data: {
    attributes: {
      content: "Initial terms and conditions content.",
    },
  },
};

const EditTermsAndCondition: React.FC = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setContent(data?.data?.attributes?.content || "");
  }, []);

  const setData = async (newData: {
    content: string;
  }): Promise<ApiResponse> => {
    // Mock API response (replace with actual API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            statusCode: 201,
            message: "Terms and conditions updated successfully!",
          },
        });
      }, 1000);
    });
  };

  const handleUpdate = async () => {
    console.log(content);
    Swal.fire({
      position: 'top',                // Use valid SweetAlertPosition
      icon: 'success',                 // Use valid SweetAlertIcon
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/settings/termsAndCondition");

    // try {
    //   const response = await setData({
    //     content: content,
    //   });

    //   if (response?.data?.statusCode === 201) {
    //     Swal.fire({
    //       position: "top-center",
    //       icon: "success",
    //       title: response?.data?.message,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     navigate("/settings/terms-conditions");
    //   }
    // } catch (error: any) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Try Again...",
    //     text: error?.response?.data?.message || "An error occurred",
    //     footer: '<a href="#">Why do I have this issue?</a>',
    //   });
    // }
  };

  const handleBackTermsAndCondition = () => {
    navigate("/termsAndConditons");
  };

  return (
    <div className="relative ml-[24px] bg-white p-6 rounded-lg shadow-lg">
      <div
        onClick={handleBackTermsAndCondition}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">Edit Terms & Condition</h1>
      </div>
      <div className="text-justify mt-[24px] relative">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className="text-wrap bg-red-900"
        />
        <Button
          onClick={handleUpdate}
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          block
          className="mt-[30px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800
          text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTermsAndCondition;
