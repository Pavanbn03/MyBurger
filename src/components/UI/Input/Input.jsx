import React from 'react';
import classes from './Input.css';
const input = (props) => {
    let inputElements=null;
    const inputclasses=[classes.InputElement]
    if(props.invalid && props.touched){
        inputclasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case 'input':
            inputElements=<input onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case 'textarea':
            inputElements=<textarea onChange={props.changed} className={inputclasses.join(' ')} {...props} />;
            break;
        case 'select':
                inputElements=(
                    <select onChange={props.changed} className={inputclasses.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(option =>(
                        <option key={option.value} value ={option.value}>{option.displayValue}</option>
                    ))}</select>
                )
                break;
            
        default:
            inputElements=<input className={inputclasses.join(' ')} {...props} />;
    }
    return ( 
    <div className={classes.Input}>
        <label className={classes.Label}> {props.label}</label>
        {inputElements}
    </div> );
}
 
export default input;