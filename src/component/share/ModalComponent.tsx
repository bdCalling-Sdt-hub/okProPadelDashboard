import {
  Modal,
  Button,
  Select,
  Radio,
  Space,
  Input,
  RadioChangeEvent,
} from "antd";
import React, { useState, useEffect } from "react";
import { usePutChangeUserStatusMutation } from "../../redux/features/putChangeUserStatus";

const ModalComponent: React.FC<ModalComponentProps> = ({
  openModel,
  setOpenModel,
  title,
  subtitle,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  children,
  role,
  setRole,
  showRoleSelect = false,
  value,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const [putChangeUserStatus] = usePutChangeUserStatusMutation();

  // Log value to verify if the id is being passed correctly
  useEffect(() => {
    console.log("ModalComponent received value:", value);
  }, [value]);

  const hideModal = () => {
    setOpenModel(false);
    if (onCancel) onCancel();
  };

  const handleApprove = () => {
    if (onConfirm) onConfirm();
    updateUserStatus(); // Call the API function here
    hideModal();
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("Radio checked", e.target.value);
    setInputValue(e.target.value);
  };

  // Function to update user status via API
  const updateUserStatus = async () => {
    if (!value?.id) {
      console.error("User ID is undefined");
      return;
    }

    // Map inputValue to expected status string
    const statusValue = inputValue === 1 ? "active" : "banned";
    
    try {
      const response = await putChangeUserStatus({
        id: value.id,
        data: { status: statusValue, _method: "PUT" },
      }).unwrap();
      console.log("User status updated:", response.message);
    } catch (error) {
      console.error("Error updating user status:", error);
      if (error?.data) {
        console.error("Error response data:", error.data);
      }
    }
  };

  return (
    <Modal
      open={openModel}
      onCancel={hideModal}
      footer={null}
      style={{
        backgroundColor: "white",
        padding: "20px",
        textAlign: "center",
      }}
      centered={true}
    >
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-black">{title}</h1>
        <h2 className="text-lg text-gray-600">{subtitle}</h2>
      </div>

      {showRoleSelect && setRole && (
        <div className="mb-4 py-6 flex-col">
          <Radio.Group onChange={onChange} value={inputValue}>
            <Space direction="vertical">
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Banned</Radio>
            </Space>
          </Radio.Group>
        </div>
      )}

      {value && (
        <div className="mb-4">
          <p><strong>Name:</strong> {value.full_name}</p>
          <p><strong>Email:</strong> {value.email}</p>
          <p><strong>Status:</strong> {value.status}</p>
        </div>
      )}

      {children && <div className="mb-4">{children}</div>}

      <div className="flex justify-center">
        <Button
          onClick={hideModal}
          style={{
            backgroundColor: "white",
            color: "#000",
            border: "1px solid #d9d9d9",
            marginRight: "10px",
          }}
        >
          {cancelLabel}
        </Button>
        <Button type="primary" onClick={handleApprove}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
