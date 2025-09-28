import React from 'react';

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div>
      <h2>Lista de Itens</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.nome} 
            <button onClick={() => onEdit(item)}>Editar</button>
            <button onClick={() => onDelete(item)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
