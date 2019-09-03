import React from 'react';
import '../../styles/browse.css';
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";

function Category(props){
    return(
        <div className="category">
            <Button color="primary" variant="outlined" style={{width:210, height:55}}>
                <Link to={`/category/${props.id}`} className="linkCategory">{props.name}</Link>
            </Button>
        </div>
    );
}

export default Category;