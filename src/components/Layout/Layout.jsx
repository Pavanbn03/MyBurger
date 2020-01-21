import React,{Component} from 'react';
import AUX from '../../hoc/auxlilary';
import {connect} from 'react-redux'
import classes from './Layout.css'
import ToolBar from '../Burger/Navigation/ToolBar/Toolbar';
import SideDrawer from '../Burger/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state={
        showdrawer:false
    }
    showbackdropclosed=()=>{
        this.setState((prevState)=>{
            return {showdrawer:!prevState.showdrawer}
        })
    }
    setsidebarHandler=()=>{
        this.setState((prevState)=>{
             return {showdrawer:!prevState.showdrawer}
        })
    }
    render(){
        return(
            <AUX>
    <ToolBar isAuth={this.props.isAuthenticated} setsidebarHandler={this.setsidebarHandler} />
    <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showdrawer} closed={this.showbackdropclosed} />
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </AUX>
        );
    }
}  

const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);