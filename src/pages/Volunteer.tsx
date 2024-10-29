import { Input, Table, Select, Modal, Button, Form, message } from "antd";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useGetAllVolunteerQuery, } from "../redux/features/getAllVolunteer";
import { usePostAddVolunteerMutation } from "../redux/features/postAddVolunteer";
import { usePutUpdateVolunteerMutation } from "../redux/features/putUpdateVolunteer";

const { Option } = Select;

const Volunteer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openAddVolunteerModal, setOpenAddVolunteerModal] = useState<boolean>(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null); // Store the selected volunteer for editing
  const [form] = Form.useForm();

  // Fetch volunteer data from the API
  const { data, isLoading, refetch } = useGetAllVolunteerQuery();
  const [addVolunteer, { isLoading: isAdding }] = usePostAddVolunteerMutation();
  const [updateVolunteer, { isLoading: isUpdating }] = usePutUpdateVolunteerMutation();

  const pageSize = 10;
  const roleOptions = ["02 (Lower-Intermediate)", "03 (Intermediate)", "04 (Advanced)", "05 (Professional)"];

  const tableData = data?.data?.volunteers.map((volunteer) => ({
    sId: volunteer.id,
    name: volunteer.name,
    location: volunteer.location,
    email: volunteer.email,
    currentLevel: volunteer.level,
    role: volunteer.role || "04 (Advanced)",
    status: volunteer.status ? "Active" : "Inactive",
  })) || [];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Current Level", dataIndex: "currentLevel", key: "currentLevel" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Select defaultValue={record.role} style={{ width: 220 }} disabled>
          {roleOptions.map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEditVolunteer(record)} loading={isUpdating}>
          Update
        </Button>
      ),
    },
  ];

  const handlePageChange = (page) => setCurrentPage(page);

  const handleAddVolunteer = () => {
    setSelectedVolunteer(null); // Clear selected volunteer
    setOpenAddVolunteerModal(true);
    form.resetFields();
  };

  const handleEditVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer); // Set the selected volunteer data
    form.setFieldsValue({
      name: volunteer.name,
      email: volunteer.email,
      location: volunteer.location,
      level: volunteer.currentLevel,
      role: volunteer.role,
    });
    setOpenAddVolunteerModal(true);
  };

  const handleAddVolunteerSubmit = async (values) => {
    try {
      if (selectedVolunteer) {
        // If selectedVolunteer exists, update
        await updateVolunteer({ id: selectedVolunteer.sId, ...values }).unwrap();
        message.success("Volunteer updated successfully!");
      } else {
        // Else, add a new volunteer
        await addVolunteer(values).unwrap();
        message.success("Volunteer added successfully!");
      }
      setOpenAddVolunteerModal(false);
      refetch();
    } catch (error) {
      console.error("Error saving volunteer:", error);
      message.error("Failed to save volunteer. Please try again.");
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <Input
          prefix={<Search />}
          className="w-[50%] rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search Volunteer"
          style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
        />
        <Button onClick={handleAddVolunteer}>Add Volunteer</Button>
      </div>
      <div className="py-8">
        <Table
          dataSource={tableData}
          columns={columns}
          loading={isLoading}
          pagination={{
            pageSize,
            total: data?.data?.meta?.total_volunteers || 0,
            current: currentPage,
            onChange: handlePageChange,
          }}
        />

        {/* Add/Edit Volunteer Modal */}
        <Modal
          title={selectedVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
          visible={openAddVolunteerModal}
          onCancel={() => setOpenAddVolunteerModal(false)}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={handleAddVolunteerSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the volunteer's name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>

            <Form.Item
              name="level"
              label="Current Level"
              rules={[{ required: true, message: "Please enter the current level" }]}
            >
              <Input placeholder="Enter current level" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select a role">
                {roleOptions.map((roleOption) => (
                  <Option key={roleOption} value={roleOption}>
                    {roleOption}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isAdding || isUpdating}>
                {selectedVolunteer ? "Update Volunteer" : "Add Volunteer"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Volunteer;
