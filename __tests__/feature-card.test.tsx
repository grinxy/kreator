import { render, screen } from "@testing-library/react"
import { FeatureCard } from "@/components/ui/feature-card"
import { Network } from "lucide-react"

describe("FeatureCard", () => {
  const mockProps = {
    icon: Network,
    title: "Red Verificada",
    description: "Conecta con profesionales verificados de la industria con historial comprobado de éxito.",
  }

  it("renders with correct content", () => {
    render(<FeatureCard {...mockProps} />)

    expect(screen.getByText("Red Verificada")).toBeInTheDocument()
    expect(screen.getByText(/Conecta con profesionales verificados/)).toBeInTheDocument()
  })

  it("has proper heading hierarchy", () => {
    render(<FeatureCard {...mockProps} />)

    const heading = screen.getByRole("heading", { level: 3 })
    expect(heading).toHaveTextContent("Red Verificada")
  })

  it("icon is properly hidden from screen readers", () => {
    render(<FeatureCard {...mockProps} />)

    const icon = screen.getByRole("img", { hidden: true })
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })
})
