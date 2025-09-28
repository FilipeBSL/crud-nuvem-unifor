import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://crud-nuvem-unifor.onrender.com/items';

  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // Fetch inicial
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar itens');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Salvar item
  const handleSave = async (item) => {
    if (!isAuthenticated) return alert('Faça login para salvar itens');

    try {
      const token = await getAccessTokenSilently();
      let res, data;

      if (editingItem) {
        res = await fetch(`${API_URL}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(item)
        });
        data = await res.json();
        setItems(items.map(i => i.id === data.id ? data : i));
        setEditingItem(null);
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(item)
        });
        data = await res.json();
        setItems([...items, data]);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar item');
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleDelete = async (item) => {
    if (!isAuthenticated) return alert('Faça login para deletar itens');

    try {
      const token = await getAccessTokenSilently();
      await fetch(`${API_URL}/${item.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setItems(items.filter(i => i.id !== item.id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar item');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CRUD em Nuvem - Unifor</h1>

      {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Login</button>}
      {isAuthenticated && (
        <>
          <p>Bem-vindo, {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </>
      )}

      {isAuthenticated ? (
        <>
          {loading && <p>Carregando itens...</p>}
          <ItemForm onSave={handleSave} editingItem={editingItem} disabled={loading} />
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} disabled={loading} />
        </>
      ) : (
        <p>Faça login para visualizar e gerenciar os itens.</p>
      )}
    </div>
  );
}

export default App;
