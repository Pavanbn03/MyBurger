import * as actionTypes from '../actions/actionTypes';
const initialstate={
        ingredients:null,
        totalprice:30,
        error:false
}
const INGREDIENT_PRICEs={
    salad:20,
    Bacon:30,
    cheese:10,
    meat:25

}
const reducer =(state=initialstate,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREIDENT :
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                totalprice:state.totalprice+INGREDIENT_PRICEs[action.ingredientName]

            }
        case actionTypes.REMOVE_INGREIDENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalprice:state.totalprice-INGREDIENT_PRICEs[action.ingredientName]
            }
            case actionTypes.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients:action.ingredient,
                    error:false
                }
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:false
                }
        default:return state;
    }
}
export default reducer;