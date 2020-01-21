import *  as actiontypes from '../actions/actionTypes';
import {updateObject} from '../utility'


const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    redirectpath:'/'
    
}
const authStart =(state,action)=>{
    return updateObject(state,{error:null,loading:true})
}
const authSuccess =(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    })
}
const authFail =(state,action)=>{
    return updateObject(state,{error:action.error,loading:false})
}
const authLogOut=(state,action)=>{
    return updateObject(state,{token:null,userId:null})
}
const setAuthRedirect=(state,action)=>{
    return updateObject(state,{redirectpath:action.path})
}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actiontypes.AUTH_START:
            return authStart(state,action)
        case actiontypes.AUTH_SUCCESS:
            return authSuccess(state,action)
        case actiontypes.AUTH_FAIL:
            return authFail(state,action)
        case actiontypes.AUTH_LOGOUT:
            return authLogOut(state,action)
        case actiontypes.SET_AUTH_REDIRECT:
            return setAuthRedirect(state,action)
            default:
                return state;
    }
}

export default reducer;