import React, { Component } from 'react';
import classes from './Contactdata.css';
import Button from '../../../components/UI/Buttons/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Modal/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

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
                valid:false
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
                valid:false
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
                    minLength:5,
                    maxLength:5
                },
                valid:false
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
                valid:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        shouldloading: false
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
        return isVaid;
    }
    orderHandler=(e)=>{
        e.preventDefault()
        this.setState({shouldloading:true})
       const formdata= {};
       for (let formid in this.state.orderForm){
           formdata[formid]=this.state.orderForm[formid].value;
       }
            const orders={
                ingredients:this.props.ingredients,
                price:this.props.totalprice,
                orderData:formdata
            } 
       
            axios.post('/orders.json',orders)
            .then(response=>{ this.setState({
                shouldloading:false})
                this.props.history.replace('/');
        }
               
        )
            .catch(error=>this.setState({shouldloading:false})) 
    }
    inputchangeHandler = (event,identifier)=>{
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedformelelement={...updatedOrderForm[identifier]}
        updatedformelelement.value=event.target.value;
        updatedformelelement.valid=this.checkValidity(updatedformelelement.value,updatedformelelement.validation)
        updatedOrderForm[identifier]=updatedformelelement;
        this.setState({orderForm:updatedOrderForm})
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
                        changed={(event)=>this.inputchangeHandler(event,formElement.id)} />
                ))}
                <Button btnType="Success" >ORDER</Button>
            </form>
        );
        if(this.state.shouldloading){
            form=<Spinner />
        }
        
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;