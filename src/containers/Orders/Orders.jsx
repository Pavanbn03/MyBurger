import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import witherrorhandling from '../../hoc/withErrorHandling/witherrorhandling'
import Spinner from '../../components/UI/Modal/Spinner/Spinner'
class Orders extends Component {
    state = { 
        orders:null,
        loading:false
     }
    componentDidMount(){
        axios.get('/orders.json')
        .then(response =>{
            const fetchorders=[];
            for(let key in response.data){
                
                fetchorders.push({
                    ...response.data[key],
                    
                    id:key
                });
            }
            this.setState({loading:false,orders:fetchorders})
            
            
            
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }
    render() { 
        let display=<Spinner />;
        if(this.state.orders){
                display=Object.keys(this.state.orders)
                .map(keys=>{
                return <Order orders={this.state.orders[keys].ingredients} key={keys} price={+this.state.orders[keys].price} />
            })
        }
         
        return ( <div>
            {display}
           
        </div> );
    }
}
 
export default witherrorhandling(Orders,axios) ;