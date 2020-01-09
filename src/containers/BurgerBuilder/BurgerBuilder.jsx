import React, { Component } from 'react';
import AUX from '../../hoc/auxlilary'
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    state = {  
        ingredient:{
            salad:1,
            Bacon:2,
            cheese:1,
            meat:1
        }
    }
    render() { 
        return ( 
            <AUX>
                <Burger ingredients={this.state.ingredient} />
                <div>Burger Control</div>

            </AUX>
         );
    }
}
 
export default BurgerBuilder;