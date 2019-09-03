import React, {Component} from 'react';
import '../styles/shopList.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import ItemList from "../components/shop/ItemList";

class SearchByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsByCategory: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:3001/searchByCategory/${id}`)
            .then(response => {
                this.setState({ itemsByCategory: response.data.items })
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="shopList">
                <h2 className="listTitle">Items</h2>
                <div>
                    {this.state.itemsByCategory ? <ItemList items={this.state.itemsByCategory}/> : <div className="waiting"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>}
                </div>
            </div>
        );
    }
}
export default SearchByCategory;