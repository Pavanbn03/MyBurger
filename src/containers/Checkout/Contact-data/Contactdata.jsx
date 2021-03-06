import React, { Component } from 'react';
import classes from './Contactdata.css';
import Button from '../../../components/UI/Buttons/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Modal/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandling/witherrorhandling';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6,
                    isNumeric: true
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                }, 
                valid:false,
                touched:false
            },
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
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest' ,
                validation:{},
                valid:true ,
                
            }
        },
        formValid:false,
     
     
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
    orderHandler=(e)=>{
        console.log('clicked')
        e.preventDefault()
       const formdata= {};
       for (let formid in this.state.orderForm){
           formdata[formid]=this.state.orderForm[formid].value;
       }
            const orders={
                ingredients:this.props.ings,
                price:this.props.price,
                orderData:formdata,
                userId:this.props.userId
            } 
       this.props.onBurgerStart(orders,this.props.token)
      
       
           
    }
    inputchangeHandler = (event,identifier)=>{
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedformelelement={...updatedOrderForm[identifier]}
        updatedformelelement.value=event.target.value;
        updatedformelelement.valid=this.checkValidity(updatedformelelement.value,updatedformelelement.validation)
        updatedformelelement.touched=true;
        updatedOrderForm[identifier]=updatedformelelement;
        let formisvalid=true;
        for ( let id in updatedOrderForm){
            formisvalid = updatedOrderForm[id].valid && formisvalid;
        }
  
        this.setState({orderForm:updatedOrderForm,formValid:formisvalid})

    }
    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                 {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputchangeHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={!this.state.formValid} >ORDER</Button>
        
             
            </form>
        );
        if(this.props.loading){
            form=<Spinner />;
            
        }
        
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
              
                {form}
              
                
            </div>
            
            
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerbuilder.ingredients,
        price:state.burgerbuilder.totalprice,
        loading:state.order.loading,
        token : state.auth.token,
        userId:state.auth.userId
       
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onBurgerStart: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios) );