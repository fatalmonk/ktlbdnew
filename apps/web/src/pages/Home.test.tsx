import { describe, it, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import Home from "./Home";
describe("Home Page", () => {
  it("renders hero heading and primary CTA", () => {
    render(<Home />);

    expect(
      screen.getAllByRole("heading", {
        name: /Your Global Supply Chain Starts in Bangladesh/i,
      })[0],
    ).toBeInTheDocument();

    const cta = screen.getAllByRole("link", { name: /Get in Touch/i })[0];
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("renders primary hero image with alt text", () => {
    render(<Home />);

    expect(
      screen.getAllByAltText(
        /Global logistics and garment supply chain operations at Kattali Textile Limited/i,
      )[0],
    ).toBeInTheDocument();
  });

  it("eventually loads below-the-fold sections", async () => {
    render(<Home />);

    const timeout = 15000;
    expect(
      await screen.findByRole(
        "heading",
        { name: /Our Products/i },
        { timeout },
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole(
        "heading",
        { name: /Our Certifications/i },
        { timeout },
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Investor Snapshot/i, {}, { timeout }),
    ).toBeInTheDocument();
  });
});
