import React, { Component,Suspense } from 'react';
import {Route, Switch, withRouter,Redirect} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './components/Auth/Auth'
import Logout from './containers/Logout/Logout'
import * as actions from './store/actions/index';
import {connect} from 'react-redux'

const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(()=>{
  return import('./components/Auth/Auth')
})
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignin()
  }
  render() {
    let routes=(
      <Switch>
    
          <Route path='/auth' render={()=><Auth />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to ='/'/>
        
      </Switch>
    )
    if(this.props.isAuth){
      routes=(
        <Switch>
           <Route path="/checkout" render={()=><Checkout/>}/>
          <Route path='/orders' render={()=><Orders />} />
          <Route path='/logout' component={Logout} />
      <Route path='/auth' render={()=><Auth /> }/>
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to ='/'/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
          
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignin : ()=>dispatch(actions.checkAuthState())
    }
}
const mapStateToProps = state =>{
  return{
    isAuth : state.auth.token !==null
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
