import React, {Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary'
import {Route,Redirect, withRouter} from 'react-router-dom'
import ContactData from '../Checkout/Contact-data/Contactdata';
import {connect} from 'react-redux';
class Checkout extends Component {
    oncancelHandler=()=>{
        this.props.history.goBack();
        
    }
    oncontinueHandler=()=>{
        
        this.props.history.push('/checkout/contact-data' );

    }

    
    
    render() {
        let summary=<Redirect to='/' />;
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary=(
                <div>
                    {purchasedRedirect}
                     <CheckoutSummary ingredients={this.props.ings} oncancel={this.oncancelHandler} oncontinue={this.oncontinueHandler}/>
                     {console.log("Path: ",this.props)}
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

export default withRouter(connect(mapStateToProps)(Checkout));