import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button component', () => {
  it('renderiza el texto del botón', () => {
    render(<Button>Guardar</Button>)

    expect(screen.getByText('Guardar')).toBeInTheDocument()
  })
})
