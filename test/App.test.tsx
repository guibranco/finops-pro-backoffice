import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the dashboard by default', () => {
    const { container } = render(<App />);

    expect(container.querySelector('header h2')?.textContent).toBe('Dashboard');
    expect(screen.getByText('Pending Refunds')).toBeInTheDocument();
  });

  it('navigates between views via the sidebar', () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Chargebacks' }));

    expect(container.querySelector('header h2')?.textContent).toBe('Chargebacks');
    expect(screen.getByText('Report Chargeback')).toBeInTheDocument();
  });

  it('toggles the notifications popover', () => {
    const { container } = render(<App />);

    fireEvent.click(container.querySelector('header button')!);

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('New Chargeback Request')).toBeInTheDocument();
  });

  it('collapses the sidebar when the toggle is clicked', () => {
    const { container } = render(<App />);

    expect(screen.getByText('FinOps Pro')).toBeInTheDocument();

    fireEvent.click(container.querySelector('aside button')!);

    expect(screen.queryByText('FinOps Pro')).not.toBeInTheDocument();
    expect(screen.getByText('FP')).toBeInTheDocument();
  });
});
