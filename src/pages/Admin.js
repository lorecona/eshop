import React, {Component, Fragment} from "react";
import axios from "axios/index";
import Snackbar from '@material-ui/core/Snackbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from "@material-ui/core/CircularProgress/index";
import '../styles/admin.css';
import FormCategories from "../components/categories/formCategories";
import FormItems from "../components/shop/formItems";
import {getShopItems} from "../actions/shopItems"
import {connect} from "react-redux";
import AdminItemList from "../components/shop/AdminItemList";
import Grid from "@material-ui/core/Grid";
import {styled} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Popover from "@material-ui/core/Popover";

const MyButton = styled(Button)({
    width:'19%',
    height:'30%',
    margin:'2%',

});

class Admin extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categories:null,
            notification:false,
            selectedItem: null,
            deletedItem:null,
            anchor:null,
        }
    }

    getCategories = () => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
                this.setState({ categories: response.data.categories });
            })
            .catch(error => console.log('error', error));
    };

    componentDidMount() {
        const {getShopItems} = this.props;
        this.getCategories();
        getShopItems();
    }

    toggleNotification = (value) => {
        this.setState((state) => ({...state, notification: value}));
    };

    setDialog = (event, id,) => {
        console.log(event);
        this.setState((state) => ({
            ...state,
            anchor: event ? event.currentTarget : null,
            deletedItem: id
        }));
    };

    selectItem = (data) => {
        this.setState((state) => ({...state, selectedItem: data}));
    };

    saveShopItem = (values, setSubmitting) => {
        const toggle = this.toggleNotification;
        const selectItem = this.selectItem;
        const {getShopItems} = this.props;

        if(values._id){
            axios.put(
                'http://localhost:3001/shop',
                {_id: values._id, name : values.name, description: values.description, price: values.price, CID: values.category, distributor: values.distributor,  image: values.image, quantity:0 })
                .then(function (response) {
                    console.log(response);
                    toggle('Success');
                    getShopItems();
                    selectItem(null);
                    setSubmitting(false);
                })
                .catch(function (error, x, y) {
                    let errorMessage = 'Error';
                    if (error && error.response && error.response.data && error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }
                    console.log(errorMessage);
                    setSubmitting(false);
                    toggle(errorMessage);
                });

        } else {
            axios.post(
                'http://localhost:3001/shop',
                {name : values.name, description: values.description, price: values.price, CID: values.category, distributor: values.distributor,  image: values.image, quantity:0 })
                .then(function (response) {
                    console.log(response);
                    toggle('Success');
                    getShopItems();
                    selectItem(null);
                    setSubmitting(false);
                })
                .catch(function (error, x, y) {
                    let errorMessage = 'Error';
                    if (error && error.response && error.response.data && error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }
                    console.log(errorMessage);
                    setSubmitting(false);
                    toggle(errorMessage);
                });
        }
    };

    deleteShopItem = (id) => {
        console.log(id);
        const toggle = this.toggleNotification;
        const {getShopItems} = this.props;

        axios.delete(
            `http://localhost:3001/shop/${id}`)
            .then(function (response) {
                console.log(response);
                toggle('Success');
                this.setState((state) => ({...state, deletedItem: null}));
                getShopItems();
            })
            .catch(function (error, x, y) {
                let errorMessage = 'Error';
                if (error && error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                console.log(errorMessage);
                toggle(errorMessage);
            });
    };


    saveCategory = (values, setSubmitting) => {
        const toggle = this.toggleNotification;
        const categories = this.getCategories;

        axios.post('http://localhost:3001/categories', {name : values.name})
            .then(function (response) {
                console.log(response);
                categories();
                toggle('Success');
                setSubmitting(false);
            })
            .catch(function (error) {
                let errorMessage = 'Error';

                if (error && error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                console.log(errorMessage);
                setSubmitting(false);
                toggle(errorMessage);
            });
    };

    render() {
        console.log(this.state.anchor);
        return(
            <Fragment>
                {this.state.categories && this.props.itemsInfo?
                    <Fragment>
                        <Grid container spacing={3} className="admin" direction="row" justify="space-between" alignItems="flex-start" style={{marginTop:100}}>
                            <Grid item container xs={12} sm={12} md={6} lg={8} style={{width:'100%'}} direction="column" alignItems="center">
                                <Grid item container xs={12} sm={12} md={12} lg={12} style={{width:'100%'}} direction="column" alignItems="center">
                                    <Button
                                        onClick={() => this.selectItem({
                                            name:'',
                                            description:'',
                                            price:0,
                                            CID:0,
                                            distributor:'',
                                            image:'',
                                            quantity: 0
                                        })}
                                        color="primary"
                                        variant="contained"
                                        style={{width:'20%'}}>
                                        <div className="link3"> CREATE NEW ITEM </div>
                                    </Button>
                                </Grid>
                                <AdminItemList items={this.props.itemsInfo} select={this.selectItem} delete={this.setDialog}/>
                            </Grid>
                            <Grid item container  xs={12} sm={12} md={6} lg={4} style={{marginBottom:'6%'}} direction="row" justify="center" alignItems="center">
                                <FormCategories submit={this.saveCategory}/>
                            </Grid>
                        </Grid>
                        {
                            this.state.deletedItem
                                ? (
                                    <Popover
                                        style={{position:'fixed'}}
                                        open={true}
                                        onClose={() =>this.setDialog(null, null)}
                                        anchorEl={this.state.anchor}
                                        anchorOrigin={{
                                            horizontal: 'center',
                                            vertical: 'center'
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <IconButton
                                           size="small"
                                           color="secondary"
                                           onClick={() => this.setDialog(null, null)}>
                                           <Close />
                                        </IconButton>
                                        <Grid container direction="column" alignItems="center" style={{padding:'2%'}}>
                                            <h4 style={{fontWeight:400}}>Are you sure you want to delete this item?</h4>
                                            <Grid item container xs={12} sm={12} md={12} lg={12} direction="column" alignItems="center">
                                                <MyButton onClick={() => this.deleteShopItem(this.state.deletedItem)} size="small" color="secondary" variant="outlined" className="cartButton">
                                                    <div className="link4"> YES </div>
                                                </MyButton>
                                            </Grid>
                                        </Grid>
                                    </Popover>
                                )
                                : null
                        }
                        {
                            this.state.selectedItem
                                ? (
                                    <Dialog open={true} onClose={() => this.selectItem(null)}>
                                        <div>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => this.selectItem(null)}>
                                                <Close />
                                            </IconButton>
                                        </div>
                                        <FormItems submit={this.saveShopItem} categories={this.state.categories} data={this.state.selectedItem}/>
                                    </Dialog>
                                )
                                : null
                        }

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={!!this.state.notification}
                            autoHideDuration={6000}
                            onClose={() => this.toggleNotification(false)}
                            message={<span id="message-id">{this.state.notification}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={() => this.toggleNotification(false)}>
                                    <CloseIcon />
                                </IconButton>
                            ]}
                        />
                    </Fragment>
                    : <div className="waitingAdmin"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>}

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        itemsInfo: state.shopItemsInfo.shopItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getShopItems: (data) => dispatch(getShopItems(data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admin);
//<FormItems submit={this.saveShopItem} categories={this.state.categories}/>
//<div className="adminTitle">Add a new shop item</div>