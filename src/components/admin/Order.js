import React, {Component, Fragment} from "react";
import '../../styles/cart.css';
import Button from "@material-ui/core/Button";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {getOrderDetails, markCompleted} from "../../actions/orders";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const MyButton = styled(Button)({
    width:'100%',
    height:'44%',
    margin:'4%'
});

class Order extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        const {getOrderInfo} = this.props;
        getOrderInfo(id);
    }

    markCompletedFunc = () => {
        const {markCompleted} = this.props;
        markCompleted(this.props.orderInfo._id);
    };

    render() {
        return(
            <Grid item container spacing={3} style={{marginTop: 128}} xs={12} sm={12} md={10} lg={8} direction="column" alignItems="stretch">
                <div className="cartItem2">
                    {
                        this.props.orderInfo ?
                            ( <Fragment>

                                    <h1 className="cartName2">{this.props.orderInfo.name}</h1>
                                    <h2 className="cartDescr2">{this.props.orderInfo.address}</h2>
                                    <h2 className="cartDescr2">{this.props.orderInfo.phone}</h2>
                                    <h3 className="cartPrice2">{this.props.orderInfo.totalPrice}</h3>
                                    {
                                        this.props.orderInfo.isCompleted ?
                                            (
                                                <h3 className="cartPrice2">COMPLETED</h3>
                                            )
                                            :
                                            (
                                                <Fragment>
                                                    <h3 className="cartPrice2">NOT COMPLETED</h3>
                                                    <Grid item lg={2}>
                                                        <MyButton onClick={this.markCompletedFunc} size="small" color="secondary" variant="outlined" className="cartButton">
                                                            <div className="link"> MARK COMPLETED </div>
                                                        </MyButton>
                                                    </Grid>
                                                </Fragment>

                                            )
                                    }
                                </Fragment>
                            )
                            :
                            (
                                <div className="waiting"><CircularProgress  size={45} thickness={2.6} style={{marginLeft: 181}} color={"primary"}/></div>
                            )
                    }
                </div>
                <h2 style={{marginTop:50,fontWeight:300}}> Items </h2>
                { this.props.orderInfo && this.props.orderInfo.items ?
                    this.props.orderInfo.items.map((element, index) => {
                        return (
                            <div className="cartItem2">
                                <h4 className="cartDescr2" style={{fontWeight:300}}>{element._id}</h4>
                                <h1 className="cartName2">{element.name}</h1>
                                <h2 className="cartDescr2">{element.description}</h2>
                                <h2 className="cartDescr2">{element.distributor}</h2>
                                <h3 className="cartPrice2">{element.price}</h3>
                                <h3 className="cartQuant">{element.quantity}</h3>
                            </div>
                        );
                    })
                    : <div className="waiting"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>
                }

            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        orderInfo: state.ordersInfo.orderDetails,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderInfo: (data) => dispatch(getOrderDetails(data)),
        markCompleted: (data) => dispatch(markCompleted(data)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Order);
