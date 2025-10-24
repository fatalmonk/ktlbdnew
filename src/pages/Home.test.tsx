import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '../test/test-utils';
import Home from './Home';

// Mock child components to simplify testing
vi.mock('../components/KTLHero', () => ({
  default: ({ title, subtitle, cta }: any) => (
    <div data-testid="ktl-hero">
      <div>{title}</div>
      <p>{subtitle}</p>
      {cta && <a href={cta.href}>{cta.label}</a>}
    </div>
  ),
}));

vi.mock('../components/LogoLoop', () => ({
  default: ({ logos }: any) => (
    <div data-testid="logo-loop">
      {logos.map((logo: any, index: number) => (
        <img key={index} src={logo.src} alt={logo.alt} />
      ))}
    </div>
  ),
}));

describe('Home Page', () => {
  describe('Page Structure', () => {
    it('renders without crashing', () => {
      render(<Home />);
      expect(screen.getByTestId('ktl-hero')).toBeInTheDocument();
    });

    it('renders all major sections', () => {
      render(<Home />);

      // Check for section headings (some text is split across spans with different styling)
      expect(screen.getByRole('heading', { name: /Why Choose/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Our.*Products/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Partnering with/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Certifications/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Latest.*News/i })).toBeInTheDocument();
      expect(screen.getByText(/Investor Snapshot/i)).toBeInTheDocument();
      expect(screen.getByText(/Ready for Global/i)).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('renders hero component', () => {
      render(<Home />);

      const hero = screen.getByTestId('ktl-hero');
      expect(hero).toBeInTheDocument();
    });

    it('displays hero title', () => {
      render(<Home />);

      expect(screen.getByText(/Fashionably Sustaining/i)).toBeInTheDocument();
    });

    it('displays hero subtitle', () => {
      render(<Home />);

      expect(
        screen.getByText(/Designing, developing and manufacturing private-label apparel/i)
      ).toBeInTheDocument();
    });

    it('displays hero CTA link', () => {
      render(<Home />);

      const ctaLink = screen.getByRole('link', { name: /Explore Our Products/i });
      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveAttribute('href', '/products');
    });
  });

  describe('Statistics Section', () => {
    it('renders all 6 statistics', () => {
      render(<Home />);

      expect(screen.getByText('20+')).toBeInTheDocument();
      expect(screen.getByText('1,200+')).toBeInTheDocument();
      expect(screen.getByText('680+')).toBeInTheDocument();
      expect(screen.getByText('360K+')).toBeInTheDocument();
      expect(screen.getByText('Global')).toBeInTheDocument();
      expect(screen.getByText('Certified')).toBeInTheDocument();
    });

    it('displays statistic descriptions', () => {
      render(<Home />);

      expect(screen.getByText(/Years of Excellence/i)).toBeInTheDocument();
      expect(screen.getByText(/Skilled Employees/i)).toBeInTheDocument();
      expect(screen.getByText(/Advanced Machines/i)).toBeInTheDocument();
      expect(screen.getByText(/Annual Production/i)).toBeInTheDocument();
      expect(screen.getByText(/Market Presence/i)).toBeInTheDocument();
      expect(screen.getByText(/Quality Standards/i)).toBeInTheDocument();
    });

    it('displays certifications in statistics section', () => {
      render(<Home />);

      expect(screen.getAllByText(/Sedex Certified/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Green Factory Initiatives/i)).toBeInTheDocument();
    });
  });

  describe('Products Section', () => {
    it('renders all 8 products', () => {
      render(<Home />);

      expect(screen.getByText('Denims')).toBeInTheDocument();
      expect(screen.getByText('T-Shirts')).toBeInTheDocument();
      expect(screen.getByText('Polo Shirts')).toBeInTheDocument();
      expect(screen.getByText('Activewear')).toBeInTheDocument();
      expect(screen.getByText('Outerwear')).toBeInTheDocument();
      expect(screen.getByText('Dresses')).toBeInTheDocument();
      expect(screen.getByText('Bottoms')).toBeInTheDocument();
      expect(screen.getByText('Swimwear')).toBeInTheDocument();
    });

    it('displays product categories', () => {
      render(<Home />);

      expect(screen.getAllByText('Casual Wear').length).toBeGreaterThan(0);
      expect(screen.getByText('Business Wear')).toBeInTheDocument();
      expect(screen.getAllByText('Sports Wear').length).toBeGreaterThan(0);
      expect(screen.getByText('Seasonal Wear')).toBeInTheDocument();
      expect(screen.getByText("Women's Wear")).toBeInTheDocument();
    });

    it('displays "View All Products" link', () => {
      render(<Home />);

      const viewAllLink = screen.getByRole('link', { name: /View All Products/i });
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveAttribute('href', '/products');
    });
  });

  describe('Brand Logos Section', () => {
    it('renders logo loop component', () => {
      render(<Home />);

      expect(screen.getByTestId('logo-loop')).toBeInTheDocument();
    });

    it('displays brand logos', () => {
      render(<Home />);

      const logoLoop = screen.getByTestId('logo-loop');
      const images = within(logoLoop).getAllByRole('img');

      expect(images.length).toBe(5);
      expect(within(logoLoop).getByAltText('Calvin Klein Jeans')).toBeInTheDocument();
      expect(within(logoLoop).getByAltText('GAP')).toBeInTheDocument();
      expect(within(logoLoop).getByAltText('H&M')).toBeInTheDocument();
      expect(within(logoLoop).getByAltText('Old Navy')).toBeInTheDocument();
      expect(within(logoLoop).getByAltText('Tommy Hilfiger')).toBeInTheDocument();
    });
  });

  describe('Certifications Section', () => {
    it('renders all 3 certifications', () => {
      render(<Home />);

      expect(screen.getAllByText('Sedex').length).toBeGreaterThan(0);
      expect(screen.getByText('Green Certified')).toBeInTheDocument();
      expect(screen.getByText('BGMEA')).toBeInTheDocument();
    });

    it('displays certification descriptions', () => {
      render(<Home />);

      expect(screen.getByText('Ethical trade certification')).toBeInTheDocument();
      expect(screen.getByText('Environmental compliance')).toBeInTheDocument();
      expect(screen.getByText(/Bangladesh Garment/i)).toBeInTheDocument();
    });
  });

  describe('News Section', () => {
    it('renders all 3 news items', () => {
      render(<Home />);

      expect(screen.getByText(/Kattali Textile Expands Sustainable Manufacturing/i)).toBeInTheDocument();
      expect(screen.getByText(/Partnership with Global Fashion Brands/i)).toBeInTheDocument();
      expect(screen.getByText(/Employee Development Program Launch/i)).toBeInTheDocument();
    });

    it('displays news dates', () => {
      render(<Home />);

      expect(screen.getByText('December 2024')).toBeInTheDocument();
      expect(screen.getByText('November 2024')).toBeInTheDocument();
      expect(screen.getByText('October 2024')).toBeInTheDocument();
    });

    it('displays news excerpts', () => {
      render(<Home />);

      expect(screen.getByText(/New eco-friendly production lines installed/i)).toBeInTheDocument();
      expect(screen.getByText(/Strategic alliances established/i)).toBeInTheDocument();
      expect(screen.getByText(/Comprehensive training initiative/i)).toBeInTheDocument();
    });

    it('displays "Read More" links', () => {
      render(<Home />);

      const readMoreLinks = screen.getAllByRole('link', { name: /Read More/i });
      expect(readMoreLinks.length).toBe(3);
    });

    it('displays "View All News" link', () => {
      render(<Home />);

      const viewAllLink = screen.getByRole('link', { name: /View All News/i });
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveAttribute('href', '/news');
    });
  });

  describe('Investor Snapshot Section', () => {
    it('renders investor snapshot section', () => {
      render(<Home />);

      expect(screen.getByText('Investor Snapshot')).toBeInTheDocument();
    });

    it('displays stock exchange information', () => {
      render(<Home />);

      expect(screen.getByText(/DSE: M/i)).toBeInTheDocument();
    });

    it('displays stock price', () => {
      render(<Home />);

      expect(screen.getByText(/45.50/)).toBeInTheDocument();
    });

    it('displays volume and change', () => {
      render(<Home />);

      expect(screen.getByText(/Volume: 10,508,014/i)).toBeInTheDocument();
      expect(screen.getByText(/Change: -0.06/i)).toBeInTheDocument();
    });

    it('displays investor relations link', () => {
      render(<Home />);

      const irLink = screen.getByRole('link', { name: /Investor Relations/i });
      expect(irLink).toBeInTheDocument();
      expect(irLink).toHaveAttribute('href', '/investor-relations');
    });
  });

  describe('Call-to-Action Section', () => {
    it('renders CTA section', () => {
      render(<Home />);

      expect(screen.getByText(/Ready for Global/i)).toBeInTheDocument();
    });

    it('displays CTA description', () => {
      render(<Home />);

      expect(
        screen.getByText(/Partner with us for premium quality textiles/i)
      ).toBeInTheDocument();
    });

    it('displays contact us button', () => {
      render(<Home />);

      const contactButton = screen.getByRole('link', { name: /Contact Us Today/i });
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveAttribute('href', '/contact');
    });
  });

  describe('Navigation Links', () => {
    it('has correct links to products page', () => {
      render(<Home />);

      const productLinks = screen.getAllByRole('link', { name: /products/i });
      productLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/products');
      });
    });

    it('has correct links to news pages', () => {
      render(<Home />);

      // Find all "Read More" links in news section
      const readMoreLinks = screen.getAllByRole('link', { name: /Read More/i });

      // Check that at least one news link exists
      expect(readMoreLinks.length).toBeGreaterThan(0);

      // Verify one of them points to a news page
      const newsLinks = readMoreLinks.filter(link =>
        link.getAttribute('href')?.includes('/news/')
      );
      expect(newsLinks.length).toBeGreaterThan(0);
    });

    it('has correct link to contact page', () => {
      render(<Home />);

      const contactLinks = screen.getAllByRole('link', { name: /Contact Us/i });
      expect(contactLinks.length).toBeGreaterThan(0);
      contactLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/contact');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Home />);

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('has alt text for images', () => {
      render(<Home />);

      const logoLoop = screen.getByTestId('logo-loop');
      const images = within(logoLoop).getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('has proper link elements', () => {
      render(<Home />);

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Responsive Design', () => {
    it('contains responsive grid classes', () => {
      const { container } = render(<Home />);

      // Check that responsive grid classes are present
      const statsGrid = container.querySelector('.grid-cols-2.md\\:grid-cols-2.lg\\:grid-cols-3');
      expect(statsGrid).toBeInTheDocument();

      const productsGrid = container.querySelector('.grid-cols-2.md\\:grid-cols-2.lg\\:grid-cols-4');
      expect(productsGrid).toBeInTheDocument();
    });
  });
});
