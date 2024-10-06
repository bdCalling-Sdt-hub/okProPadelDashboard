import { Input, Table } from "antd";
import { Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import image from "../assets/Images/Notifications/Avatar.png";
import ModalComponent from "../component/share/ModalComponent";
import { Link } from "react-router-dom";

const Manage_Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [role, setRole] = useState<string>("");

  const pageSize = 10;

  const data: UserData[] = [...Array(9).keys()].map((item, index) => ({
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="avatar" />,
    name: "User " + (index + 1),
    role: index % 2 === 0 ? "Admin" : "Member", // Dynamic role for each user
    action: {
      sId: index + 1,
      image: <img src={image} className="w-9 h-9 rounded" alt="" />,
      name: "User " + (index + 1),
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
      role: index % 2 === 0 ? "Admin" : "Member", // Assign role dynamically
    },
  }));

  const columns = [
    {
      title: "Users",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => (
        <div className="flex items-center">
          {record.image}
          <Link
            to={`seller-profile/${record.sId}`}
            className="ml-3 text-blue-500 hover:underline"
          >
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(record.action)}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <Pencil />
          </button>
          <button
            onClick={() => handleDelete(record.action)}
            className="bg-secondary px-3 py-1 rounded hover:bg-primary"
          >
            <Trash />
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (action: UserAction) => {
    setUserData(action);
    setRole(action.role); // Set the role dynamically based on user action data
    setOpenModel(true);
  };

  const handleDelete = (action: UserAction) => {
    setUserData(action);
    setOpenDeleteModal(true);
  };

  const confirmApprove = () => {
    console.log("Approved:", userData, role);
    setOpenModel(false);
    // Add your approve logic here
  };

  const confirmDelete = () => {
    console.log("Deleted:", userData);
    setOpenDeleteModal(false);
    // Add your delete logic here
  };

  return (
    <div>
      <Input
        prefix={<Search />}
        className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
        placeholder="Search for Listing"
        style={{
          backgroundColor: "#f0f0f0",
          color: "#333333",
        }}
      />
      <div className="py-8">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        
        {/* Approve Modal */}
        <ModalComponent
          openModel={openModel}
          setOpenModel={setOpenModel}
          title="User role"
          subtitle="This is the current role of the selected user"
          cancelLabel="Cancel"
          role={role} // Pass the selected role
          setRole={setRole} // Function to change the role
          showRoleSelect={true} // Show the role select in this modal
          confirmLabel="Save Changes"
          onConfirm={confirmApprove}
          value={userData} // Passing dynamic user data
        />

        {/* Delete Modal */}
        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete User"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          value={userData} // Passing dynamic user data
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default Manage_Users;
