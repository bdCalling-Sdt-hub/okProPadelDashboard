import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import avg from "../assets/Images/Notifications/Avatar.png";

type Props = {};

const Notifications = (props: Props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log("click,");
    navigate("/");
  };

  return (
    <div className="px-8">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h1> Back</h1>
      </div>
      <div className="flex justify-between py-6">
        <div className="flex">
          <h1 className="text-[24px] font-bold">Notifications</h1>
          <a href="#">
            <sup>
              <Badge count={2}>{/* <Avatar shape="none" size="" /> */}</Badge>
            </sup>
          </a>
        </div>
        <h1 className="text-[#5E7FD3]">See All</h1>
      </div>
      {/* all Notifications */}
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Avatar size={60} src={avg} />
          <h1>
          <span className="text-xl font-bold"> Leslie</span> Share a product
          </h1>
        </div>
        <h1>2 minutes ago</h1>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Avatar size={60} src={avg} />
          <h1>
          <span className="text-xl font-bold"> Leslie</span> Share a product
          </h1>
        </div>
        <h1>2 minutes ago</h1>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Avatar size={60} src={avg} />
          <h1>
          <span className="text-xl font-bold"> Leslie</span> Share a product
          </h1>
        </div>
        <h1>2 minutes ago</h1>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Avatar size={60} src={avg} />
          <h1>
          <span className="text-xl font-bold"> Leslie</span> Share a product
          </h1>
        </div>
        <h1>2 minutes ago</h1>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex gap-2 items-center">
          <Avatar size={60} src={avg} />
          <h1>
          <span className="text-xl font-bold"> Leslie</span> Share a product
          </h1>
        </div>
       <div className="flex items-center gap-4">
       <h1>2 minutes ago</h1>
       <Badge color="red" count={0}>{/* <Avatar shape="none" size="" /> */}</Badge>
       </div>
      </div>
    </div>
  );
};

export default Notifications;
