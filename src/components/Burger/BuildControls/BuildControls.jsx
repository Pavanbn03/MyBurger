import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from "./BuildControls.css"
const controls=[
    {label:"salad",type:"salad"},
    {label:"Meat",type:"meat"},
    {label:"Cheese",type:"cheese"},
    {label:"Bacon",type:"Bacon"},

]


const buildcontrols = (props) => {
    return ( 
        
        <div className= {classes.BuildControls}>
            
           {controls.map((ctrl)=>(
               <BuildControl 
               key={ctrl.label} 
               label={ctrl.label} 
               added={()=>props.addedingredient(ctrl.type)} 
               removed={()=>props.removeIngredientHandler(ctrl.type)}
               disabled={props.disabled[ctrl.type]}
              
               />
           ))}
           <p >Current Price: <strong>{props.totalprice}</strong>{'\u20B9'}</p>
         <button onClick={props.ordered} disabled={!props.purchasable}className={classes.OrderButton}>ORDER NOW</button>

        </div>
        
     );
}
 
export default buildcontrols;