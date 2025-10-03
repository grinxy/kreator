import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CTASection } from "@/components/organisms/cta-section"

describe("CTA Buttons", () => {
  it("renders CTA buttons with proper accessibility labels", () => {
    render(<CTASection />)

    const primaryButton = screen.getByRole("button", { name: /comenzar gratis - sin compromiso/i })
    const secondaryButton = screen.getByRole("button", { name: /solicitar demostración personalizada/i })

    expect(primaryButton).toBeInTheDocument()
    expect(secondaryButton).toBeInTheDocument()
  })

  it("buttons are keyboard accessible", async () => {
    const user = userEvent.setup()
    render(<CTASection />)

    await user.tab()
    expect(screen.getByRole("button", { name: /comenzar gratis/i })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: /solicitar demostración/i })).toHaveFocus()
  })

  it("displays trust indicators", () => {
    render(<CTASection />)

    expect(screen.getByText(/sin tarjeta de crédito requerida/i)).toBeInTheDocument()
    expect(screen.getByText(/configuración en 5 minutos/i)).toBeInTheDocument()
    expect(screen.getByText(/soporte gratuito incluido/i)).toBeInTheDocument()
  })
})
