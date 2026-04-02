import React from 'react';
import './Item.css';

const Item = ({ item, onRemove }) => {
  return (
    <li className="item">
      <span>{item.name}</span>
      <button 
        onClick={() => onRemove(item.id)}
        className="remove-button"
      >
        Remove
      </button>
    </li>
  );
};

export default Item;
