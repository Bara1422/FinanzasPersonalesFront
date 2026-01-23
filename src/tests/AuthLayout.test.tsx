import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AuthLayout from '@/features/auth/components/AuthLayout'

describe('AuthLayout', () => {
  it('renderiza el título y el contenido', () => {
    render(
      <AuthLayout title="Iniciar sesión">
        <p>Contenido de prueba</p>
      </AuthLayout>
    )

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })
})
