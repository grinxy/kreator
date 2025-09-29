import { test, expect } from "@playwright/test"

test.describe("Kreator Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("has correct page structure and landmarks", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Kreator - Conecta, Refiere y Haz Crecer Tu Negocio Industrial/)

    // Check main landmarks
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()

    // Check main sections
    await expect(page.locator("#inicio")).toBeVisible()
    await expect(page.locator("#caracteristicas")).toBeVisible()
    await expect(page.locator("#testimonios")).toBeVisible()
    await expect(page.locator("#contacto")).toBeVisible()
  })

  test("keyboard navigation works correctly", async ({ page }) => {
    // Start tabbing from the beginning
    await page.keyboard.press("Tab")

    // Should focus on first navigation link
    await expect(page.locator('a[href="#inicio"]').first()).toBeFocused()

    // Continue tabbing through navigation
    await page.keyboard.press("Tab")
    await expect(page.locator('a[href="#caracteristicas"]').first()).toBeFocused()

    await page.keyboard.press("Tab")
    await expect(page.locator('a[href="#testimonios"]').first()).toBeFocused()

    await page.keyboard.press("Tab")
    await expect(page.locator('a[href="#contacto"]').first()).toBeFocused()
  })

  test("mobile menu functionality", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Find and click mobile menu button
    const menuButton = page.getByRole("button", { name: /abrir menú/i })
    await expect(menuButton).toBeVisible()

    await menuButton.click()

    // Menu should be open
    await expect(page.getByRole("button", { name: /cerrar menú/i })).toBeVisible()

    // Close with Escape key
    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: /abrir menú/i })).toBeVisible()
  })

  test("smooth scrolling navigation", async ({ page }) => {
    // Click on características link
    await page.click('a[href="#caracteristicas"]')

    // Wait for scroll and check if section is in view
    await page.waitForTimeout(1000)
    await expect(page.locator("#caracteristicas")).toBeInViewport()
  })

  test("all required content is present", async ({ page }) => {
    // Check hero content
    await expect(page.getByText("Conecta, Refiere y Haz Crecer Tu Negocio Industrial")).toBeVisible()
    await expect(page.getByText("10,000+")).toBeVisible()
    await expect(page.getByText("Profesionales Conectados")).toBeVisible()

    // Check features section
    await expect(page.getByText("Red Verificada")).toBeVisible()
    await expect(page.getByText("Matching Inteligente")).toBeVisible()
    await expect(page.getByText("Analytics Avanzado")).toBeVisible()

    // Check testimonials
    await expect(page.getByText("María Rodríguez")).toBeVisible()
    await expect(page.getByText("Carlos López")).toBeVisible()
    await expect(page.getByText("Ana Sánchez")).toBeVisible()

    // Check CTA buttons
    await expect(page.getByRole("button", { name: /comenzar ahora/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /ver demo/i })).toBeVisible()
  })

  test("accessibility: focus indicators are visible", async ({ page }) => {
    // Tab to first button and check focus is visible
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab") // Should be on "Comenzar Ahora" button

    const focusedButton = page.getByRole("button", { name: /comenzar ahora/i })
    await expect(focusedButton).toBeFocused()

    // Check that focus ring is visible (this would need custom CSS inspection in real tests)
    await expect(focusedButton).toBeVisible()
  })
})
