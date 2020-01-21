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
export const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId')

    return{
        type:actiontypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout=(expireTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expireTime*1000)

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
            const expireDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expireDate',expireDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(checkAuthTimeout(response.data.expiresIn))
            //console.log(response)
        })
        .catch(err=>{
            console.log(err.response.data);
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirect =(path)=>{
    return{
        type:actiontypes.SET_AUTH_REDIRECT,
        path:path
    }
}
export const checkAuthState=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            const expireDate = new Date(localStorage.getItem('expireDate'));
            const userId = localStorage.getItem('userId');
            if(expireDate >= new Date()){
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expireDate.getTime()- new Date().getTime())/1000))
            }
            else{
                dispatch(logout())
            }
        }
    }
}