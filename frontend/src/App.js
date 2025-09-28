import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (item) => {
    if (editingIndex !== null) {
      const newItems = [...items];
      newItems[editingIndex] = item;
      setItems(newItems);
      setEditingIndex(null);
    } else {
      setItems([...items, item]);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>CRUD em Nuvem - Unifor</h1>
      <ItemForm 
        onSave={handleSave} 
        editingItem={editingIndex !== null ? items[editingIndex] : null} 
      />
      <ItemList 
        items={items} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;
