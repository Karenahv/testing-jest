import axios from 'axios'
import {useEffect, useState} from "react";
import Row from 'react-bootstrap'
import ScoopOption from "./ScoopOption";
import ToopingOption from "./ToopingOption";
import {response} from "msw";
import AlertBanner from "../common/AlertBanner";


const Options =({optionType})=>{
    const[items, setItems] = useState([])
    const [error, setError] = useState(false)
    // optionType is 'scoops' or 'toopings'
    useEffect(()=>{
            axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error)=>{
                //handle error response
                setError(true)
            })

    },[optionType])

    if(error){
        return (
            <AlertBanner></AlertBanner>
        )
    }
    //TODO: replace null with ToopingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;
    const optionsItems = items.map(item=>(
        <ItemComponent
            key={item.id}
            name={item.name}
            imagePath={item.imagePath}/>
            ))
    return(
        <div>
            {optionsItems}
        </div>
    )
}

export default Options