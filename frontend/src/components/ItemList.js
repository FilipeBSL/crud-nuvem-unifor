import React from 'react';

function ItemList({ items, onEdit, onDelete, disabled }) {
  if (items.length === 0) return <p>Nenhum item cadastrado.</p>;

  return (
    <div>
      <h2>Lista de Itens</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            {item.nome}{' '}
            <button onClick={() => onEdit(item)} disabled={disabled}>Editar</button>{' '}
            <button onClick={() => onDelete(item)} disabled={disabled}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
