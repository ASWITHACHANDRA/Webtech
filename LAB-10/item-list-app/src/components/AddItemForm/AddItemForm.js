import React, { useState } from 'react';
import './AddItemForm.css';

const AddItemForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    onAdd(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter new item..."
        className="item-input"
      />
      <button type="submit" className="add-button">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;