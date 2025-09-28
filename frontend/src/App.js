import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const API_URL = 'https://crud-nuvem-unifor.onrender.com/items';

  // Fetch inicial
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(console.error);
  }, []);

  const handleSave = (item) => {
    if (editingItem) {
      fetch(`${API_URL}/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      .then(res => res.json())
      .then(updated => {
        setItems(items.map(i => i.id === updated.id ? updated : i));
        setEditingItem(null);
      });
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      .then(res => res.json())
      .then(newItem => setItems([...items, newItem]));
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleDelete = (item) => {
    fetch(`${API_URL}/${item.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => setItems(items.filter(i => i.id !== item.id)));
  };

  return (
    <div>
      <h1>CRUD em Nuvem - Unifor</h1>
      <ItemForm onSave={handleSave} editingItem={editingItem} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
