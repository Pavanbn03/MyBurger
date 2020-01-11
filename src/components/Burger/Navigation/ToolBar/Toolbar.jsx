import React, {Component} from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import DrawSide from '../DrawSide/Drawside'
import NavigationItems from '../NavigationItems/NavigationItems'
class Toolbar extends Component{
    render(){
        return(
        <header className={classes.Toolbar}>
            
        <DrawSide setsidebarHandler ={this.props.setsidebarHandler} />
        <Logo />
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>

        );
    }
} 
 
export default Toolbar; 