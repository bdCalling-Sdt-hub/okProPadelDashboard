import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Buttons from '../component/share/Buttons';
import Tags from '../component/share/Tags';

interface Props {}

const CategoryManagement: React.FC<Props> = () => {
  const [tags, setTags] = useState<string[]>(['Property', 'Electric', 'Study', 'Vehicle', 'Property', 'Electric', 'Study', 'Vehicle',  ]);
  const [inputVisible, setInputVisible] = useState(false);

  // Handle tag close (removal)
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags); // Update the tags state to remove the tag
  };

  // Handle adding new category (tag)
  const handleAddNewCategory = (newCategory: string) => {
    if (newCategory && !tags.includes(newCategory.trim())) {
      setTags([...tags, newCategory.trim()]); // Add the new tag if it's not already in the list
    }
  };

  // Toggle the visibility of the input field in Tags component
  const triggerTagInput = () => {
    setInputVisible(true);
  };

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Available Categories</h1>
        {/* Button stays at the top-right */}
        <Buttons
          onClick={triggerTagInput}
          className="flex items-center bg-[#5E7FD3] hover:bg-[#5E7FD3] text-white px-4 py-2 rounded-2xl"
        >
          <Plus className="mr-2" /> Add New Category
        </Buttons>
      </div>
      {/* Pass the inputVisible state and toggle function to Tags */}
      <div className='w-1/3'>
      <Tags
        tags={tags}
        handleAddNewCategory={handleAddNewCategory}
        handleClose={handleClose}
        inputVisible={inputVisible}
        setInputVisible={setInputVisible}
      />
      </div>
    </div>
  );
};

export default CategoryManagement;
