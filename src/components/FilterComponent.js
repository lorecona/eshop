import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import "../styles/filter.css";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
const FilterComponent = (props) => {
    function valuetext(value) {
        return `${value}`;
    }
    return (
        <Formik
            initialValues={{ CID:'', distributor:'', range:[0,9000]}}
            onSubmit={(values, { setSubmitting }) => { props.submit(values, setSubmitting)}}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }= this.props) => (
                <form className="filterComponent" onSubmit={handleSubmit}>
                    <TextField
                        select
                        fullWidth
                        name="CID"
                        label="Category"
                        value={values.CID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {props.categories.map(option => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        name="distributor"
                        label="Distributor"
                        value={values.distributor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{marginTop:20}}
                    >
                        {props.distributors.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div className="searchTypes">
                        <Typography style={{marginTop:25}}>
                            Price range
                        </Typography>

                        <Slider
                            name="range"
                            id="range"
                            value={values.range}
                            onChange={(ev, value) => {
                               const newEvent = {
                                   target: {
                                       name: 'range',
                                       value,
                                   }
                               };

                               handleChange(newEvent)
                            }}
                            onBlur={handleBlur}
                            valueLabelDisplay="auto"
                            size="small"
                            max={9000}
                            getAriaValueText={valuetext}
                            style={{marginTop:20}}
                        />
                    </div>
                    <Grid container item xs={12} md={12} sm={12} lg={12} direction="column" alignItems="center">
                        <Button color="primary" type="submit" size="medium" disabled={isSubmitting}>
                            SEARCH
                        </Button>
                    </Grid>
                </form>
            )}
        </Formik>
        );
};

export default FilterComponent;