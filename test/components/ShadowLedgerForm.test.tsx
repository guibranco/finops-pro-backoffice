import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ShadowLedgerForm from '../../components/ShadowLedgerForm';

describe('ShadowLedgerForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('confirms the sync after submission', () => {
    render(<ShadowLedgerForm />);

    fireEvent.change(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1'), {
      target: { value: 'OUT001234567-1-1-VEH-1' },
    });
    const submitButton = screen.getByRole('button', { name: /Resend to Shadow Ledger/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Successfully Synced!')).toBeInTheDocument();
  });

  it('lists recent syncs', () => {
    render(<ShadowLedgerForm />);

    expect(screen.getByText('Recent Syncs')).toBeInTheDocument();
    expect(screen.getAllByText(/OUT001234567-1-1-VEH-/)).toHaveLength(3);
  });
});
