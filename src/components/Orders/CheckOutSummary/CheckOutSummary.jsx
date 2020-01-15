import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Buttons/Button'
import classes from './CheckOutSummary.css'
const checkoutsummary = (props) => {
    return ( 
    <div className={classes.CheckOutSummary}>
        <h1>We hope it tastes good!</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType='Danger' clicked={props.oncancel}>CANCEL</Button>
        <Button btnType='Success' clicked={props.oncontinue}>CONTINUE</Button>
    </div> );
}
 
export default checkoutsummary;