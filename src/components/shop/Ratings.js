import React from "react";
import '../../styles/ratings.css';
import '../../styles/shopList.css';
import Box from "@material-ui/core/Box";
import Rating from '@material-ui/lab/Rating';
import Grid from "@material-ui/core/Grid";
import {styled} from "@material-ui/styles";

const Ratings = (props) => {
    const MyRating = styled(Rating)({
        width:'10%',
        height:'10%',
    });

    return(
        <Grid container item xs={12} sm={12} md={12} lg={12} direction="row" justify="space-around" style={{padding:'1%'}}>
            <Grid item xs={1} lg={3} className="ratingName" style={{fontSize:'40%'}}>
                <h1>{props.data.from}</h1>
            </Grid>
            <Grid item xs={1} lg={3} item className="ratingMes">
                <h2>{props.data.message}</h2>
            </Grid>
            <Grid item xs={1} lg={3} className="rating">
                <h3>{props.data.value}</h3>
            </Grid>
            <Grid container item xs={10} lg={3} direction="column" alignItems="center">
                <Box component="fieldset"  borderColor="transparent">
                    <MyRating size="small" value={props.data.value} readOnly />
                </Box>
            </Grid>

        </Grid>
    );
};

export default Ratings;