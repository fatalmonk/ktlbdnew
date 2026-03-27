import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
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

    const timeout = 15000;
    expect(
      await screen.findByRole('heading', { name: /Our Products/i }, { timeout })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /Our Values/i }, { timeout })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Investor Snapshot/i, {}, { timeout })
    ).toBeInTheDocument();
  });
});
