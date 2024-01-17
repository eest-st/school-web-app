import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Login from '../Login';

describe('Login Screen', () => {
  it('should render the title and description of the login screen', () => {
    render(<Login />);

    expect(screen.getByText(/inicia sesion/i)).toBeInTheDocument();
    expect(screen.getByText(/ingrese su usuario y contrasena/i)).toBeInTheDocument();
  });

  it('should render the username and password inputs', () => {
    render(<Login />);

    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(<Login />);

    expect(screen.getByRole('button', { name: /iniciar sesion/i })).toBeInTheDocument();
  });
});
