import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../../UI/Backdrop/Backdrop';
import AUX from '../../../../hoc/auxlilary'
const sidedrawer = (props) => {
    let attachedclasses =[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedclasses =[classes.SideDrawer, classes.Open];
    }
   
    
    return ( 
       <AUX><BackDrop show={props.open}  clicked={props.closed}/>
    <div className={attachedclasses.join(' ')} onClick={props.closed}> 
       <div className={classes.Logo}><Logo /></div> 
        <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </div>
             
    </AUX> 
     )
}
 
export default sidedrawer;