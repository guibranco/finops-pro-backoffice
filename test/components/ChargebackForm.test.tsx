import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChargebackForm from '../../components/ChargebackForm';

describe('ChargebackForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('logs the chargeback after submission and resets the form afterwards', () => {
    render(<ChargebackForm />);

    fireEvent.change(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1'), {
      target: { value: 'OUT001234567-1-1-VEH-1' },
    });
    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[0], { target: { value: '75' } });
    const textInputs = screen.getAllByRole('textbox');
    fireEvent.change(textInputs[1], { target: { value: 'CB-1234' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit Chargeback/i }));

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Chargeback Logged!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Submit Chargeback')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1')).toHaveValue('');
  });
});
