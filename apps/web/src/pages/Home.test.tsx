import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import Home from './Home';
describe('Home Page', () => {
  it('renders hero heading and primary CTA', () => {
    render(<Home />);

    expect(
      screen.getAllByRole('heading', { name: /Celebrate Quality Craftsmanship at KTL/i })[0]
    ).toBeInTheDocument();

    const cta = screen.getAllByRole('link', { name: /Learn More/i })[0];
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/company/our-story');
  });

  it('renders primary hero image with alt text', () => {
    render(<Home />);

    expect(
      screen.getAllByAltText(/Kattali Textile Limited manufacturing team and operations/i)[0]
    ).toBeInTheDocument();
  });

  it('eventually loads below-the-fold sections', async () => {
    render(<Home />);

    const timeout = 15000;
    expect(
      await screen.findByRole('heading', { name: /Our Products/i }, { timeout })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /Our Certifications/i }, { timeout })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Investor Snapshot/i, {}, { timeout })
    ).toBeInTheDocument();
  });
});
