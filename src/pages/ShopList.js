import React, {Component} from 'react';
import '../styles/shopList.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import ItemList from "../components/shop/ItemList";
import FilterComponent from "../components/FilterComponent";
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getShopItems, getCategories } from '../actions/shopItems';
import {getPromotions} from "../actions/promotions";
import promotionsInfo from "../reducers/promotions";


class ShopList extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            CID: null,
            distributor: null,
            range:null,
            shopItems: null,
            categories:null,
            distributors:null,
        };
    }

    getItems = () => {
        const { CID, distributor, range } = this.state;
        const {getShopItems } = this.props;
        const getParams = {};

        if (CID) {
            getParams.CID = CID;
        }
        if (distributor){
            getParams.distributor = distributor;
        }
        if (range){
            getParams.range = range;
        }
        getShopItems(getParams);
    };

    submitFilter = (values, setSubmitting) => {
        const {CID, distributor, range} = values;
        if(CID){
            this.setState((state) => ({...state, CID: CID}));
        }
        if (distributor){
            this.setState((state) => ({...state, distributor: distributor}));
        }
        if(range){
            this.setState((state) => ({...state, range:range}));
        }
        setSubmitting(false);
        this.getItems();
    };

    componentDidMount() {
       this.getItems();
        const {getCategories} = this.props;
        getCategories();
        // console.log(this.props);
        // setTimeout(() => {
        //     this.setState({shopItems : 12});
        // }, 5000);
    }

    render() {
            return(
                <div className="shopList">
                    {
                        this.props.itemsInfo  && this.props.categInfo && this.props.distInfo
                            ? (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2}>
                                        <FilterComponent categories={this.props.categInfo} distributors={this.props.distInfo} submit={this.submitFilter}/>
                                    </Grid>
                                    <Grid item xs={12} md={10} >
                                        <ItemList items={this.props.itemsInfo}/>
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
        itemsInfo: state.shopItemsInfo.shopItems,
        distInfo: state.shopItemsInfo.distributors,
        categInfo: state.shopItemsInfo.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getShopItems: (data) => dispatch(getShopItems(data)),
        getCategories: () => dispatch(getCategories()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopList);