import React, {Component} from 'react';
import '../../styles/browse.css'
import Category from "./Category";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";


class Browse extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categories:null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/categories')
            .then(response => {
                this.setState({ categories: response.data.categories });
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="browse">
                <h2 className="browseTitle">Browse all categories</h2>
                <div className="categoryList">
                    {this.state.categories ?
                        this.state.categories.map((element, index) => {
                            return (
                                <Category key={index} id={element._id} name ={element.name}/>
                            );
                        })
                        : <div className="waiting"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>
                    }
                </div>
            </div>
        );
    }
}

export default Browse;