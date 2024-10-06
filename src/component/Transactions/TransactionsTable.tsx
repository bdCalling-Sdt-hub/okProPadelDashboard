import { Input, Table } from "antd";
import React, { useState } from "react";
import image from "../../assets/Images/Notifications/Avatar.png";
import { Trash, Search, Pencil } from "lucide-react";
import ModalComponent from "../share/ModalComponent";
import SelectBox from "../share/SelectBox";

interface UserAction {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  action: UserAction;
}

interface ProductListingProps {}

const TransactionTable: React.FC<ProductListingProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction>({} as UserAction);
  const [type, setType] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const pageSize = 10;

  const data: UserData[] = [...Array(9).keys()].map((item, index) => ({
    name: "Sam",
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="avatar" />,
    date: "9-24-204",
    purchasedProduct: "iMac air 2017",
    category: "Vehicle",
    amount: "$6729.00",
    quantity: "Quantity",
    status: "Approved",
    action: {
      sId: index + 1,
      image: <img src={image} className="w-9 h-9 rounded" alt="" />,
      name: "Fahim",
      category: "Category",
      amount: "$6729.00",
      quantity: "quantity",
      status: "Approved",
      date: "9-24-204",
      purchasedProduct: "iMac air 2017",
      contact: "0521545861520",
    },
  }));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Purchased Product ",
      dataIndex: "purchasedProduct",
      key: "purchasedProduct",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (values: UserAction) => {
    setUserData(values);
    setOpenModel(true);
    setType("user");
  };

  const handleDelete = (values: UserAction) => {
    setUserData(values);
    setOpenDeleteModal(true);
  };

  const confirmApprove = () => {
    console.log("Approved:", userData);
    setOpenModel(false);
    // Add approve logic here
  };

  const confirmDelete = () => {
    console.log("Deleted:", userData);
    setOpenDeleteModal(false);
    // Add delete logic here
  };
  const selectOptions = [
    { value: "1", label: "week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Year" },
  ];
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  return (
    <div className="mt-2 bg-[#FAFAFA]">
      <div className="flex justify-between w-full">
        <div className="pl-4 py-3">
          <h1 className="text-xl font-bold text-[#5D5D5D]">Overview</h1>
          <p className="text-[#5D5D5D]">Activities summary at a glance</p>
        </div>
        <div className="pr-8">
          <SelectBox
            options={selectOptions}
            placeholder="Week"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div>
      </div>
      <div className="">
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
        <ModalComponent
          openModel={openModel}
          setOpenModel={setOpenModel}
          title="Approve Item"
          subtitle="Are you sure you want to approve the product?"
          cancelLabel="Cancel"
          confirmLabel="Approve"
          onConfirm={confirmApprove} // Your approve logic
        />

        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete Item"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDelete} // Your delete logic
        />
      </div>
    </div>
  );
};

export default TransactionTable;
