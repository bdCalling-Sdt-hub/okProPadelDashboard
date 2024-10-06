import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';
import type { CollapseProps } from 'antd';

const SettingsFaq: React.FC = () => {
  // State to manage the content and label of each panel
  const [panelData, setPanelData] = useState({
    1: { label: 'This is panel header 1', content: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.' },
    2: { label: 'This is panel header 2', content: 'Cats are known for their independence, but they are also great companions for people who like more relaxed pets.' },
    3: { label: 'This is panel header 3', content: 'Birds are incredible creatures that come in a variety of species. Some birds can even mimic human speech!' },
  });

  // State to manage which panel is being edited (for both label and content)
  const [editingPanel, setEditingPanel] = useState<string | null>(null);

  // State to manage temporary content and label when editing
  const [tempContent, setTempContent] = useState<string>('');
  const [tempLabel, setTempLabel] = useState<string>('');

  // Handle panel change (accordion open/close event)
  const onChange = (key: string | string[]) => {
    console.log('Accordion panels changed: ', key);
  };

  // Enter edit mode for both label and content
  const handleEdit = (key: string) => {
    setEditingPanel(key);
    setTempLabel(panelData[key as keyof typeof panelData].label); // Load the current label
    setTempContent(panelData[key as keyof typeof panelData].content); // Load the current content
  };

  // Save the edited label and content
  const handleSave = (key: string) => {
    // Update panelData state with new label and content
    setPanelData((prevState) => ({
      ...prevState,
      [key]: {
        label: tempLabel,
        content: tempContent,
      },
    }));
    setEditingPanel(null); // Exit edit mode

    // Log the updated state
    console.log('Updated panelData:', panelData);
  };

  // Cancel editing (reset editing mode)
  const handleCancel = () => {
    setEditingPanel(null); // Exit edit mode without saving
  };

  // Render the Collapse items with editable headers and content
  const items: CollapseProps['items'] = Object.keys(panelData).map((key) => ({
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
        <div className='items-center'>
          <span>{panelData[key as keyof typeof panelData].label}</span>
          <Button onClick={() => handleEdit(key)} type="link" className="ml-2">
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
          <Button onClick={() => handleSave(key)} type="primary" className="mt-2">
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{panelData[key as keyof typeof panelData].content}</p>
        </div>
      ),
  }));

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default SettingsFaq;
