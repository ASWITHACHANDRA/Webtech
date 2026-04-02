import React, { useState } from 'react';
import Item from '../Item/Item';
import AddItemForm from '../AddItemForm/AddItemForm';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "React Basics" },
    { id: 2, name: "State Management" },
    { id: 3, name: "Hooks Deep Dive" }
  ]);

  const [nextId, setNextId] = useState(4);

  const addItem = (name) => {
    const newItem = {
      id: nextId,
      name: name
    };
    setItems(prevItems => [...prevItems, newItem]);
    setNextId(prevId => prevId + 1);
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="item-list-container">
      <h1>Dynamic Item List</h1>
      
      <AddItemForm onAdd={addItem} />

      <div className="list-section">
        <h2>Items ({items.length})</h2>
        
        {items.length === 0 ? (
          <p className="empty-message">No items yet. Add some above!</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <Item 
                key={item.id} 
                item={item} 
                onRemove={removeItem} 
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemList;