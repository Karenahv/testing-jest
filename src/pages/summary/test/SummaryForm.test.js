import {render, fireEvent, screen, waitForElementToBeRemoved} from '@testing-library/react'
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";


test('checkbox initial and when is clicked', ()=>{
    render(<SummaryForm/>)
    const checkbox = screen.getByRole('checkbox', {name:'I agree to Terms and Conditions'})
    const button = screen.getByRole('button', {name:'Confirm order'})
    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
    userEvent.click(checkbox)
    expect(button).toBeEnabled()
    userEvent.click(checkbox)
    expect(button).toBeDisabled()
})

test('popover responds to hover', async ()=>{
    render(<SummaryForm/>)
    //pop over starts hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivery/i);
    expect(nullPopover).not.toBeInTheDocument()

    //pop over appears upon mouseover of checkbox label
    const terms = screen.getByText(/terms and conditions/i);
    userEvent.hover(terms)

    const popover = screen.getByText(/No ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument()
    //popover disappears when we mose out

    userEvent.unhover(terms)
   await waitForElementToBeRemoved(()=>screen.queryByText(/No ice cream will actually be delivered/i));


})