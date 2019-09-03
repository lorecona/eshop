import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

const FormItems = (props) => {
    return(
        <Formik
            initialValues={{ _id: props.data._id, name: props.data.name, description:props.data.description, price:props.data.price, category:props.data.CID, distributor:props.data.distributor, image:props.data.image, quantity:0}}
            validate={ values => {
                let errors = {};
                if (!values.name) {
                    errors.name = 'Required name';
                } else if (values.name.length < 2) {
                    errors.name = 'Name is too short';
                } else if (values.name.length > 50){
                    errors.name = 'Name is too long'
                }
                ///////////////////////////////////////
                if (!values.description) {
                    errors.description = 'Item description required';
                } else if (values.description.length < 10) {
                    errors.description = 'Item description is too short';
                } else if (values.description.length > 75) {
                    errors.description = 'Item description is too long';
                }
                ////////////////////////////////////////
                if (!values.price) {
                    errors.price = 'Price required';
                } else if (values.price <= 0) {
                    errors.price = 'Price not valid';
                }
                ///////////////////////////////////////
                if(!values.category){
                    errors.category = 'Item category required';
                }
                ////////////////////////////////////////
                if(!values.distributor) {
                    errors.distributor = 'Distributor required';
                } else if (values.distributor.length > 35){
                    errors.distributor = 'Distributor name is too long';
                }
                /////////////////////////////////////////
                if(!values.image) {
                    errors.image = "Item image required";
                }
                return errors;}}

            onSubmit={(values, { setSubmitting }) => {props.submit(values, setSubmitting)}}
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
                <Grid container direction="column" alignItems="center" style={{marginBottom:40}}>
                    <form className="formAdmin" onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.name && touched.name)}
                            helperText={touched.name && errors.name}
                            margin="normal"
                            variant="outlined"
                            InputProps={{style: {marginBottom: 10}}}
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            name="description"
                            label="Product description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.description && touched.description)}
                            helperText={ touched.description && errors.description}
                            margin="normal"
                            variant="outlined"
                            rowsMax="5"
                            InputProps={{style: {marginBottom: 10}}}
                        />
                        <TextField
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.price && touched.price)}
                            helperText={touched.price && errors.price}
                            margin="normal"
                            variant="outlined"
                            type="number"
                            InputProps={{style: {marginBottom: 10}}}
                        />
                        <TextField
                            required
                            fullWidth
                            select
                            name="category"
                            label="Category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.category && touched.category)}
                            helperText={touched.category && errors.category}
                            margin="normal"
                            variant="outlined"
                        >
                            {props.categories.map(option => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            fullWidth
                            name="distributor"
                            label="Distributor"
                            value={values.distributor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.distributor && touched.distributor)}
                            helperText={touched.distributor && errors.distributor}
                            margin="normal"
                            variant="outlined"
                            InputProps={{style: {marginBottom: 10}}}
                        />
                        <TextField
                            required
                            fullWidth
                            name="image"
                            label="Image"
                            value={values.image}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!(errors.image && touched.image)}
                            helperText={touched.image && errors.image}
                            margin="normal"
                            variant="outlined"
                            InputProps={{style: {marginBottom: 10}}}
                        />
                        <Grid container item xs={12} md={12} sm={12} lg={12} direction="column" alignItems="center">
                            <Button color="primary" variant="outlined" type="submit" style={{marginTop:10}} size="large" disabled={isSubmitting}>
                                SAVE
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            )}
        </Formik>
    );
};

export default FormItems;
