import { render, screen, fireEvent } from '@testing-library/react';
import ItemForm from './ItemForm';

describe('ItemForm', () => {
  test('renderiza corretamente e chama onSave', () => {
    const onSaveMock = jest.fn();
    render(<ItemForm onSave={onSaveMock} editingItem={null} />);

    const input = screen.getByPlaceholderText(/Digite um nome/i);
    const button = screen.getByText(/Adicionar/i);

    // Simula digitar algo
    fireEvent.change(input, { target: { value: 'Novo Item' } });
    expect(input.value).toBe('Novo Item');

    // Simula submit
    fireEvent.click(button);
    expect(onSaveMock).toHaveBeenCalledWith({ nome: 'Novo Item' });
  });

  test('não chama onSave se input vazio', () => {
    const onSaveMock = jest.fn();
    render(<ItemForm onSave={onSaveMock} editingItem={null} />);

    const button = screen.getByText(/Adicionar/i);
    fireEvent.click(button);
    expect(onSaveMock).not.toHaveBeenCalled();
  });
});
