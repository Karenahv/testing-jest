import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import SummaryForm from "../../summary/SummaryForm";
import OrderEntry from "../OrderEntry";

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType='scoops'/>, {wrapper: OrderDetailsProvider})

    //make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false})
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')

})

test('update topping subtotal when toppings change', async () => {
    render(<Options optionType='toppings'/>, {wrapper: OrderDetailsProvider})
    // make sure subtotal starts out at $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false})
    expect(toppingsSubtotal).toHaveTextContent('0.00')

    //find and tick one checkbox
    const checkBox = await screen.findByRole('checkbox', {name: 'Hot fudge'})
    userEvent.click(checkBox)
    expect(toppingsSubtotal).toHaveTextContent('1.50')

    //check another topping
    const checkBox2 = await screen.findByRole('checkbox', {name: 'Cherries'})
    userEvent.click(checkBox2)
    expect(toppingsSubtotal).toHaveTextContent('3.00')

    //unchecked a checkbox
    userEvent.click(checkBox)
    expect(toppingsSubtotal).toHaveTextContent('1.50')

})

describe('grant total', () => {
    test('grand total updates properly if scoop is added first', async () => {
        // Test that the total starts out at $0.00
        render(<OrderEntry/>, {wrapper: OrderDetailsProvider});
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/});
        expect(grandTotal).toHaveTextContent('0.00');

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('4.00');

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5.50');
    });

    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry/>, {wrapper: OrderDetailsProvider})
        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });
        userEvent.click(cherriesCheckbox);
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/});
        expect(grandTotal).toHaveTextContent('1.50');

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');
    })
    test('grand total updates properly if items is removed', async () => {
        render(<OrderEntry/>, {wrapper: OrderDetailsProvider})
        // add cherries
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });
        userEvent.click(cherriesCheckbox);
        // grand total $1.50

        // update vanilla scoops to 2; grand total should be $5.50
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla',
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        // remove 1 scoop of vanilla and check grand total
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        // check grand total
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/});
        expect(grandTotal).toHaveTextContent('3.50');

        // remove cherries and check grand total
        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('2.00');


    })
})