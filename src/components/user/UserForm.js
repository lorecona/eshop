import React, {Component, Fragment} from "react";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {Formik} from "formik/dist/index";
import Grid from "@material-ui/core/Grid";

class UserForm extends Component {

    render() {
        return(
            <Fragment>
                <div className="adminTitle" style={{marginTop:140}}>Change your profile</div>
                    <Grid container className="admin" direction="column" alignItems="center">
                        <Formik
                            initialValues={{ fname: '', lname:'', email:''}}
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
                                if (!values.email) {
                                    errors.email = 'User email address is required';
                                } else if (values.email.length > 80) {
                                    errors.email = 'User email address is too long';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                ////////////////////////////////////////
                                return errors;}}

                            onSubmit={(values, { setSubmitting }) => {
                                this.props.update(values, setSubmitting);
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
                                <form className="formAdmin" onSubmit={handleSubmit} style={{ size:'20%'}}>
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
                                    <Grid container item xs={12} md={12} sm={12} lg={12} direction="column" alignItems="center">
                                        <Button color="primary" variant="outlined" type="submit" size="medium" style={{marginTop:10}} disabled={isSubmitting}>
                                            UPDATE CHANGES
                                        </Button>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </Grid>
            </Fragment>
        );
    }
}
export default UserForm;