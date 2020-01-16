import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputElements=null;
    switch(props.elementType){
        case 'input':
            inputElements=<input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />;
            break;
        case 'textarea':
            inputElements=<textarea onChange={props.changed} className={classes.InputElement} {...props} />;
            break;
        case 'select':
                inputElements=(
                    <select onChange={props.changed} className={classes.InputElement}
                    value={props.value}>
                    {props.elementConfig.options.map(option =>(
                        <option key={option.value} value ={option.value}>{option.displayValue}</option>
                    ))}</select>
                )
                break;
            break;
        default:
            inputElements=<input className={classes.InputElement} {...props} />;
    }
    return ( 
    <div className={classes.Input}>
        <label className={classes.Label}> {props.label}</label>
        {inputElements}
    </div> );
}
 
export default input;