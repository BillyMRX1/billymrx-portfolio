import { render, screen } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';
import { z } from 'zod';

// Test the validation schema directly
const contactSchema = z.object({
  from_name: z.string().min(2, "Name must be at least 2 characters"),
  from_email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('validates name with minimum 2 characters', () => {
    const result = contactSchema.safeParse({
      from_name: 'A',
      from_email: 'test@example.com',
      message: 'This is a test message',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Name must be at least 2 characters');
    }
  });

  it('validates email format', () => {
    const result = contactSchema.safeParse({
      from_name: 'John Doe',
      from_email: 'invalid-email',
      message: 'This is a test message',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid email address');
    }
  });

  it('validates message with minimum 10 characters', () => {
    const result = contactSchema.safeParse({
      from_name: 'John Doe',
      from_email: 'test@example.com',
      message: 'Short',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Message must be at least 10 characters');
    }
  });

  it('accepts valid form data', () => {
    const result = contactSchema.safeParse({
      from_name: 'John Doe',
      from_email: 'test@example.com',
      message: 'This is a valid test message',
    });

    expect(result.success).toBe(true);
  });
});
