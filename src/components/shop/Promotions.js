import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from "@material-ui/core/Grid";
import ShopListItem from "./ShopListItem";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    root: {
        position: 'relative',
    },
    slide: {
        padding: 15,
        minHeight: 200,
        color: '#ffffff',
        backgroundColor:'rgba(168,134,175,0.9)'

    },
    back1: {
        backgroundColor:'rgba(135,187,190,0.9)',
    },
    back2: {
        backgroundColor:'#987EA5',
    },
    title: {
        fontWeight:'400',
        fontSize:29,
    },
    description: {
        fontWeight:'300',
        fontSize:20,
    },
    price: {
        margin:'1.5%',
        fontWeight:300,
        fontSize:20,
        color:'#ffffff'
    },
    promoPrice:{
        margin:'1.5%',
        fontWeight:700,
        color:'#ff6484',
        fontSize:32,
    },
    img: {
        borderRadius:5
    }

};

class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            elevation:1,
        }
    }

    onMouseEnter = () => {
        this.setState((state) => ({...state,elevation: 5}));
    };

    onMouseLeave = () => {
        this.setState((state) => ({...state,elevation: 1}));
    };

    handleChangeIndex = index => {
        this.setState((state) => ({...state, index: index}));
    };

    render() {
        const { index } = this.state;
        const { promotions } = this.props;
        const back1 = Object.assign({}, styles.slide, styles.back1);
        const back2 = Object.assign({}, styles.slide, styles.back2);

        return (
            <div style={styles.root}>
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    {
                        promotions && promotions.length
                            ? (
                                promotions.map((promotion, index) => {
                                    return (
                                        <div>
                                            {
                                                index%2 ?
                                                    (
                                                        <Link to={`/shop/${promotion._id}`}>
                                                            <Paper style={back2} elevation={this.state.elevation} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                                                                <Grid container direction="row" justify="center">
                                                                    <Grid item container xs={12} lg={6} direction="column" alignItems="center">
                                                                        <h2 className={this.props.classes.title}>{promotion.name}</h2>
                                                                        <h4 className={this.props.classes.description}>{promotion.description}</h4>
                                                                        <Grid container direction="row" justify="center">
                                                                            <h3 className={this.props.classes.price}><strike>{promotion.price}</strike></h3>
                                                                            <h3 className={this.props.classes.promoPrice}>{promotion.promoPrice}</h3>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item container xs={12} lg={6} direction="column" alignItems="center">
                                                                        <img className={this.props.classes.img} src={promotion.image} style={{width:'100%', height: '100%'}} alt="nthg"/>
                                                                    </Grid>
                                                                </Grid>
                                                            </Paper>
                                                        </Link>
                                                    )
                                                    :
                                                    (
                                                        <Link to={`/shop/${promotion._id}`}>
                                                            <Paper style={back1} elevation={this.state.elevation} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                                                                <Grid container direction="row" justify="center">
                                                                    <Grid item container xs={12} lg={6} direction="column" alignItems="center">
                                                                        <h2 className={this.props.classes.title}>{promotion.name}</h2>
                                                                        <h4 className={this.props.classes.description}>{promotion.description}</h4>
                                                                        <Grid container direction="row" justify="center">
                                                                            <h3 className={this.props.classes.price}><strike>{promotion.price}</strike></h3>
                                                                            <h3 className={this.props.classes.promoPrice}>{promotion.promoPrice}</h3>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item container xs={12} lg={6} direction="column" alignItems="center">
                                                                        <img className={this.props.classes.img} src={promotion.image} style={{width:'100%', height: '100%'}} alt="nthg"/>
                                                                    </Grid>
                                                                </Grid>
                                                            </Paper>
                                                        </Link>
                                                    )
                                            }
                                        </div>
                                    )})
                            )
                            : null
                    }
                </AutoPlaySwipeableViews>
            </div>
        );
    }
}

export default withStyles(styles)(Promotions);
/*
<div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
                    <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
 */