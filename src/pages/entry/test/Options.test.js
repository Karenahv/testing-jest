import {render, screen, waitForElementToBeRemoved} from '../../../test-utils/testing-library-utils'
import Options from "../Options";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import userEvent from "@testing-library/user-event";


test('displays image for each scoop  option from server', async ()=>{
    render(<Options optionType='scoops'/>)

    //find images
    const scoopImages = await screen.findAllByRole('img', {name:/scoop$/i});
    expect(scoopImages).toHaveLength(2)

    // CONFIRM ALT TEXT OF IMAGES
    const altText = scoopImages.map((element)=>element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image for each tooping option from server', async ()=>{
    render(<Options optionType="toppings"/>)

    //find toppings
    const toppingsImages = await screen.findAllByRole('img', {name:/topping$/i});

    //confirm alt text of images
    const altText = toppingsImages.map((element)=>element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);

})

test('not update total for invalid number of scoops', async ()=>{
    render(<Options optionType='scoops'/>)

    //expect button be enabled after adding scoop
    //expect input to be invalid with negative number
    const vanillaInput = await screen.findByRole('spinbutton', {
        name:'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '-1')

    //make sure scoops subtotal hasn't updated
    const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
    expect(scoopsSubtotal).toBeInTheDocument()
})