import React, { Component } from 'react';
import classes from './Contactdata.css';
import Button from '../../../components/UI/Buttons/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Modal/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            phno:null
        },
        shouldloading: false
    }
    orderHandler=(e)=>{
        e.preventDefault()
        this.setState({shouldloading:true})
            const orders={
                ingredients:this.props.ingredients,
                price:this.props.totalprice,
                customer:{
                    name:"Pavan",
                    address:{
                        country:'India',
                        street:"teststreet1",
                        zipcode:'560064'
                    },
                    email:'email@gmail.com',
                    deliveryMethod:'prime'
                }
            }
           
            axios.post('/orders.json',orders)
            .then(response=>{ this.setState({
                shouldloading:false})
                this.props.history.replace('/');
        }
               
        )
            .catch(error=>this.setState({shouldloading:false}))
    }
    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <input className={classes.Input} type="number" name="phno" placeholder="Phone Number" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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