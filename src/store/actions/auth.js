import * as actiontypes from './actionTypes';
import axios from 'axios'
export const authStart=()=>{
    return{
        type:actiontypes.AUTH_START
    }
}
export const authSuccess = (token,userId)=>{
    return{
        type:actiontypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail =(error)=>{
    return{
        type:actiontypes.AUTH_FAIL,
        error:error
    }
}
export const auth =(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBH9EUge0fFwpNf15Egcs2QyVEp-dLqX7Q';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBH9EUge0fFwpNf15Egcs2QyVEp-dLqX7Q'
        }
        console.log(authData)
        axios.post(url,authData)
        .then(response=>{
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            //console.log(response)
        })
        .catch(err=>{
            console.log(err.response.data);
            dispatch(authFail(err.response.data.error))
        })
    }
}