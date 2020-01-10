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
        totalprice:30
    }
    addIngredientHandler=(type)=>{
        const olding=this.state.ingredient[type];
        const updateding=olding+1;
        const updatestateing={...this.state.ingredient};
        updatestateing[type]=updateding;
        const oldprice=this.state.totalprice;
        const newprice=oldprice+INGREDIENT_PRICEs[type];
        this.setState({totalprice:newprice,ingredient:updatestateing})

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
    }
    render() { 
        const disableinfo={...this.state.ingredient}
        for (let key in disableinfo){
            disableinfo[key]=disableinfo[key]<=0
        }
        return ( 
            <AUX>
                <Burger ingredients={this.state.ingredient} />
                <BuildControls totalprice={this.state.totalprice} disabled={disableinfo}data={this.state.ingredient} addedingredient={this.addIngredientHandler} removeIngredientHandler={this.removeIngredientHandler} />

            </AUX>
         );
    }
}
 
export default BurgerBuilder;