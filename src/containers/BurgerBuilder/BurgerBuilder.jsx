import React, { Component } from 'react';
import AUX from '../../hoc/auxlilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Modal/Spinner/Spinner'
import WithErrorHandling from '../../hoc/withErrorHandling/witherrorhandling';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'


class BurgerBuilder extends Component {
    state = {  
        purchasing:false,
    }
    componentDidMount(){
        this.props.initingredient()
    }
    updatePurchaseHistroy(ingredient){
        const ingredients={...ingredient};
       const sum =Object.keys(ingredients).map(igkey=>{
           return ingredients[igkey];
       }).reduce((sum,ele)=>{
           return sum + ele;
       })
       return sum>0;
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancel=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
        this.props.onInitPurchase()
  
        this.props.history.push('/checkout/');
    }
    
    
    
    render() { 
        let ordersummary=null
    
        
        const disableinfo={...this.props.ingrs}
        for (let key in disableinfo){
            disableinfo[key]=disableinfo[key]<=0
        }
        let burger=this.props.error ? <p>Ingredients Can't be Loaded</p>:<Spinner />
        if(this.props.ingrs){
           burger=( <AUX>
            <Burger ingredients={this.props.ingrs} />
            <BuildControls 
            purchasable={this.updatePurchaseHistroy(this.props.ingrs)} 
            totalprice={this.props.price} 
            disabled={disableinfo}
           
            addedingredient={this.props.onIngredientAdded} 
            removeIngredientHandler={this.props.onIngredientRemoved} 
            ordered={this.purchaseHandler} />
            </AUX>);
            ordersummary=<OrderSummary ingredient={this.props.ingrs}
            purchaseCancled={this.purchaseCancel}
            purchaseContinue={this.purchaseContinue}
            totalprice={this.props.price}
            ></OrderSummary>
           
            }
        
        return ( 
            <AUX>
                
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancel}>
                    {ordersummary}
                </Modal>
                {burger}
          


            </AUX>
         );
    }
}
const mapStateToProps=state=>{
    return{
        ingrs:state.burgerbuilder.ingredients,
        price:state.burgerbuilder.totalprice,
        error:state.burgerbuilder.error,
        // purchased:state.order.purchased
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded : (ingname)=>dispatch(actions.addingredient(ingname)),
        onIngredientRemoved : (ingname)=>dispatch(actions.removeingredient(ingname)),
        initingredient: ()=>dispatch(actions.initingredients()),
        onInitPurchase : ()=>dispatch(actions.purchaseinit())
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandling(BurgerBuilder,axios));