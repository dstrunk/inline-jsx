import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MiniCart from "../src/js/components/MiniCart";
import eventBus from "../src/js/eventBus";

afterEach(cleanup)

describe('MiniCart', () => {
  it('renders "Your shopping cart is empty." if no items are in the cart', async () => {
    render(<MiniCart />)

    await userEvent.click(screen.getByTestId('minicart-button'))

    expect(screen.queryByTestId('minicart-no-items')).toBeTruthy()
    expect(screen.queryByTestId('minicart-items')).toBeNull()
  })

  it('renders items in the cart', async () => {
    render(<MiniCart />)

    eventBus.publish('MINICART_ADD', {
      product: { id: 1, title: 'Lorem Ipsum', price: 12.99 },
      quantity: 1,
    });

    await userEvent.click(screen.getByTestId('minicart-button'))

    expect(screen.queryByTestId('minicart-no-items')).toBeNull()
    expect(screen.queryByTestId('minicart-items')).toBeNull()
  })
})
