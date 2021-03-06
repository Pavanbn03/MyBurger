import React from 'react';
import classes from './Modal.css';
import AUX from "../../../hoc/auxlilary";
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => {
    return (
        <AUX>
            <Backdrop show={props.show} clicked={props.modelClosed}/>
        <div className={classes.Modal}
        style={{
            transform : props.show ? 'translateY(0)': 'translateY(-100vh)',
            opacity : props.show ? '1':'0'
        }}>
            {props.children}
        </div>
        </AUX> 
     );
}
 
export default modal;