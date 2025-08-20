from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000")

    # 2. Assert: Check if the main heading is visible.
    heading = page.get_by_role("heading", name="📖 Imam Ahmad Raza Books")
    heading.wait_for()

    # 3. Assert: Check if at least one book is displayed.
    # We'll look for the title of the first book in our mock data.
    book_title = page.get_by_text("Fatawa-e-Razviyya")
    book_title.wait_for()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
