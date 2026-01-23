import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormLabelField } from '@/components/forms/FormLabelField';

type TestForm = {
  name: string;
};

const TestComponent = () => {
  const form = useForm<TestForm>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormLabelField
          form={form}
          name="name"
          label="Nombre"
          placeholder="Ingrese su nombre"
        />
      </form>
    </Form>
  );
};

describe('FormLabelField', () => {
  it('renderiza el label y el input correctamente', () => {
    render(<TestComponent />);

    expect(screen.getByText('Nombre')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Ingrese su nombre')
    ).toBeInTheDocument();
  });

  it('permite escribir en el input', () => {
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(
      'Ingrese su nombre'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Juan' } });

    expect(input.value).toBe('Juan');
  });
});
