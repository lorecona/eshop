import React, {Component, Fragment} from "react";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {Formik} from "formik/dist/index";
import '../styles/login.css'
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class LogInForm extends Component {

    render() {
        return(
            <Fragment>
                    <Formik
                            initialValues={{ username:'', password:'', rememberMe:false}}
                            validate={ values => {
                                let errors = {};
                                if (!values.username) {
                                    errors.username = 'Username is required';
                                } else if (values.username.length < 2) {
                                    errors.username = 'Username is too short';
                                } else if (values.username.length > 25){
                                    errors.username = 'Username is too long'
                                }
                                ///////////////////////////////////////
                                if (!values.password) {
                                    errors.password = 'Password is required';
                                } else if (values.password.length < 4) {
                                    errors.password = 'Password is too short';
                                } else if (values.password.length > 25) {
                                    errors.passive = 'Password is too long'
                                }
                                return errors;}}

                            onSubmit={(values, { setSubmitting }) => {
                                this.props.submit(values, setSubmitting);
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
                                <Grid container direction="column" alignItems="center" justify="space-around">
                                    <form onSubmit={handleSubmit}>
                                        <Grid item xs={6} md={12} sm={12} lg={12}>
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
                                        </Grid>
                                        <Grid item xs={6} md={12} sm={12} lg={12}>
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
                                        </Grid>
                                        <Grid container item xs={6} md={12} sm={12} lg={12} direction="column" alignItems="center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="rememberMe"
                                                        checked={values.rememberMe}
                                                        value={values.rememberMe}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color="primary"
                                                    />
                                                }
                                                label="Remember me"
                                            />
                                            <Button color="primary" variant="outlined" type="submit"  size="small" style={{marginTop:6}} disabled={isSubmitting}>
                                                LOG IN
                                            </Button>
                                        </Grid>
                                    </form>
                                </Grid>
                            )}
                    </Formik>
            </Fragment>
        );
    }
}
export default LogInForm;