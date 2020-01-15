import React, {Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../Checkout/Contact-data/Contactdata'
class Checkout extends Component {
    state = { 
        ingredients:null,
        totalprice:0
    }
  
    componentWillMount(){
        
    
         const query = new URLSearchParams(this.props.location.search);
         
         const ingredients={}
         let tprice=0;
       for (let params of query.entries()){
           if(params[0]==='price'){
               tprice=+params[1]
           }
           else{
               ingredients[params[0]]= +params[1];
            }
          
        
         }
         
         this.setState({ingredients:ingredients,totalprice:tprice})
    }

    
    oncancelHandler=()=>{
        this.props.history.goBack();
        
    }
    oncontinueHandler=()=>{
        this.props.history.replace( '/checkout/contact-data' );

    }
    
    
    render() { 

        return ( 
        <div>
            <CheckoutSummary ingredients={this.state.ingredients} oncancel={this.oncancelHandler} oncontinue={this.oncontinueHandler}/>
            <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalprice={this.state.totalprice} {...props}/>)} />
           
        </div> );
    }
}
 
export default Checkout;