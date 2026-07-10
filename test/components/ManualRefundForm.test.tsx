import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ManualRefundForm from '../../components/ManualRefundForm';

describe('ManualRefundForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1'), {
      target: { value: 'OUT001234567-1-1-VEH-1' },
    });
    fireEvent.change(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1-RF'), {
      target: { value: 'OUT001234567-1-1-VEH-1-RF' },
    });
    fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '125.50' } });
    fireEvent.change(screen.getByPlaceholderText('GB 00 XXXX 0000 0000 0000'), {
      target: { value: 'GB00XXXX00000000000' },
    });
  };

  it('shows a submitting state and then confirms success', () => {
    render(<ManualRefundForm />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: /Process Refund/i }));

    expect(screen.getByRole('button')).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Refund Processed!')).toBeInTheDocument();
  });

  it('reverts to the idle state after the success message times out', () => {
    render(<ManualRefundForm />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: /Process Refund/i }));

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByText('Refund Processed!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Process Refund')).toBeInTheDocument();
  });
});
