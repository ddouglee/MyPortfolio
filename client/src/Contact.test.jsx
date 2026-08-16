import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import * as contactApi from './api/api-contact';
import auth from './auth/auth-helper';

vi.mock('./api/api-contact', () => ({
  list: vi.fn(),
  create: vi.fn(),
  remove: vi.fn(),
}));

vi.mock('./auth/auth-helper', () => ({
  default: {
    isAuthenticated: vi.fn(),
  },
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('performs full CRUD flow for admin user', async () => {
    const user = userEvent.setup();

    auth.isAuthenticated.mockReturnValue({
      user: { role: 'admin' },
      token: 'fake-token-123',
    });

    const existingContact = {
      _id: 'abc123',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
    };
    contactApi.list.mockResolvedValue([existingContact]);

    render(<Contact />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Jane');        // First Name
    await user.type(inputs[1], 'Smith');       // Last Name
    await user.type(inputs[2], 'jane@example.com'); // Email

    const newContact = {
      _id: 'xyz789',
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane@example.com',
    };
    contactApi.create.mockResolvedValue(newContact);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(contactApi.create).toHaveBeenCalledWith(
      {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane@example.com',
      },
      { t: 'fake-token-123' }
    );

    await waitFor(() => {
      expect(screen.getByText('Contact created')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete contact/i });
    contactApi.remove.mockResolvedValue({});
    await user.click(deleteButton);

    expect(contactApi.remove).toHaveBeenCalledWith(
      { contactId: 'abc123' },
      { t: 'fake-token-123' }
    );

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});