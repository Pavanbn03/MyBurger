import * as actionTypes from './actions';
const initialstate={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            Bacon:0
        },
        totalprice:30
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
        default:return state;
    }
}
export default reducer;