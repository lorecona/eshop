import React, {Component, Fragment} from "react";
import axios from "axios/index";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import Snackbar from '@material-ui/core/Snackbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from "@material-ui/core/MenuItem/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import {Formik} from "formik/dist/index";
import '../styles/admin.css'

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles:null,
            notification:false,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/roles')
            .then(response => {
                this.setState({ roles: response.data.roles });
            })
            .catch(error => console.log('error', error));
    }

    saveUser = (values, setSubmitting) => {
        const toggle = this.toggleNotification;
        axios.post(
            'http://localhost:3001/users',
            {fname : values.fname, lname : values.lname, username: values.username, email : values.email, password : values.password, RID: values.RID }
        )
            .then(function (response) {
                console.log(response);
                toggle('Success');
                setSubmitting(false);
            })
            .catch(function (error, x, y) {
                let errorMessage = 'Error';

                if (error && error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                console.log(errorMessage);
                setSubmitting(false);
                toggle(errorMessage);
            });
    };

    toggleNotification = (value) => {
        this.setState((state) => ({...state, notification: value}));
    };

    render() {
        return(
            <Fragment>
                <div className="adminTitle">New user form</div>
                {this.state.roles ?
                    <div className="admin">
                        <Formik
                            initialValues={{ fname: '', lname:'', username:'', email:'', password:'', RID:0}}
                            validate={ values => {
                                let errors = {};
                                if (!values.fname) {
                                    errors.fname = 'User first name is required';
                                } else if (values.fname.length < 2) {
                                    errors.fname = 'User first name is too short';
                                } else if (values.fname.length > 20){
                                    errors.fname = 'User first name is too long'
                                }
                                ///////////////////////////////////////
                                if (!values.lname) {
                                    errors.lname = 'User last name is required';
                                } else if (values.lname.length < 2) {
                                    errors.lname = 'User last name is too short';
                                } else if (values.lname.length > 20){
                                    errors.lname = 'User last name is too long'
                                }
                                ///////////////////////////////////////
                                if (!values.username) {
                                    errors.username = 'Username is required';
                                } else if (values.username.length < 2) {
                                    errors.username = 'Username is too short';
                                } else if (values.username.length > 25){
                                    errors.username = 'Username is too long'
                                }
                                ///////////////////////////////////////
                                if (!values.email) {
                                    errors.email = 'User email address is required';
                                } else if (values.email.length > 80) {
                                    errors.email = 'User email address is too long';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                ////////////////////////////////////////
                                if (!values.password) {
                                    errors.password = 'User password is required';
                                } else if (values.password.length < 4) {
                                    errors.password = 'Password is too short';
                                } else if (values.password.length > 25) {
                                    errors.passive = 'Password is too long'
                                }
                                ///////////////////////////////////////
                                if(!values.RID){
                                    errors.RID = 'User role required';
                                }
                                return errors;}}

                            onSubmit={(values, { setSubmitting }) => {
                                this.saveUser(values, setSubmitting);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                              }= this.props) => (
                                <form className="formAdmin" onSubmit={handleSubmit}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="fname"
                                        label="First name"
                                        value={values.fname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.fname && touched.fname)}
                                        helperText={touched.fname && errors.fname}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{style: {marginBottom: 10}}}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="lname"
                                        label="Last name"
                                        value={values.lname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.lname && touched.lname)}
                                        helperText={touched.lname && errors.lname}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{style: {marginBottom: 10}}}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.username && touched.username)}
                                        helperText={touched.username && errors.username}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{style: {marginBottom: 10}}}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.email && touched.email)}
                                        helperText={touched.email && errors.email}
                                        margin="normal"
                                        variant="outlined"
                                        type="email"
                                        InputProps={{style: {marginBottom: 10}}}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.password && touched.password)}
                                        helperText={touched.password && errors.password}
                                        margin="normal"
                                        variant="outlined"
                                        type="password"
                                        InputProps={{style: {marginBottom: 10}}}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        select
                                        name="RID"
                                        label="Role"
                                        value={values.RID}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!(errors.RID && touched.RID)}
                                        helperText={touched.RID && errors.RID}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {this.state.roles.filter(option => option.role === 'User').map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.role}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button color="primary" variant="outlined" type="submit"  size="large" style={{marginTop:10}} disabled={isSubmitting}>
                                        ADD USER
                                    </Button>
                                </form>
                            )}
                        </Formik>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.notification}
                            autoHideDuration={6000}
                            onClose={() => this.toggleNotification(false)}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.notification}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={() => this.toggleNotification(false)}>
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </div>
                    :
                    <div className="waitingAdmin"><CircularProgress  size={45} thickness={2.6} color="secondary"/></div>}
            </Fragment>
        );
    }
}
export default CreateUser;