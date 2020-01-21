import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import witherrorhandling from '../../hoc/withErrorHandling/witherrorhandling'
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import * as actions from '../../store/actions/index'
import {connect}  from 'react-redux'
class Orders extends Component {
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    render() { 
        let display=<Spinner />;
        if(!this.props.loading){
                display=Object.keys(this.props.orders)
                .map(keys=>{
                return <Order orders={this.props.orders[keys].ingredients} key={keys} price={+this.props.orders[keys].price} />
            })
        }
         
        return ( <div>
            {display}
           
        </div> );
    }
}
const mapStateToProps = state =>{
    return{
        orders : state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
 

const mapDispatchToProps =dispatch =>{
    return{
        onFetchOrders : (token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(witherrorhandling(Orders,axios)) ;