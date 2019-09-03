import React, {Component, Fragment} from 'react';
import '../styles/cart.css'
import '../styles/shopList.css';
import axios from 'axios';
import FormOrders from "../components/cart/formOrders";
import CartItem from "../components/cart/CartItem";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            address:'',
            phone:null,
            total:null,
     };
    }

    calculateTotal = () => {
        let ntotal = 0, i;
        const items = this.props.cartItems;
        for (i = 0; i < items.length; i++){
            ntotal += items[i].quantity * items[i].price;
        }
        return ntotal;
    };

    saveOrder = (values, setSubmitting) => {
        let deleteAll = this.props.deleteAll;
        let total = this.calculateTotal();
        axios.post('http://localhost:3001/orders', {name : values.name, address: values.address, phone: values.phone, items: this.props.cartItems, totalPrice: total, UID:this.props.userInfo._id })
            .then(function (response) {
                deleteAll();
                setSubmitting(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    render() {
        let total = this.calculateTotal();
        let shipping = 15;
        let wholesum = total + shipping;

        return (
            <Grid className="cart" style={{marginTop:50}}>
                {this.props.userInfo && this.props.cartItems && this.props.cartItems.length !== 0 ?
                    <Fragment>
                        <div className="filled">
                            {
                                this.props.cartItems.map((element, index) => {
                                    return (<CartItem data={element} addItemToCart={this.props.addItemToCart} removeItem={this.props.removeItem} deleteItem={this.props.deleteItem}/>
                                    );
                                })
                            }
                        </div>

                        {total < 300 ? <Fragment> <div className="total">TOTAL {total}<div className="shipping"> + {shipping} shipping</div> </div>
                                            <div className="wholesum">= {wholesum}</div>
                                        </Fragment>
                            : <div className="total">TOTAL {total}</div>}

                        <div className="contactTitle">Contact information</div>
                        <FormOrders submit={this.saveOrder}/>
                    </Fragment>
                :
                <Grid container item xs={12} sm={12} md={9} lg={7} className="empty" style={{marginTop:100, paddingTop:160, paddingBottom:160}}>
                    The cart is empty!
                </Grid>
                }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        userInfo: state.loggedInInfo.userInfo,
    };
};

export default connect(
    mapStateToProps,
)(Cart);