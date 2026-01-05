import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for the Checkboxes page
 * URL: https://the-internet.herokuapp.com/checkboxes
 */
export class CheckboxesPage {
  readonly page: Page
  readonly checkboxes: Locator

  constructor(page: Page) {
    this.page = page
    this.checkboxes = page.locator('input[type="checkbox"]')
  }

  /**
   * Navigate to the checkboxes page
   */
  async goto() {
    await this.page.goto('/checkboxes')
  }

  /**
   * Get a specific checkbox by index (1-based)
   * @param index - The checkbox number (1 or 2)
   * @returns The checkbox locator
   */
  getCheckbox(index: number): Locator {
    return this.checkboxes.nth(index - 1)
  }

  /**
   * Check if a specific checkbox is checked
   * @param index - The checkbox number (1 or 2)
   * @returns True if checked, false otherwise
   */
  async isChecked(index: number): Promise<boolean> {
    return this.getCheckbox(index).isChecked()
  }

  /**
   * Check a specific checkbox (if not already checked)
   * @param index - The checkbox number (1 or 2)
   */
  async check(index: number) {
    const checkbox = this.getCheckbox(index)
    if (!(await checkbox.isChecked())) {
      await checkbox.check()
    }
  }

  /**
   * Uncheck a specific checkbox (if not already unchecked)
   * @param index - The checkbox number (1 or 2)
   */
  async uncheck(index: number) {
    const checkbox = this.getCheckbox(index)
    if (await checkbox.isChecked()) {
      await checkbox.uncheck()
    }
  }

  /**
   * Toggle a specific checkbox (check if unchecked, uncheck if checked)
   * @param index - The checkbox number (1 or 2)
   */
  async toggle(index: number) {
    await this.getCheckbox(index).click()
  }

  /**
   * Get the count of checkboxes on the page
   * @returns The number of checkboxes
   */
  async getCheckboxCount(): Promise<number> {
    return this.checkboxes.count()
  }
}
