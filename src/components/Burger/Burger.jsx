import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let transformedingredient = Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i) =>{
             return <BurgerIngredient type={igkey} key={igkey+i} />
        });
    }).reduce((arr,ele)=>{
        return arr.concat(ele)
    },[]);
    if (transformedingredient.length===0){
        transformedingredient="Please start adding ingredients!!"
    }
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
           {transformedingredient}
            <BurgerIngredient type="bread-bottom" />
            

        </div>
    );
}
 
export default burger;