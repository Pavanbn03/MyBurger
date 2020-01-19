import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addingredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREIDENT,
        ingredientName:name
    }
}
export const removeingredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREIDENT,
        ingredientName:name
    }
}
export const setingredients =(ingredients)=>{
    console.log('stored')
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredient:ingredients
    }
}
export const fetchingredientfailed =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
        
    }
}
export const initingredients=()=>{
    return dispatch =>{
        axios.get('https://burgerbuilder03031998.firebaseio.com/ingredients.json')
        .then(response=>{
                dispatch(setingredients(response.data))
                console.log('fetched',response.data)})
            .catch(error=>{dispatch(fetchingredientfailed())})
    }
}