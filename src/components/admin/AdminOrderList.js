import React, {Component} from "react";
import '../../styles/cart.css'
import {getOrders} from "../../actions/orders";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import OrderItem from "./OrderItem";
import AdminFilterComponent from "./AdminFilterComponent";

class AdminOrderList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            range:null,
            isCompleted:null,
        };
    }

    getOrd = () => {
        const {range, isCompleted} = this.state;
        const {getOrders} = this.props;
        const getParams = {};

        if (range){
            getParams.range = range;
        }
        if(isCompleted){
            getParams.isCompleted = isCompleted;
        }
        getOrders(getParams);
    };

    submitFilter = (values, setSubmitting) => {
        const {range, isCompleted} = values;

        if (isCompleted){
            this.setState((state) => ({...state, isCompleted:isCompleted}));
        } else {
            this.setState((state) => ({...state, isCompleted:false}));
        }
        if(range){
            this.setState((state) => ({...state, range:range}));
        }
        setSubmitting(false);
        this.getOrd();
    };

    componentDidMount() {
        this.getOrd();
    }

    render() {
        return(
            <div className="shopList">
                {
                    this.props.ordersInfo
                        ? (
                            <Grid container spacing={3} style={{marginTop:100}}>
                                <Grid item xs={12} md={2}>
                                    <AdminFilterComponent submit={this.submitFilter}/>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    {
                                        this.props.ordersInfo.map((element, index) => {
                                            return (
                                                <OrderItem data={element}/>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                        )
                        : (
                            <div className="waiting"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        ordersInfo: state.ordersInfo.orders,
        userInfo: state.loggedInInfo.userOrders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: (data) => dispatch(getOrders(data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminOrderList);

