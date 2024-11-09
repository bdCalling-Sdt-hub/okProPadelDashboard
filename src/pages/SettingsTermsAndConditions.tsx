import { Button, Spin, Alert } from "antd";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetTermsAndConditionQuery } from "../redux/features/getTermsAndConditionApi";

const SettingsTermsAndConditions = () => {
  const { data, isLoading, isError } = useGetTermsAndConditionQuery();
  console.log("9", data);
  const navigate = useNavigate();

  const handleBackSettings = () => {
    navigate("/settings/personalInformation");
  };

  const handleEdit = (id) => {
    if (id) {
      navigate(`/settings/termsAndCondition/edittermsAndConditions/${id}`);
    }
  };

  if (isLoading) {
    return <Spin tip="Loading..." className="flex justify-center mt-10" />;
  }

  if (isError) {
    return <Alert message="Error" description="Failed to load content." type="error" showIcon />;
  }

  return (
    <div className="w-[79vw]">
      <div>
        <div
          onClick={handleBackSettings}
          className="border-none text-[#193664] flex items-center gap-2 cursor-pointer"
        >
          <IoIosArrowBack />
          Terms & Conditions
        </div>
      </div>
      <div className="pl-10 text-justify py-12">
        <p>{data?.data?.content}</p>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => handleEdit(data?.data?.id)}
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          htmlType="submit"
          className="w-[300px] h-[56px] py-4 mt-2 text-white hover:border-none border-none rounded-lg"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SettingsTermsAndConditions;
