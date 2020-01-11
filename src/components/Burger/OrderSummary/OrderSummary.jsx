import React from 'react';
import AUX from '../../../hoc/auxlilary'
import Button from '../../UI/Buttons/Button'
const ordersummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredient)
    .map( igkey =>{
        return <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredient[igkey]}
        </li>
    });
    return ( <AUX>
        <h3>Your Order</h3>
        <p>A Delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}

        </ul>
        <p>Total Price: <strong>{props.totalprice}</strong>{'\u20B9'}</p>
        <p>Continue to CheckOut</p>
        <Button btnType={"Danger"} clicked={props.purchaseCancled}>Cancel</Button>
        <Button btnType={"Success"} clicked={props.purchaseContinue}>Continue</Button>
    </AUX> );
}
 
export default ordersummary;