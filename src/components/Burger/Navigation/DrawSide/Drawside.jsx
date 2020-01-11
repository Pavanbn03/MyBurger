import React from 'react';
import classes from './Drawside.css'
const drawside = (props) => {
    return ( 
        <div className={classes.DrawerToggle} onClick={props.setsidebarHandler}>
            <div></div>
            <div></div>
            <div></div>
            
        </div>
     );
}
 
export default drawside;