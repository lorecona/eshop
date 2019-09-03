import React, { Fragment, useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Container from '@material-ui/core/Container';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import LogInForm from "./LogInForm";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import '../styles/shopList.css';

// *********************** REDUX **********************************
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions/loggedInActions';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
// ****************************************************************

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color:'#069e9f',
    },
    title: {
        flexGrow: 1,
        color:'#069e9f',
        letterSpacing:4,
        fontWeight:400,
    },
    log: {
        flexGrow: 1,
        color:'#069e9f',
        fontWeight:400,
        fontSize:16
    },
    toolbar: {
        backgroundColor:'#f1f1f1',
    },
    cart: {
        width:26,
        height:26,
    },
    dialog: {
        width:395,
        height:330,
    },
    close: {
        alignSelf:'flex-end',
        width:40,
        height:40,
        marginRight:10,
        textAlign:'center'
    },
    paper: {
        position: 'absolute',
        padding: '20px 40px 20px 40px',
        border:'0.2px solid rgba(85,0,91,0.41)',
        backgroundColor:'#f1f1f1',
        margin:6,
        display:'flex',
        flexDirection:'column',
        alignItems: 'center'
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const totalItems = props.totalItems;
    const { userInfo, logInUser, logOutUser } = props;
    const [ open, setOpen ] = useState(false);
    const [ openUserMenu, setUserMenuOpen] = useState(false);
    const submitUser = (values, setSubmitting) => {
           logInUser({username: values.username,
                      password: values.password,
                      rememberMe: values.rememberMe,
                    });
           setSubmitting(false);
           setOpen(false);
    };
    const logOutUserFunc = () => {
        logOutUser();
        const localStorage = window.localStorage;
        localStorage.removeItem('ESHOP_USER');
    };

    return(
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h5" className={classes.title}>
                        <Link to={"/"} className={classes.title}>
                            ESHOP
                        </Link>
                    </Typography>

                    {
                        !!userInfo
                            ? (
                                <Fragment>
                                    <ClickAwayListener onClickAway={() => setUserMenuOpen(false)}>
                                        <div>
                                            <img style={{marginRight:10}} onClick={() => setUserMenuOpen(!openUserMenu) } className="avatar" src="http://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg" alt="nthg"/>
                                            {openUserMenu ? (
                                                <Paper className={classes.paper}>
                                                    <Link className="link" style={{margin:5}} to={`/user/${userInfo._id}`}> Profile </Link>
                                                    <Link className="link" style={{margin:5}} to={`/user/orders/${userInfo._id}`}> Order history </Link>
                                                </Paper>
                                            ) : null}
                                        </div>
                                    </ClickAwayListener>
                                    <Button onClick={logOutUserFunc}>
                                        <Typography variant="h6" className={classes.log}>
                                            LOG OUT
                                        </Typography>
                                    </Button>
                                </Fragment>
                            )
                            : (
                                <Fragment>
                                    <Button onClick={() => setOpen(true)}>
                                        <Typography variant="h6" className={classes.log}>
                                            LOG IN
                                        </Typography>
                                    </Button>

                                    <Dialog open={open} onClose={() => setOpen(false)}>
                                        <div>
                                            <IconButton
                                                className={classes.close}
                                                color="secondary"
                                                onClick={() => setOpen(false)}>
                                                <Close />
                                            </IconButton>
                                        </div>
                                        <Grid container className={classes.dialog} direction="column" alignItems="center">
                                                <LogInForm submit={submitUser}/>
                                        </Grid>
                                    </Dialog>
                                </Fragment>
                            )
                    }
                    <Link to={"/cart"}>
                        <IconButton aria-label="cart">
                            <Badge badgeContent={totalItems} color="primary">
                                <ShoppingCartIcon className={classes.cart}/>
                            </Badge>
                        </IconButton>
                    </Link>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        userInfo: state.loggedInInfo.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (data) => dispatch(logIn(data)),
        logOutUser: () => dispatch(logOut()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);