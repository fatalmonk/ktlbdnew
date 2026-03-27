import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../test/test-utils';
import Home from './Home';
describe('Home Page', () => {
  it('renders hero heading and primary CTA', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: /Excellence in Textile Manufacturing/i })).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: /Explore Products/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/products');
  });

  it('renders primary hero image with alt text', () => {
    render(<Home />);

    expect(
      screen.getByAltText(
        /Kattali Textile Limited modern manufacturing facility in Chittagong, Bangladesh producing sustainable woven garments/i
      )
    ).toBeInTheDocument();
  });

  it('eventually loads below-the-fold sections', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Our Products/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our Values/i })).toBeInTheDocument();
      expect(screen.getByText(/Investor Snapshot/i)).toBeInTheDocument();
    });
  });
});
