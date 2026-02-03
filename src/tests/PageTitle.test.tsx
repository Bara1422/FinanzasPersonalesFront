import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageTitle } from '@/components/common/PageTitle';

describe('PageTitle', () => {
  const props = {
    title: 'Dashboard',
    subtitle: 'Resumen general de tus finanzas',
  };

  it('renderiza el título y el subtítulo correctamente', () => {
    render(<PageTitle {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
  });
});
