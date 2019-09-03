import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";

const FormOrders = (props) => {
    return (
        <Formik
            initialValues={{ name: '', phone:'', address: ''}}
            validate={ values => {
                let errors = {};
                if (!values.name) {
                    errors.name = 'Required name';
                } else if (values.name.length < 2) {
                    errors.name = 'Name is too short';
                }
                ///////////////////////////////////////
                if (!values.phone) {
                    errors.phone = 'Phone number required';
                } else if (values.phone.length < 10) {
                    errors.phone = 'Phone number too short';
                } else if (values.phone.length > 10) {
                    errors.phone = 'Phone number too long';
                }
                ////////////////////////////////////////
                if (!values.address) {
                    errors.address = 'Address required';
                } else if (values.address.length < 7) {
                    errors.address = 'Address too short';
                }
                return errors;}}

            onSubmit={(values, { setSubmitting }) => { props.submit(values, setSubmitting)}}
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
                <form className="contactInfo" onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.name && touched.name)}
                        helperText={errors.name}
                        margin="normal"
                        variant="outlined"
                        InputProps={{style: {marginBottom: 10}}}
                    />
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.phone && touched.phone)}
                        helperText={errors.phone}
                        margin="normal"
                        variant="outlined"
                        InputProps={{style: {marginBottom: 10}}}
                    />
                    <TextField
                        required
                        fullWidth
                        multiline
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.address && touched.address)}
                        helperText={errors.address}
                        margin="normal"
                        variant="outlined"
                        rowsMax="5"
                        InputProps={{style: {marginBottom: 10}}}
                    />

                    <Button color="secondary" variant="outlined" type="submit" style={{marginTop:10}} size="large" disabled={isSubmitting}>
                        PLACE ORDER
                    </Button>
                </form>
            )}
        </Formik>
    );
};
export default FormOrders;