import React, { useState, useEffect } from 'react';

function ItemForm({ onSave, editingItem, disabled }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (editingItem) setNome(editingItem.nome);
    else setNome('');
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') return alert('Digite um nome válido');
    onSave({ nome });
    setNome('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite um nome"
        disabled={disabled}
        style={{ padding: '8px', marginRight: '10px', width: '250px' }}
      />
      <button type="submit" disabled={disabled}>{editingItem ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
}

export default ItemForm;
