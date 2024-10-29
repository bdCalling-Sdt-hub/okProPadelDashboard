import { Input, Table } from "antd";
import { Pencil, Search, Trash, Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import image from "../assets/Images/Notifications/Avatar.png";
import ModalComponent from "../component/share/ModalComponent";
import { useGetAllUsersQuery } from "../redux/features/getAllUsersApi";
import { useGetUserDetailsQuery } from "../redux/features/getUserDetialsApi";
import { useDeleteUserMutation } from "../redux/features/deleteUserApi";
import { useSearchUsersQuery } from "../redux/features/getSearchUser";

const Manage_Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string>("");

  const pageSize = 5;

  // Conditionally fetch users based on search term
  const { data, isLoading, isError } = searchTerm
    ? useSearchUsersQuery(searchTerm) 
    : useGetAllUsersQuery({
        page: currentPage,
        perPage: pageSize,
      });

  const { data: userDetails } = useGetUserDetailsQuery(userId, { skip: !userId });
 console.log("32", userDetails);
  const [deleteUser] = useDeleteUserMutation();

  // Debugging to verify if search data is returned correctly
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Fetched Data:", data);
  }, [data, searchTerm]);

  const handleSearch = (value: string) => {
    console.log("42", value);
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  const userDataSource = data?.data?.users?.map((user) => ({
    sId: user.id,
    image: <img src={user.image || image} className="w-9 h-9 rounded" alt="avatar" />,
    name: user.full_name,
    email: user.email,
    location: user.location || "N/A",
    level: user.level || "N/A",
    status: user.status === "active" ? "Active" : "Blocked",
    action: {
      sId: user.id,
      image: <img src={user.image || image} className="w-9 h-9 rounded" alt="avatar" />,
      name: user.full_name,
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
      role: user.status === "active" ? "Member" : "Admin",
      email: user.email,
    },
  })) || [];

  const columns = [
    {
      title: "Users",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => (
        <div className="flex items-center gap-4">
          {record.image}
          {record.name}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex items-center justify-end gap-3">
          <button onClick={() => handleViewDetails(record.sId)} className="hover:bg-primary p-1 rounded bg-blue">
            <Eye />
          </button>
          <button onClick={() => handleUser(record.action)} className="hover:bg-primary p-1 rounded bg-blue">
            <Pencil />
          </button>
          <button onClick={() => handleDelete(record.action)} className="bg-secondary px-3 py-1 rounded hover:bg-primary">
            <Trash />
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page: number) => setCurrentPage(page);

  const handleUser = (action: UserAction) => {
    setUserData(action);
    setRole(action.role);
    setOpenModel(true);
  };

  const handleViewDetails = (id: number) => {
    setUserId(id);
    setOpenViewModal(true);
  };

  const handleDelete = (action: UserAction) => {
    setUserData(action);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userData?.sId) {
      try {
        await deleteUser({ id: userData.sId }).unwrap();
        console.log("User deleted successfully:", userData.sId);
        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  // Check for loading, error, or no data scenarios
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users. Please try again later.</p>;
  if (searchTerm && !userDataSource.length) return <p>No users found for the search term.</p>;

  return (
    <div>
      {/* <Input
        prefix={<Search />}
        className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
        placeholder="Search by email"
        style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}

<Input
          prefix={<Search />}
          className="w-will rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search by email"
          style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      <div className="py-8">
        <Table
          dataSource={userDataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: data?.data?.meta?.total || 50,
            current: currentPage,
            onChange: handlePage,
            
            
          }}
          
          rowClassName={() => "hover:bg-transparent"}
        />
        <ModalComponent openModel={openModel} setOpenModel={setOpenModel} title="User role" subtitle="This is the current role of the selected user" cancelLabel="Cancel" role={role} setRole={setRole} showRoleSelect={true} confirmLabel="Save Changes" onConfirm={() => setOpenModel(false)} value={{ id: userData?.sId, full_name: userData?.name, email: userData?.email, status: role }} />

        <ModalComponent openModel={openDeleteModal} setOpenModel={setOpenDeleteModal} title="Delete User" subtitle="Are you sure you want to delete this item?" confirmLabel="Delete" cancelLabel="Cancel" onConfirm={confirmDelete} value={{ id: userData?.sId, full_name: userData?.name, email: userData?.email, status: role }} />

        <ModalComponent 
        openModel={openViewModal} 
        setOpenModel={setOpenViewModal} 
        confirmLabel="Close" 
        value={{ id: userDetails?.data?.id || userData?.sId, full_name: userDetails?.data?.full_name || userData?.name, email: userDetails?.data?.email || userData?.email, location: userDetails?.data?.location || "N/A", level: userDetails?.data?.level_name, points: userDetails?.data?.points, role: userDetails?.data?.role || userData?.role, created_at: userDetails?.data?.created_at, image: userDetails?.data?.image || userData?.image }} showRoleSelect={false} onConfirm={() => setOpenViewModal(false)}>
          {userDetails ? (
            <div className="">
              {userDetails?.data?.image && (
                <img src={userDetails?.data?.image} alt="User Avatar" className="w-24 h-24 bg-red-900 rounded-full mb-4 mx-auto" />
              )}
              <p className="text-black">
                <strong>Full Name:</strong> {userDetails.data.full_name}
              </p>
              <p className="text-black py-2">
                <strong>Email:</strong> {userDetails.data.email}
              </p>
              <p className="text-black py-2">
                <strong>Location:</strong> {userDetails.data.location || "N/A"}
              </p>
              <div className="flex gap-12 py-2 items-center justify-center">
                <p className="text-black">
                  <strong>Level:</strong> {userDetails.data.level_name}
                </p>
                <p className="text-black">
                  <strong>Points:</strong> {userDetails.data.points}
                </p>
              </div>
              <p className="text-black py-2">
                <strong>Role:</strong> {userDetails.data.role}
              </p>
              <p className="text-black py-2">
                <strong>Created At:</strong> {userDetails.data.created_at}
              </p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default Manage_Users;
