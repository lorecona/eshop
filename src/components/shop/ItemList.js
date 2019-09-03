import React, {Fragment, Component} from 'react';
import '../../styles/shopList.css';
import ShopListItem from "./ShopListItem";
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import Promotions from "./Promotions";

class ItemList extends Component{

    getPromotions = () => {
        const {items} = this.props;
        const promotions = [];
        for( let i = 0; i < items.length; i++){
            if( items[i].promotion){
                promotions.push(items[i]);
            }
        }
        return promotions;
    };

    render() {
        const { items } = this.props;
        const promotions = this.getPromotions();
        return(
            <Fragment>
                <h2 className="listTitle">Promotions</h2>
                <Promotions promotions={promotions}/>
                <h2 className="listTitle">Items</h2>
                <Grid container alignItems="stretch" spacing={3} >
                    {
                        items && items.length
                            ? (
                                items.map((item, index) => {
                                    return (
                                        <Grid key={item._id} item xs={12} sm={6} md={3}>
                                            <ShopListItem  item={item} />
                                        </Grid>
                                    )})
                            )
                            : null
                    }
                </Grid>
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


export default connect(mapStateToProps)(ItemList);