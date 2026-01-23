import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FormDialogHeader } from '@/components/forms/FormHeader';

describe('FormDialogHeader', () => {
  const props = {
    title: 'Editar Perfil',
    description: 'Actualiza tus datos personales',
  };

  it('renderiza el título y la descripción correctamente', () => {
    render(
      <Dialog open>
        <DialogContent>
          <FormDialogHeader {...props} />
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
