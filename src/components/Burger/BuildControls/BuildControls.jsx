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
            <p >Current Price: <strong>{props.totalprice}</strong>{'\u20B9'}</p>
           {controls.map((ctrl)=>(
               <BuildControl 
               key={ctrl.label} 
               label={ctrl.label} 
               added={()=>props.addedingredient(ctrl.type)} 
               removed={()=>props.removeIngredientHandler(ctrl.type)}
               disabled={props.disabled[ctrl.type]}
              
               />
           ))}
         

        </div>
        
     );
}
 
export default buildcontrols;