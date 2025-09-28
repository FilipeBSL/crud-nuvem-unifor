import React, { useState, useEffect } from 'react';

function ItemForm({ onSave, editingItem }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (editingItem) {
      setNome(editingItem.nome);
    } else {
      setNome('');
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() === '') return;
    onSave({ nome });
    setNome('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite um nome"
      />
      <button type="submit">{editingItem ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
}

export default ItemForm;
