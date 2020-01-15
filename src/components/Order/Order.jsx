import React from 'react';
import classes from './Order.css'
const order = (props) => {
    const ingredients=[]
    for(let ingredientname in props.orders){
        ingredients.push({
            name:ingredientname,
            amount:props.orders[ingredientname] 
        });
    }
    const ingredientoutput = ingredients.map(igkey=>{
        return <span style={{textTransform:'capitalize',display:'inline-block', border:'1px solid #ccc', padding:'2px',margin:'0 8px'}} key={igkey.name}>{igkey.name}: {igkey.amount} </span>
    });
    return ( <div className={classes.Order}>
        
        <p>Ingredients: {ingredientoutput}</p>
        <p>Total Price:<strong>{props.price}{'\u20B9'}</strong></p>
    </div> );
}
 
export default order;