import React, { Component } from 'react';
import AUX from '../../hoc/auxlilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Modal/Spinner/Spinner'
import WithErrorHandling from '../../hoc/withErrorHandling/witherrorhandling'

const INGREDIENT_PRICEs={
    salad:20,
    Bacon:30,
    cheese:10,
    meat:25

}
class BurgerBuilder extends Component {
    state = {  
        ingredient:null,
        totalprice:30,
        purchaseable:false,
        purchasing:false,
        shouldloading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://burgerbuilder03031998.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredient:response.data})})
            .catch(error=>{this.setState({error:true})})
    }
    addIngredientHandler=(type)=>{
        const olding=this.state.ingredient[type];
        const updateding=olding+1;
        const updatestateing={...this.state.ingredient};
        updatestateing[type]=updateding;
        const oldprice=this.state.totalprice;
        const newprice=oldprice+INGREDIENT_PRICEs[type];
        this.setState({totalprice:newprice,ingredient:updatestateing})
        this.updatePurchaseHistroy(updatestateing);

    }
    removeIngredientHandler=(type)=>{
        const olding=this.state.ingredient[type];
        if(olding<=0){
       
            return;
        }
        const updateding=olding-1;
        const updatestateing={...this.state.ingredient};
        updatestateing[type]=updateding;
        const oldprice=this.state.totalprice;
        const newprice=oldprice-INGREDIENT_PRICEs[type];
        this.setState({totalprice:newprice,ingredient:updatestateing})
        this.updatePurchaseHistroy(updatestateing);
    }
    updatePurchaseHistroy(ingredient){
        const ingredients={...ingredient};
       const sum =Object.keys(ingredients).map(igkey=>{
           return ingredients[igkey];
       }).reduce((sum,ele)=>{
           return sum + ele;
       })
       this.setState({purchaseable:sum>0})
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancel=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
    //     this.setState({shouldloading:true})
    //     const orders={
    //         ingredients:this.state.ingredient,
    //         price:this.state.totalprice,
    //         customer:{
    //             name:"Pavan",
    //             address:{
    //                 country:'India',
    //                 street:"teststreet1",
    //                 zipcode:'560064'
    //             },
    //             email:'email@gmail.com',
    //             deliveryMethod:'prime'
    //         }
    //     }
       
    //     axios.post('/orders.json',orders)
    //     .then(response=>
    //         this.setState({shouldloading:false,purchasing:false})

    // )
    //     .catch(error=>this.setState({shouldloading:false,purchasing:false}))

    const queryParams=[];
    for(let i in this.state.ingredient){
        queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredient[i])); 
    }
    queryParams.push('price='+this.state.totalprice)
    const querystring = queryParams.join('&');
    
    this.props.history.push({
        pathname:'/checkout/',
        search:'?'+ querystring
    });
    //this.props.history.push('/checkout')
    }
    
    
    
    render() { 
        let ordersummary=null
    
        
        const disableinfo={...this.state.ingredient}
        for (let key in disableinfo){
            disableinfo[key]=disableinfo[key]<=0
        }
        let burger=this.state.error ? <p>Ingredients Can't be Loaded</p>:<Spinner />
        if(this.state.ingredient){
           burger=( <AUX>
            <Burger ingredients={this.state.ingredient} />
            <BuildControls 
            purchasable={this.state.purchaseable} 
            totalprice={this.state.totalprice} 
            disabled={disableinfo}
            data={this.state.ingredient} 
            addedingredient={this.addIngredientHandler} 
            removeIngredientHandler={this.removeIngredientHandler} 
            ordered={this.purchaseHandler} />
            </AUX>);
            ordersummary=<OrderSummary ingredient={this.state.ingredient}
            purchaseCancled={this.purchaseCancel}
            purchaseContinue={this.purchaseContinue}
            totalprice={this.state.totalprice}
            ></OrderSummary>
           
            }
        if(this.state.shouldloading){
            ordersummary=<Spinner />
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
 
export default WithErrorHandling(BurgerBuilder,axios) ;