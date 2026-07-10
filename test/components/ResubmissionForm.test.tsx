import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ResubmissionForm from '../../components/ResubmissionForm';

describe('ResubmissionForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('queues the resubmission after submission', () => {
    render(<ResubmissionForm />);

    fireEvent.change(screen.getByPlaceholderText('e.g. OUT001234567-1-1-VEH-1'), {
      target: { value: 'OUT001234567-1-1-VEH-1' },
    });
    const submitButton = screen.getByRole('button', { name: /Request Resubmission/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByText('Resubmission Queued!')).toBeInTheDocument();
  });

  it('lists recent resubmissions', () => {
    render(<ResubmissionForm />);

    expect(screen.getByText('Recent Resubmissions')).toBeInTheDocument();
    expect(screen.getAllByText(/OUT001234567-1-1-VEH-/)).toHaveLength(3);
  });
});
