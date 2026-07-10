import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StatusCheck from '../../components/StatusCheck';

describe('StatusCheck', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('does nothing when searching with an empty reference', () => {
    render(<StatusCheck />);

    fireEvent.submit(screen.getByPlaceholderText(/Enter Transaction Reference/i).closest('form')!);

    expect(screen.queryByText('Querying ledger systems...')).not.toBeInTheDocument();
  });

  it('shows a loading state then renders the looked-up transaction', () => {
    render(<StatusCheck />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Transaction Reference/i), {
      target: { value: 'OUT001234567-1-1-VEH-1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('Querying ledger systems...')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Querying ledger systems...')).not.toBeInTheDocument();
    expect(screen.getByText('OUT001234567-1-1-VEH-1')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('Suggested Actions')).toBeInTheDocument();
  });
});
