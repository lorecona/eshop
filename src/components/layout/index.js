import React, {Component, Fragment} from 'react';
import '../../styles/main.css'
import Header from '../Header';
import LandingPage from "../../pages/LandingPage";
import ShopList from "../../pages/ShopList";
import ItemDetails from "../../pages/ItemDetails";
import Cart from "../../pages/Cart";
import Admin from "../../pages/Admin";
import SearchByCategory from "../../pages/SearchByCategory";
import CreateUser from "../CreateUser";
import { Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import AdminOrderList from "../admin/AdminOrderList";
import Order from "../admin/Order";
import { connect } from 'react-redux';
import {logIn} from "../../actions/loggedInActions";
import EditUser from "../user/EditUser";
import UserOrderList from "../user/UserOrderList";

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartItems:[],
        }
    }

    addItemToCart = (gitem) => {
        console.log(this.state.cartItems.length);
        let cart = [...this.state.cartItems];
        const index = cart.findIndex((item) => { return item.id === gitem._id});
        if( index !== -1) {
            cart[index].quantity++;
        }
        else {
            gitem.quantity = 1;
            cart.push(gitem);
        }
        this.setState(
            {cartItems : cart},
        );
    };

    removeItem = (gid) => {
        let cart = [...this.state.cartItems], indexx;

        indexx = cart.findIndex((item) => { return item._id === gid});
        if (cart[indexx].quantity === 1){
            cart.splice(indexx, 1);
        }
        else {
            cart[indexx].quantity--;
        }
        this.setState({
            cartItems: cart});
    };

    deleteItem = (gid) => {
        let cart = [...this.state.cartItems], indexx;

        indexx = cart.findIndex((item) => { return item.id === gid});
        cart.splice(indexx, 1);

        this.setState({
            cartItems: cart});
    };

    deleteAll = () => {
        this.setState({
            cartItems: []});
    };

    componentDidMount() {
        const {logInUser} = this.props;
        const localStorage = window.localStorage;
        const sessionStorage = window.sessionStorage;
        const fromLocalStorage  = localStorage.getItem('ESHOP_USER');
        const fromSessionStorage = sessionStorage.getItem('ESHOP_USER');
        if(fromLocalStorage){
            const [username, password] = fromLocalStorage.split(':');
            logInUser({username: username,
                password: password});
        }
        else if(fromSessionStorage){
            const [username, password] = fromSessionStorage.split(':');
            logInUser({username: username,
                password: password});
        }
    }

    totalItems = () => {
        let total = 0, i;
        for(i = 0; i < this.state.cartItems.length; i++){
            total += this.state.cartItems[i].quantity;
        }
        return total;
    };
    render() {
        const { children} = this.props;
        const totalItems = this.totalItems();
         return(
             <Fragment>
                  <Container maxWidth="lg">
                     <Header totalItems={totalItems}/>

                     <main className="main">
                         { children }
                         <Route exact path="/" component={LandingPage} />
                         <Route exact path="/shop" render={(props) => <ShopList {...props}  addItemToCart={this.addItemToCart} />} />
                         <Route exact path="/shop/:id" render={(props) => <ItemDetails {...props} addItemToCart={this.addItemToCart}/>}/>
                         <Route exact path="/cart" render={(props) => <Cart {...props} cartItems={this.state.cartItems} addItemToCart={this.addItemToCart} removeItem={this.removeItem} deleteItem={this.deleteItem} deleteAll={this.deleteAll}/>}/>
                         <Route exact path="/category/:id" render={(props) => <SearchByCategory {...props} addItemToCart={this.addItemToCart}/>}/>
                         <Route exact path="/user"  render={(props) => <CreateUser {...props}/>}/>
                         <Route exact path="/user/:id" render={(props) => <EditUser {...props}/>}/>
                         <Route exact path="/user/orders/:id" render={(props) => <UserOrderList {...props}/>}/>
                         <Route extact path="/user/order/:id" render={(props) => <Order {...props}/>} />
                         {
                             this.props.userInfo && this.props.userInfo.RID.role === "Admin" ?
                                 (  <Fragment>
                                         <Route exact path="/admin" render={(props) => <Admin {...props}/>}/>
                                         <Route exact path="/admin/orders" render={(props) => <AdminOrderList {...props}/>} />
                                         <Route extact path="/admin/orders/:id" render={(props) => <Order {...props}/>} />
                                     </Fragment>
                                 )
                             : null
                         }
                     </main>
                     <footer className="footer">This is the footer</footer>
                  </Container>
             </Fragment>
         );
     }

}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        userInfo: state.loggedInInfo.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (data) => dispatch(logIn(data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Layout);