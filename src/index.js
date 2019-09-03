import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import { MuiThemeProvider} from '@material-ui/core/styles';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import './index.css';
import Layout from './components/layout';
import theme from './config/material-ui';
import rootReducer from './reducers';
const store = createStore(rootReducer, applyMiddleware(thunk));

class Index extends Component {
    render() {
        return (
            <Provider  store={store}>
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <Layout>
                        </Layout>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
