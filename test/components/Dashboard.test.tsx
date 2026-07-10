import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import { ViewType } from '../../types';

describe('Dashboard', () => {
  it('renders the key stats', () => {
    render(<Dashboard setActiveView={vi.fn()} />);

    expect(screen.getByText('Pending Refunds')).toBeInTheDocument();
    expect(screen.getByText('New Chargebacks')).toBeInTheDocument();
    expect(screen.getByText('Completed Today')).toBeInTheDocument();
    expect(screen.getByText('Total Volume')).toBeInTheDocument();
  });

  it('navigates to the manual refund view via the quick action', () => {
    const setActiveView = vi.fn();
    render(<Dashboard setActiveView={setActiveView} />);

    fireEvent.click(screen.getByText('New Manual Refund'));

    expect(setActiveView).toHaveBeenCalledWith(ViewType.MANUAL_REFUND);
  });

  it('navigates to the status check view via the quick action', () => {
    const setActiveView = vi.fn();
    render(<Dashboard setActiveView={setActiveView} />);

    fireEvent.click(screen.getByText('Check Status'));

    expect(setActiveView).toHaveBeenCalledWith(ViewType.STATUS_CHECK);
  });
});
