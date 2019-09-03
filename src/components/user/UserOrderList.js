import React, {Component} from "react";
import {getOrdersForUser} from "../../actions/orders";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import OrderItem from "../admin/OrderItem"

class UserOrderList extends Component{


    componentDidMount() {
        const id = this.props.match.params.id;
        const {getOrdersForUser} = this.props;
        getOrdersForUser(id);
    }

    render() {
        return(
            <div className="shopList">
                {
                    this.props.ordersInfo
                        ? (
                            <Grid container spacing={3} style={{marginTop:100}}>
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
        ordersInfo: state.ordersInfo.userOrders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersForUser: (data) => dispatch(getOrdersForUser(data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserOrderList);

