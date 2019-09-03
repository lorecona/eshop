import React from 'react';
import Grid from "@material-ui/core/Grid";
import {styled} from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const AdminItemList = (props) => {
    const MyButton = styled(Button)({
        width:'10%',
        height:'44%',
        margin:0,
        marginRight:'1%',
        marginLeft:'1%',
        padding:'0.4%',
    });

    return(
        <Grid container spacing={3} style={{width:'100%', marginTop:10}}>
            {
                props.items.map((element, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={12} md={12} lg={12} style={{width:'90%', padding:'2%'}}>
                            <div className="cartItem2">
                                <h4 className="cartDescr2" style={{fontWeight:300}}>{element._id}</h4>
                                <h1 className="cartName2">{element.name}</h1>
                                <h2 className="cartDescr2">{element.description}</h2>
                                <h2 className="cartDescr2">{element.distributor}</h2>
                                <h3 className="cartPrice2">{element.price}</h3>
                                <MyButton onClick={() => props.select(element)} color="primary" variant="contained" className="cartButton">
                                    <div className="link3"> EDIT </div>
                                </MyButton>
                                <MyButton onClick={(event) => props.delete(event, element._id)} color="secondary" variant="contained" className="cartButton">
                                    <div className="link3"> DELETE </div>
                                </MyButton>
                            </div>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
};

export default AdminItemList;