import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { FieldFormControllerSelect } from '@/components/forms/FieldFormControllerSelect';
import { Form } from '@/components/ui/form';

type TestForm = {
  category: string;
};

const options = [
  { value: 'food', label: 'Comida' },
  { value: 'services', label: 'Servicios' },
];

const TestComponent = () => {
  const form = useForm<TestForm>({
    defaultValues: {
      category: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <FieldFormControllerSelect
          form={form}
          name="category"
          label="Categoría"
          options={options}
          placeholder="Seleccione una categoría"
          uniqueId="test"
        />
      </form>
    </Form>
  );
};

describe('FieldFormControllerSelect', () => {
  it('renderiza el label y el placeholder', () => {
    render(<TestComponent />);

    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('Seleccione una categoría')).toBeInTheDocument();
  });

  it('renderiza las opciones del select', async () => {
    render(<TestComponent />);

    const trigger = screen.getByRole('combobox', {
      name: /categoría/i,
    }) as HTMLButtonElement;

    expect(await screen.findByText('Comida')).toBeInTheDocument();
    expect(await screen.findByText('Servicios')).toBeInTheDocument();
  });
});
