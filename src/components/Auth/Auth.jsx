import Input from '../UI/Input/Input';
import classes from './Auth.css'
import Button from '../UI/Buttons/Button';
import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Modal/Spinner/Spinner'
class Auth extends Component {
    state = { 
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
        },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
        }
     },isSignUp:true
    }
    checkValidity(value,rule){
        let isVaid= true;
        if(rule.required){
            isVaid=value.trim() !== '' && isVaid;
        }
        if(rule.minLength){
            isVaid=value.length>=rule.minLength && isVaid;
        }
        if(rule.maxLength){
            isVaid=value.length<=rule.maxLength && isVaid;
        }
        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isVaid = pattern.test(value) && isVaid
        }

        if (rule.isNumeric) {
            const pattern = /^\d+$/;
            isVaid = pattern.test(value) && isVaid
        }
        return isVaid;
    }
    inputchangeHandler =(event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }
    submitHandler =(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }
    switchmethod =()=>{
        this.setState((prevstate)=>{
            return {isSignUp: !prevstate.isSignUp}
        })
    }
    render() { 
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form =formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputchangeHandler(event,formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                />
            
        ))
        if(this.props.loading){
              form =<Spinner />  
        }
        let errormessage=null;
        if (this.props.error){
            errormessage=(<p>{this.props.error.message}</p>);
        }
        return ( 
            <div className={classes.Auth}>
                {errormessage}
                <form onSubmit={this.submitHandler}>
                {form}
                
                <Button btnType="Success">SUBMIT</Button>
                
                </form>
                
                <Button btnType="Danger" clicked={this.switchmethod}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGN  UP'}</Button>
            </div>
         );
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Auth);