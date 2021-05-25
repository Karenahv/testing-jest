import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import React, {useState} from "react";

const ScoopOption = ({name, imagePath, updateItemCount}) => {
    const [tcChecked, setTcChecked] = useState(false);
    const handleChange = (event) => {
        setTcChecked(event.target.checked)
        const value = event.target.checked ? 1 : 0
        updateItemCount(name, value)
    }
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
            <img style={{width: '75%'}} src={`http://localhost:3030/${imagePath}`}
                 alt={`${name} topping`}/>
            <Form.Group controlId={`${name}-topping-checkbox`}>
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={handleChange}
                    label={name}
                />
            </Form.Group>
        </Col>
    )
}


export default ScoopOption