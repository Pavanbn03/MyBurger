import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    const transformedingredient = Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i) =>{
             return <BurgerIngredient type={igkey} key={igkey+i} />
        });
    });
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
           {transformedingredient}
            <BurgerIngredient type="bread-bottom" />
            

        </div>
    );
}
 
export default burger;