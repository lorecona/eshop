import React, {Component, Fragment} from 'react';
import '../../styles/shopList.css'
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import {connect} from "react-redux";

const styles = {
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    }
};

class ShopListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            elevation: 1,
        }
    }

    onMouseEnter = () => {
        this.setState((state) => ({...state,elevation: 12}));
    };

    onMouseLeave = () => {
        this.setState((state) => ({...state,elevation: 1}));
    };

    setDialog = () => {
        this.setState((state) => ({...state, open: !state.open}))
    };

    averageRating = (ratings) => {
        let sum = 0, cnt = ratings.length, i;
        for(i = 0; i < ratings.length; i++){
            sum += ratings[i].value;
        }
        return sum/cnt;
    };

    render() {
        const { item } = this.props;
        let averageRating;
        if(item.ratings.length){
            averageRating = this.averageRating(item.ratings);
        } else {
            averageRating = 0;
        }
        return (
            <Fragment>
                <Card className="item" elevation={this.state.elevation} onMouseEnter={this.onMouseEnter}
                      onMouseLeave={this.onMouseLeave}
                      // onClick={this.setDialog}
                >
                    <CardContent className={this.props.classes.cardcontent}>
                            <img src={item.image[0]} alt="nthg"/>
                            <div className="itemContent">
                                <Grid item xs={12}>
                                    <h3 className="itemTitle">{item.name}</h3>
                                </Grid>
                                <p className="itemDescr">{item.description}</p>
                                <Box component="fieldset" mb={1.5}  borderColor="transparent" className="ratingBox">
                                    <h3 className="rating">{averageRating}</h3>
                                    <Rating value={averageRating}  className="ratingStars" readOnly />
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={1} direction="column" alignItems="center">
                                            <Grid item>
                                               <ButtonGroup color="secondary" size="medium" aria-label="small outlined button group">
                                                     <Button><Link to={`/shop/${item._id}`} className="link2">{item.price} RON</Link></Button>
                                                     <Button><Link to={`/shop/${item._id}`} className="link">View details</Link></Button>
                                               </ButtonGroup>
                                            </Grid>
                                        </Grid>
                                     </Grid>
                                </Grid>
                            </div>
                    </CardContent>

                </Card>
                <Dialog open={this.state.open} onClose={this.setDialog}>
                        <pre style={{width: 400, height: 300, marginLeft: 90}}>
                            {
                                JSON.stringify({
                                    title: this.props.title,
                                    content: this.props.content
                                })
                            }
                        </pre>
                    <Button onClick={this.setDialog} color="secondary" variant="outlined"
                            style={{width: 200, height: 40, margin: 'auto', marginBottom: 20}}>
                        CLOSE
                    </Button>
                </Dialog>
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

export default withStyles(styles)(connect(
    mapStateToProps,
)(ShopListItem));