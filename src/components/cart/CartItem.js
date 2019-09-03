import React from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import '../../styles/cart.css';

const CartItem = (props) => {

    return(
        <div className="cartItem">
            <div className="cartImg">
                <img src={props.data.image} alt="nthg"/>
            </div>
            <h1 className="cartName">{props.data.name}</h1>
            <h2 className="cartDescr">{props.data.description}</h2>
            <h3 className="cartPrice2">{props.data.price}</h3>
            <h3 className="cartQuant">{props.data.quantity}</h3>

            <div className="adjustCart">
                <div className="cartButton2">
                    <Fab color="primary" aria-label="add"  size={"small"}  onClick={() => (props.addItemToCart(props.data))}>
                        <AddIcon />
                    </Fab>
                </div>
                <div className="cartButton2">
                    <Fab color="primary" aria-label="add" size={"small"}  onClick={() => (props.removeItem(props.data._id))}>
                        <div className="plus"> - </div>
                    </Fab>
                </div>
                <div className="cartButton2">
                    <Fab aria-label="delete" size={"small"}  onClick={() => (props.deleteItem(props.data._id))}>
                        <DeleteIcon />
                    </Fab>
                </div>
            </div>

        </div>
    );
};

export default CartItem;
