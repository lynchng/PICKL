import { Page } from '@playwright/test'
import { placeOrder } from './placeOrder.js'

export class productList {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Click [ + ] button to increase the quantity
   */
  async clickIncrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' })
    const increaseButton = broccoliProduct.locator('.increment')
    await increaseButton.click()
  }

  /**
   * Click [ - ] button to decrease the quantity
   */
  async clickDecrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' })
    const decreaseButton = broccoliProduct.locator('.decrement')
    await decreaseButton.click()
  }

  /**
   * Click cart icon to open cart modal
   */
  async openCartModal() {
    const orderPage = new placeOrder(this.page)
    await orderPage.openCartModal()
  }

  /**
   * Remove product from the cart
   */
  async clickRemoveBtn() {
    await this.page.waitForSelector('.cart-preview.active', { state: 'visible' })
    const removeButton = this.page.locator('.cart-item .product-remove')
    await removeButton.waitFor({ state: 'visible' })
    await removeButton.click()
    await this.page.waitForSelector('.cart-empty-selector', { timeout: 5000 })
  }
}
