import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationitems = (props) => {
    return (  
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ?<NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link="/logout" exact>Logout</NavigationItem>
            :<NavigationItem link="/auth" exact>Authenticate</NavigationItem>}

        </ul>
    );
}
 
export default navigationitems;