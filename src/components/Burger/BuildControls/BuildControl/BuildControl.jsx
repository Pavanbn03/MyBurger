import React from 'react';
import classes from './BuildControl.css';
const buildcontrol = (props) => {
    const style2={
        display: 'block',
      font: 'inherit',
      padding: '5px',
      margin: '0 5px',
      width: '80px',
      border: '1px solid #AA6817',
      cursor: 'pointer',
      outline: 'none'
  }
 

    return ( 
    
      
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button style={style2} onClick={props.added}>More</button>
            <button style={style2} onClick={props.removed} disabled={props.disabled} >Less</button>

        </div>

     );
}
 
export default buildcontrol;