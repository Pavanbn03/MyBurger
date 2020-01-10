import React, { Component } from 'react';
import AUX from '../../hoc/auxlilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICEs={
    salad:20,
    Bacon:30,
    cheese:10,
    meat:25

}
class BurgerBuilder extends Component {
    state = {  
        ingredient:{
            salad:0,
            Bacon:0,
            cheese:0,
            meat:0
        },
        totalprice:30,
        purchaseable:false
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
    render() { 
        const disableinfo={...this.state.ingredient}
        for (let key in disableinfo){
            disableinfo[key]=disableinfo[key]<=0
        }
        return ( 
            <AUX>
                <Burger ingredients={this.state.ingredient} />
                <BuildControls purchasable={this.state.purchaseable} totalprice={this.state.totalprice} disabled={disableinfo}data={this.state.ingredient} addedingredient={this.addIngredientHandler} removeIngredientHandler={this.removeIngredientHandler} />

            </AUX>
         );
    }
}
 
export default BurgerBuilder;