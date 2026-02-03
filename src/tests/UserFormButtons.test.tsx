import { fireEvent, render, screen } from '@testing-library/react';
import type { UseFormReturn } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserFormButtons } from '@/components/forms/UserFormButtons';
import type { FormData } from '@/features/account/UserFormData';

describe('UserFormButtons', () => {
  const onChangeEdittingMock = vi.fn();

  const formMock = {
    reset: vi.fn(),
  } as unknown as UseFormReturn<FormData>;

  const defaultProps = {
    isEditting: false,
    onChangeEditting: onChangeEdittingMock,
    form: formMock,
    uniqueId: 'user',
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el botón "Editar Perfil" cuando no está editando', () => {
    render(<UserFormButtons {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /editar perfil/i }),
    ).toBeInTheDocument();
  });

  it('llama a onChangeEditting al hacer click en "Editar Perfil"', () => {
    render(<UserFormButtons {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /editar perfil/i }));

    expect(onChangeEdittingMock).toHaveBeenCalledTimes(1);
  });

  it('muestra los botones "Cancelar" y "Guardar cambios" cuando isEditting es true', () => {
    render(<UserFormButtons {...defaultProps} isEditting={true} />);

    expect(
      screen.getByRole('button', { name: /cancelar/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /guardar cambios/i }),
    ).toBeInTheDocument();
  });

  it('al hacer click en "Cancelar" resetea el formulario y cambia el estado de edición', () => {
    render(<UserFormButtons {...defaultProps} isEditting={true} />);

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));

    expect(formMock.reset).toHaveBeenCalledTimes(1);
    expect(onChangeEdittingMock).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón submit cuando isLoading es true', () => {
    render(
      <UserFormButtons {...defaultProps} isEditting={true} isLoading={true} />,
    );

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.getAttribute('type') === 'submit');

    expect(submitButton).toBeDisabled();
  });
});
