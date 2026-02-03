import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EditDeleteButtons } from '@/components/common/EditDeletButtons';
import type { Transaction } from '@/types/transaction.types';

describe('EditDeleteButtons', () => {
  const mockTransaction = {
    id_transaccion: 1,
    id_usuario: 10,
    id_categoria: 3,
    monto: 1000,
    descripcion: 'Compra supermercado',
    fecha: '2024-01-01',
  } as Transaction;

  const onEditMock = vi.fn();
  const onDeleteMock = vi.fn();

  const setup = (isDeleting = false) => {
    render(
      <EditDeleteButtons
        transaction={mockTransaction}
        onEdit={onEditMock}
        onDelete={onDeleteMock}
        isDeleting={isDeleting}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza los botones de editar y eliminar', () => {
    setup();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('llama a onEdit con la transacción al hacer click en editar', () => {
    setup();

    const editButton = screen.getAllByRole('button')[0];
    fireEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(mockTransaction);
  });

  it('llama a onDelete con el id de la transacción al hacer click en eliminar', () => {
    setup();

    const deleteButton = screen.getAllByRole('button')[1];
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(mockTransaction.id_transaccion);
  });

  it('deshabilita los botones cuando isDeleting es true', () => {
    setup(true);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
