import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Options from "../Options";


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