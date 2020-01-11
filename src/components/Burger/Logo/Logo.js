import React from 'react';
import classes from './Logo.css'
import burgerlogo from '../../../assets/images/burger-logo.png';
const logo = (props) => {
    return ( <div className={classes.Logo}>
        <img src={burgerlogo} alt="burgerlogo"/>
    </div> );
}
 
export default logo;