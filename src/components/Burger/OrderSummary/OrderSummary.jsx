import React, {Component} from 'react';
import AUX from '../../../hoc/auxlilary'
import Button from '../../UI/Buttons/Button'
class Ordersummary extends Component{

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredient)
    .map( igkey =>{
        return <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredient[igkey]}
        </li>});
        return(
             <AUX>
        <h3>Your Order</h3>
        <p>A Delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}

        </ul>
        <p>Total Price: <strong>{this.props.totalprice}</strong>{'\u20B9'}</p>
        <p>Continue to CheckOut</p>
        <Button btnType={"Danger"} clicked={this.props.purchaseCancled}>Cancel</Button>
        <Button btnType={"Success"} clicked={this.props.purchaseContinue}>Continue</Button>
    </AUX>
        )
    }
} 

 
export default Ordersummary;