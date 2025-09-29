import { render, screen } from "@testing-library/react"
import { TestimonialCard } from "@/components/home-sections/testimonial/testimonial-card"

describe("TestimonialCard", () => {
  const mockProps = {
    content: "Kreator ha transformado completamente nuestra estrategia de crecimiento.",
    author: "María Rodríguez",
    role: "Directora de Ventas",
    company: "MetalTech",
    initials: "MR",
  }

  it("renders testimonial content correctly", () => {
    render(<TestimonialCard {...mockProps} />)

    expect(screen.getByText(/Kreator ha transformado completamente/)).toBeInTheDocument()
    expect(screen.getByText("María Rodríguez")).toBeInTheDocument()
    expect(screen.getByText("Directora de Ventas, MetalTech")).toBeInTheDocument()
  })

  it("displays 5-star rating with proper accessibility", () => {
    render(<TestimonialCard {...mockProps} />)

    // Check for screen reader text
    expect(screen.getByText("5 de 5 estrellas")).toBeInTheDocument()

    // Check for star icons
    const stars = screen.getAllByRole("img", { hidden: true })
    expect(stars).toHaveLength(5)
  })

  it("shows author initials in avatar", () => {
    render(<TestimonialCard {...mockProps} />)

    expect(screen.getByText("MR")).toBeInTheDocument()
  })
})
