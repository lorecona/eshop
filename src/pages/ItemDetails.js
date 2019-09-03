import React, {Component, Fragment} from 'react';
import '../styles/shopList.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Ratings from "../components/shop/Ratings";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { styled } from '@material-ui/styles';
import { connect } from 'react-redux';
import {getItemDetails} from '../actions/shopItems';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#dd394d',
        }
    },
});

const styles = {
    grid: {
        padding: '0 2% 0 0',
    },
    button : {
        width:'35%',
        height:'20%',
    }
};
const MyButton = styled(Button)({
    width:'35%',
    height:'20%',
});

class ItemDetails extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            details: null,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const {getItemInfo} = this.props;
        getItemInfo(id);
    }

    render() {
        return(
            <MuiThemeProvider theme={theme}>
            <Grid container spacing={3} className="detailsPage">
                {this.props.itemInfo ?
                    <Fragment>
                        <Grid item container spacing={2} lg={8} className="details">
                              <Grid item container  xs={12} md={6} justify="space-around" alignItems="stretch" alignContent="center" className={this.props.classes.grid}>
                                        {this.props.itemInfo.image.map((image) => {
                                            return (
                                                <Grid item md={6} xs={6} sm={6}>
                                                    <img src={image} style={{width:'100%', height: '100%'}} alt="nthg"/>
                                                </Grid>
                                            )})}
                              </Grid>
                              <Grid item container spacing={3} xs={12} md={6} direction="column" alignItems="stretch" justify="space-around">
                                        <div className="rest">
                                            <Grid item>
                                                <h2 className="detailsTitle">{this.props.itemInfo.name}</h2>
                                            </Grid>
                                            <Grid item>
                                                <h3 className="detailsDescr">{this.props.itemInfo.description}</h3>
                                            </Grid>
                                            <Grid item>
                                                <h3 className="detailsDist">Distributor: {this.props.itemInfo.distributor}</h3>
                                            <Grid item>
                                                <h3 className="detailsPrice cartPrice">Price {this.props.itemInfo.price}</h3>
                                            </Grid>
                                            </Grid>
                                            { this.props.userInfo ?
                                                (
                                                    <Grid item>
                                                        <MyButton size="small" color="secondary" variant="outlined" className="cartButton" onClick={() =>this.props.addItemToCart(this.props.itemInfo)}>
                                                            ADD TO CART
                                                        </MyButton>
                                                    </Grid>
                                                )
                                                : null
                                            }
                                        </div>
                              </Grid>
                        </Grid>
                        <Grid item container spacing={3} xs={12} sm={12} md={12} lg={12} direction="column" alignItems="center">
                            {
                                this.props.itemInfo.ratings.length ?
                                    (
                                        <div className="ratings">
                                            {this.props.itemInfo.ratings.map((element, index) => {
                                                return (
                                                    <Ratings data={element}/>
                                                );
                                            })}
                                        </div>
                                    )
                                    :null
                            }
                        </Grid>
                    </Fragment>
                    : <div className="waiting"><CircularProgress  size={45} thickness={2.6} color={"primary"}/></div>}
            </Grid>
            </MuiThemeProvider>

        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        itemInfo: state.shopItemsInfo.itemDetails,
        userInfo: state.loggedInInfo.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItemInfo: (data) => dispatch(getItemDetails(data)),
    }
};


export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemDetails));