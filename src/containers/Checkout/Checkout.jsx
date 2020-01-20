import React, {Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/Contact-data/Contactdata';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
class Checkout extends Component {
    oncancelHandler=()=>{
        this.props.history.goBack();
        
    }
    oncontinueHandler=()=>{
        
        this.props.history.replace( '/checkout/contact-data' );

    }

    
    
    render() {
        let summary=<Redirect to='/' />;
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary=(
                <div>
                    {purchasedRedirect}
                     <CheckoutSummary ingredients={this.props.ings} oncancel={this.oncancelHandler} oncontinue={this.oncontinueHandler}/>
                     <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }

        return summary;
        
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerbuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);