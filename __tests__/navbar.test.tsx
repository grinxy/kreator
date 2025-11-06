import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Navbar } from "@/components/layout/Navbar"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src || "/placeholder.svg"} alt={alt} {...props} />,
}))

describe("Navbar", () => {
  it("renders logo and navigation links", () => {
    render(<Navbar />)

    // Check logo
    expect(screen.getByAltText("Kreator")).toBeInTheDocument()

    // Check navigation links
    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Características")).toBeInTheDocument()
    expect(screen.getByText("Testimonios")).toBeInTheDocument()
    expect(screen.getByText("Contacto")).toBeInTheDocument()

    // Check action buttons
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument()
    expect(screen.getByText("Registrarse")).toBeInTheDocument()
  })

  it("mobile menu toggles correctly", async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    // Find mobile menu button
    const menuButton = screen.getByRole("button", { name: /abrir menú/i })
    expect(menuButton).toBeInTheDocument()

    // Menu should be closed initially
    expect(screen.queryByRole("navigation", { name: /navegación principal/i })).not.toBeVisible()

    // Open menu
    await user.click(menuButton)
    expect(screen.getByRole("button", { name: /cerrar menú/i })).toBeInTheDocument()
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    // Tab through navigation links
    await user.tab()
    expect(screen.getByText("Inicio")).toHaveFocus()

    await user.tab()
    expect(screen.getByText("Características")).toHaveFocus()

    await user.tab()
    expect(screen.getByText("Testimonios")).toHaveFocus()
  })

  it("mobile menu closes with Escape key", async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const menuButton = screen.getByRole("button", { name: /abrir menú/i })
    await user.click(menuButton)

    // Press Escape
    await user.keyboard("{Escape}")
    expect(screen.getByRole("button", { name: /abrir menú/i })).toBeInTheDocument()
  })
})
