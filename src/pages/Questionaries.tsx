import React, { useState } from "react";
import { Collapse, Input, Button } from "antd";
import type { CollapseProps } from "antd";
import { useNavigate } from "react-router-dom";

const Questionaries: React.FC = () => {
  // Separate state for normal matches and trial matches panel data
  const [normalMatchData, setNormalMatchData] = useState({
    1: {
      label: "This is panel header 1",
      content:
        "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.",
    },
  });

  const [trialMatchData, setTrialMatchData] = useState({
    1: {
      label: "This is panel header 1 for trial match",
      content:
        "Cats are known for their independence, but they are also great companions for people who like more relaxed pets.",
    },
  });

  // State to manage which panel is being edited (for both label and content)
  const [editingPanel, setEditingPanel] = useState<string | null>(null);

  // State to manage temporary content and label when editing
  const [tempContent, setTempContent] = useState<string>("");
  const [tempLabel, setTempLabel] = useState<string>("");

  // Handle panel change (accordion open/close event)
  const onChange = (key: string | string[]) => {
    console.log("Accordion panels changed: ", key);
  };

  // Enter edit mode for both label and content
  const handleEdit = (key: string, dataType: "normal" | "trial") => {
    setEditingPanel(key);
    const dataToEdit = dataType === "normal" ? normalMatchData : trialMatchData;
    setTempLabel(dataToEdit[key as keyof typeof dataToEdit].label); // Load the current label
    setTempContent(dataToEdit[key as keyof typeof dataToEdit].content); // Load the current content
  };

  // Save the edited label and content
  const handleSave = (key: string, dataType: "normal" | "trial") => {
    // Update the correct state (normal matches or trial matches)
    if (dataType === "normal") {
      setNormalMatchData((prevState) => ({
        ...prevState,
        [key]: {
          label: tempLabel,
          content: tempContent,
        },
      }));
    } else {
      setTrialMatchData((prevState) => ({
        ...prevState,
        [key]: {
          label: tempLabel,
          content: tempContent,
        },
      }));
    }

    setEditingPanel(null); // Exit edit mode
  };

  // Cancel editing (reset editing mode)
  const handleCancel = () => {
    setEditingPanel(null); // Exit edit mode without saving
  };

  // Add a new panel for normal matches
  const handleAddNewNormalMatch = () => {
    const newKey = (Object.keys(normalMatchData).length + 1).toString(); // Create a new unique key
    const newPanel = {
      [newKey]: {
        label: `This is panel header ${newKey}`,
        content: "This is the new panel content for normal match.",
      },
    };

    // Add new panel to normalMatchData
    setNormalMatchData((prevState) => ({
      ...prevState,
      ...newPanel,
    }));
  };

  // Add a new panel for trial matches
  const handleAddNewTrialMatch = () => {
    const newKey = (Object.keys(trialMatchData).length + 1).toString(); // Create a new unique key
    const newPanel = {
      [newKey]: {
        label: `This is panel header ${newKey} for trial match`,
        content: "This is the new panel content for trial match.",
      },
    };

    // Add new panel to trialMatchData
    setTrialMatchData((prevState) => ({
      ...prevState,
      ...newPanel,
    }));
  };

  // Render the Collapse items for normal matches
  const normalMatchItems: CollapseProps["items"] = Object.keys(normalMatchData).map((key) => ({
    key,
    label:
      editingPanel === key ? (
        <div>
          <Input
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            placeholder="Edit label"
          />
        </div>
      ) : (
        <div className="items-center">
          <span>{normalMatchData[key as keyof typeof normalMatchData].label}</span>
          <Button
            onClick={() => handleEdit(key, "normal")}
            type="link"
            className="ml-2"
          >
            Edit
          </Button>
        </div>
      ),
    children:
      editingPanel === key ? (
        <div>
          <Input.TextArea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            rows={4}
            placeholder="Edit content"
          />
          <Button
            onClick={() => handleSave(key, "normal")}
            type="primary"
            className="mt-2"
          >
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{normalMatchData[key as keyof typeof normalMatchData].content}</p>
        </div>
      ),
  }));

  // Render the Collapse items for trial matches
  const trialMatchItems: CollapseProps["items"] = Object.keys(trialMatchData).map((key) => ({
    key,
    label:
      editingPanel === key ? (
        <div>
          <Input
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            placeholder="Edit label"
          />
        </div>
      ) : (
        <div className="items-center">
          <span>{trialMatchData[key as keyof typeof trialMatchData].label}</span>
          <Button
            onClick={() => handleEdit(key, "trial")}
            type="link"
            className="ml-2"
          >
            Edit
          </Button>
        </div>
      ),
    children:
      editingPanel === key ? (
        <div>
          <Input.TextArea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            rows={4}
            placeholder="Edit content"
          />
          <Button
            onClick={() => handleSave(key, "trial")}
            type="primary"
            className="mt-2"
          >
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{trialMatchData[key as keyof typeof trialMatchData].content}</p>
        </div>
      ),
  }));

  const navigate = useNavigate();

  const handleBackSettings = () => {
    navigate('/settings/personalInformation');
  };

  return (
    <div className="flex gap-4">
      <div className="w-6/12">
        <div className="flex justify-between py-2">
          <h1 className="font-bold py-4">Questionaries for normal matches:</h1>
          <Button
            onClick={handleAddNewNormalMatch}
            style={{
              backgroundColor: "#193664",
              color: "#fff",
              height: "56px",
            }}
            htmlType="submit"
            className="w-[100px] h-[56px] py-4 mt-2 text-white hover:border-none border-none rounded-lg"
          >
            Add New
          </Button>
        </div>
        <Collapse items={normalMatchItems} defaultActiveKey={["1"]} onChange={onChange} />
      </div>

      <div className="w-6/12">
        <div className="flex justify-between py-2">
          <h1 className="font-bold py-4">Questionaries for trial matches:</h1>
          <Button
            onClick={handleAddNewTrialMatch}
            style={{
              backgroundColor: "#193664",
              color: "#fff",
              height: "56px",
            }}
            htmlType="submit"
            className="w-[100px] h-[56px] py-4 mt-2 text-white hover:border-none border-none rounded-lg"
          >
            Add New
          </Button>
        </div>
        <Collapse items={trialMatchItems} defaultActiveKey={["1"]} onChange={onChange} />
      </div>
    </div>
  );
};

export default Questionaries;
