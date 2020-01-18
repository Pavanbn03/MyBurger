import React, {Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../Checkout/Contact-data/Contactdata';
import {connect} from 'react-redux'
class Checkout extends Component {
    oncancelHandler=()=>{
        this.props.history.goBack();
        
    }
    oncontinueHandler=()=>{
        this.props.history.replace( '/checkout/contact-data' );

    }
    
    
    render() { 

        return ( 
        <div>
            <CheckoutSummary ingredients={this.props.ings} oncancel={this.oncancelHandler} oncontinue={this.oncontinueHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
           
        </div> );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);