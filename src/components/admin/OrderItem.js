import React, {Component} from "react";
import '../../styles/cart.css';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";

const MyButton = styled(Button)({
    width:'300%',
    height:'20%',
});

class OrderItem extends Component {

    render() {
        return(
             <div className="cartItem2">
                    <h1 style={{fontWeight:400, fontSize:'1vw'}} className="cartName">{this.props.data._id}</h1>
                    <h2 className="cartDescr2">{this.props.data.items.length} ITEMS</h2>
                    <h3 className="cartPrice2">{this.props.data.totalPrice}</h3>
                    {
                        this.props.data.isCompleted ?
                            (
                                <h3 className="cartPrice2">COMPLETED</h3>
                            )
                            :
                            (
                                <h3 className="cartPrice2">NOT COMPLETED</h3>
                            )
                    }

                    <div className="adjustCart">
                        <div className="cartButton2">
                            <MyButton size="small" color="secondary" variant="outlined" className="cartButton">
                                {
                                    this.props.userInfo && this.props.userInfo.RID.role === "Admin" ?
                                        (
                                            <Link to={`/admin/orders/${this.props.data._id}`} className="link"> DETAILS </Link>
                                        )
                                        :
                                        (
                                            <Link to={`/user/order/${this.props.data._id}`} className="link"> DETAILS </Link>
                                        )
                                }
                            </MyButton>
                        </div>
                    </div>

             </div>
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
)(OrderItem);