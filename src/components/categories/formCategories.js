import React, {Fragment} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";

const FormCategories = (props) => {
     return (
         <Formik
             initialValues={{ name: ''}}
             validate={ values => {
                 let errors = {};
                 if (!values.name) {
                     errors.name = 'Required name';
                 } else if (values.name.length < 2) {
                     errors.name = 'Name is too short';
                 } else if (values.name.length > 30){
                     errors.name = 'Name is too long'
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
                   <Fragment>
                       <form className="formAdmin" onSubmit={handleSubmit}>
                           <div className="adminTitle">Add a new category</div>
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
                           <Button color="primary" variant="outlined" type="submit" style={{marginTop:10}} size="large" disabled={isSubmitting}>
                               ADD CATEGORY
                           </Button>
                       </form>
                   </Fragment>
             )}
         </Formik>
     );
};

export default FormCategories;