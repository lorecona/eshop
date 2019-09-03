import React from 'react';
import Button from "@material-ui/core/Button/index";
import {Formik} from "formik/dist/index";
import "../../styles/filter.css";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

const AdminFilterComponent = (props) => {
    function valuetext(value) {
        return `${value}`;
    }
    return (
        <Formik
            initialValues={{range:[0,9000], isCompleted:false}}
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
                    <div className="searchTypes">
                        <Typography>
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
                            style={{marginTop:10}}
                            size="small"
                            max={9000}
                            getAriaValueText={valuetext}
                        />
                    </div>
                    <FormControlLabel
                        style={{marginTop:20, marginBottom:20}}
                        control={
                            <Switch
                                name="isCompleted"
                                value={values.isCompleted}
                                checked={values.isCompleted}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        }
                        label="COMPLETED"
                    />
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

export default AdminFilterComponent;