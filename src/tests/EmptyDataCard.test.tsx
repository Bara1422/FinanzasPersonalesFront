import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyDataCard } from '@/components/common/EmptyDataCard';

describe('EmptyDataCard', () => {
  const props = {
    title: 'Sin datos',
    description: 'No hay información disponible',
    text: 'Aún no se registraron movimientos',
  };

  it('renderiza el título, la descripción y el texto', () => {
    render(<EmptyDataCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(props.text)).toBeInTheDocument();
  });
});
