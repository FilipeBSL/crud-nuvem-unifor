// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const API_URL = 'https://crud-nuvem-unifor.onrender.com/items';

  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // Fetch inicial
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchItems = async () => {
      try {
        // Obtenha token se quiser proteger API
        // const token = await getAccessTokenSilently();
        const res = await fetch(API_URL /*, { headers: { Authorization: `Bearer ${token}` } } */);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, [isAuthenticated]);

  const handleSave = async (item) => {
    if (!isAuthenticated) return alert("Faça login para salvar itens");

    if (editingItem) {
      const res = await fetch(`${API_URL}/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' /*, Authorization: `Bearer ${token}` */ },
        body: JSON.stringify(item),
      });
      const updated = await res.json();
      setItems(items.map(i => i.id === updated.id ? updated : i));
      setEditingItem(null);
    } else {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' /*, Authorization: `Bearer ${token}` */ },
        body: JSON.stringify(item),
      });
      const newItem = await res.json();
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleDelete = async (item) => {
    if (!isAuthenticated) return alert("Faça login para deletar itens");

    await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' /*, headers: { Authorization: `Bearer ${token}` } */ });
    setItems(items.filter(i => i.id !== item.id));
  };

  return (
    <div>
      <h1>CRUD em Nuvem - Unifor</h1>

      {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Login</button>}
      {isAuthenticated && (
        <>
          <p>Bem-vindo, {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </>
      )}

      <ItemForm onSave={handleSave} editingItem={editingItem} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
