import React, { useState, useEffect } from "react";
import { Collapse, Input, Button } from "antd";
import type { CollapseProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useUpdateNormalMatchQuestionMutation } from "../redux/features/putUpdateNormalMatchQuestion";
import { useUpdateTrialMatchQuestionMutation } from "../redux/features/putUpdateTrialMatchQuestion";
import { useDeleteNormalMatchQuestionMutation } from "../redux/features/deleteNormalMatchQuestion";
import { useAddNormalMatchQuestionMutation } from "../redux/features/postAddNormalMatchQuestionApi";
import { useGetNormalMatchQuestionQuery } from "../redux/features/getNormalMatchQuestionApi";


interface MatchData {
  [key: string]: {
    label: string;
    content: string;
    answers: string[];
  };
}

const Questionaries: React.FC = () => {
  const [normalMatchData, setNormalMatchData] = useState<MatchData>(
    JSON.parse(localStorage.getItem("normalMatchData") || "{}")
  );
  const [trialMatchData, setTrialMatchData] = useState<MatchData>(
    JSON.parse(localStorage.getItem("trialMatchData") || "{}")
  );
  const [editingPanel, setEditingPanel] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<string>("");
  const [tempLabel, setTempLabel] = useState<string>("");
  const [tempAnswers, setTempAnswers] = useState<string[]>(["", "", "", ""]);
  const [updateNormalMatchQuestion] = useUpdateNormalMatchQuestionMutation();
  const [updateTrialMatchQuestion] = useUpdateTrialMatchQuestionMutation();
  const [deleteNormalMatchQuestion] = useDeleteNormalMatchQuestionMutation();
  const [addNormalMatchQuestion] = useAddNormalMatchQuestionMutation();
  const {data} = useGetNormalMatchQuestionQuery()
console.log("34", data?.data?.data?.[0]?.id);
  useEffect(() => {
    localStorage.setItem("normalMatchData", JSON.stringify(normalMatchData));
  }, [normalMatchData]);

  useEffect(() => {
    localStorage.setItem("trialMatchData", JSON.stringify(trialMatchData));
  }, [trialMatchData]);

  const handleEdit = (key: string, dataType: "normal" | "trial") => {
    console.log("43", key);
    setEditingPanel(key);
    const dataToEdit = dataType === "normal" ? normalMatchData : trialMatchData;
    setTempLabel(dataToEdit[key].label);
    setTempContent(dataToEdit[key].content);
    setTempAnswers(dataToEdit[key].answers || ["", "", "", ""]);
  };

  const handleSave = async (key: string | null, dataType: "normal" | "trial") => {
    // Validate that all answer fields are filled
    if (tempAnswers.some((answer) => !answer.trim())) {
      console.error("All answer fields must be filled.");
      return;
    }
  
    const updatedData = {
      label: tempLabel,
      content: tempContent,
      answers: tempAnswers,
    };
  
    const formattedQuestion: any = {
      question: tempLabel,
      A: tempAnswers[0],
      B: tempAnswers[1],
      C: tempAnswers[2],
      D: tempAnswers[3],
      status: true,
    };
  
    try {
      // Check if the key is null or does not exist in normalMatchData
      if (key || (key in normalMatchData)) {
        console.log(key);
        // Add a new question
        if (dataType === "normal") {
          console.log("Attempting to add a new normal match question...");
          const response = await addNormalMatchQuestion(formattedQuestion).unwrap();
          console.log("API Response:", response);
          if (response && response.success) {
            const newKey = `new-${Date.now()}`;
            setNormalMatchData((prevState) => ({
              ...prevState,
              [newKey]: updatedData,
            }));
          } else {
            console.error("Error: Question not added successfully.");
          }
        } else {
          console.log("Add trial match question logic here");
        }
      } else {
        // Updating an existing question
        formattedQuestion._method = "PUT";
        if (dataType === "normal") {
          await updateNormalMatchQuestion({ id: key, data: formattedQuestion }).unwrap();
          console.log("Normal match question updated successfully.");
        } else {
          await updateTrialMatchQuestion({ id: key, data: formattedQuestion }).unwrap();
          console.log("Trial match question updated successfully.");
        }
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  
    setEditingPanel(null);
  };
  

  const handleCancel = () => {
    setEditingPanel(null);
  };

  const handleAddNewNormalMatch = () => {
    const newKey = `new-${Date.now()}`;
    const newPanel = {
      [newKey]: {
        label: `This is panel header ${newKey}`,
        content: "This is the new panel content for normal match.",
        answers: ["", "", "", ""],
      },
    };

    setNormalMatchData((prevState) => ({
      ...prevState,
      ...newPanel,
    }));
  };

  const handleAddNewTrialMatch = () => {
    const newKey = `new-${Date.now()}`;
    const newPanel = {
      [newKey]: {
        label: `This is panel header ${newKey} for trial match`,
        content: "This is the new panel content for trial match.",
        answers: ["", "", "", ""],
      },
    };
    setTrialMatchData((prevState) => ({
      ...prevState,
      ...newPanel,
    }));
  };

  const handleDeletePanel = async (key: string, dataType: "normal" | "trial") => {
    try {
      if (dataType === "normal") {
        // await deleteNormalMatchQuestion({ id: key }).unwrap();
        const updatedData = { ...normalMatchData };
        delete updatedData[key];
        setNormalMatchData(updatedData);
      } else {
        const updatedData = { ...trialMatchData };
        delete updatedData[key];
        setTrialMatchData(updatedData);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...tempAnswers];
    updatedAnswers[index] = value;
    setTempAnswers(updatedAnswers);
  };

  const normalMatchItems: CollapseProps["items"] = Object.keys(normalMatchData).map((key) => ({
    key,
    label:
      editingPanel === key ? (
        <Input value={tempLabel} onChange={(e) => setTempLabel(e.target.value)} placeholder="Edit label" />
      ) : (
        <div className="items-center">
          <span>{normalMatchData[key].label}</span>
          <Button onClick={() => handleEdit(key, "normal")} type="link" className="ml-2">
            Edit
          </Button>
          <Button onClick={() => handleDeletePanel(key, "normal")} type="link" danger className="ml-2">
            Delete
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
          {tempAnswers.map((answer, index) => (
            <Input
              key={index}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Answer option ${index + 1}`}
              className="mt-2"
            />
          ))}
          <Button onClick={() => handleSave(key, "normal")} type="primary" className="mt-2">
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{normalMatchData[key].content}</p>
          {(normalMatchData[key].answers || []).map((answer, index) => (
            <p key={index}>{`Answer ${index + 1}: ${answer}`}</p>
          ))}
        </div>
      ),
  }));

  const trialMatchItems: CollapseProps["items"] = Object.keys(trialMatchData).map((key) => ({
    key,
    label:
      editingPanel === key ? (
        <Input value={tempLabel} onChange={(e) => setTempLabel(e.target.value)} placeholder="Edit label" />
      ) : (
        <div className="items-center">
          <span>{trialMatchData[key].label}</span>
          <Button onClick={() => handleEdit(key, "trial")} type="link" className="ml-2">
            Edit
          </Button>
          <Button onClick={() => handleDeletePanel(key, "trial")} type="link" danger className="ml-2">
            Delete
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
          {tempAnswers.map((answer, index) => (
            <Input
              key={index}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Answer option ${index + 1}`}
              className="mt-2"
            />
          ))}
          <Button onClick={() => handleSave(key, "trial")} type="primary" className="mt-2">
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{trialMatchData[key].content}</p>
          {(trialMatchData[key].answers || []).map((answer, index) => (
            <p key={index}>{`Answer ${index + 1}: ${answer}`}</p>
          ))}
        </div>
      ),
  }));

  const navigate = useNavigate();
  const handleBackSettings = () => {
    navigate("/settings/personalInformation");
  };

  return (
    <div>
      <div className="py-8">
        <Button className="" onClick={handleBackSettings} style={{ backgroundColor: "transparent", color: "black" }}>
          Back
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="w-6/12">
          <div className="flex justify-end py-2">
            <Button className="mb-2" onClick={handleAddNewNormalMatch} style={{ backgroundColor: "#0057B8", color: "#fff" }}>
              Add New Normal Match
            </Button>
          </div>
          <Collapse items={normalMatchItems} />
        </div>
        <div className="w-6/12">
          <div className="flex flex-row justify-end py-2">
            <Button className="mb-2" onClick={handleAddNewTrialMatch} style={{ backgroundColor: "#0057B8", color: "#fff" }}>
              Add New Trial Match
            </Button>
          </div>
          <Collapse items={trialMatchItems} />
        </div>
      </div>
    </div>
  );
};

export default Questionaries;
