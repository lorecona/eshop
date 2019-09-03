import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {updateUser} from "../../actions/loggedInActions";
import {connect} from "react-redux";
import UserForm from "./UserForm";

class EditUser extends Component {

    updateUser = (values, setSubmitting) => {
        const id = this.props.match.params.id;
        const {updateUser} = this.props;
        updateUser(id, values);
        setSubmitting(false);
    };

    render() {
        return(
            <Grid container spacing={3} direction="column" alignItems="center">
                {
                    this.props.userInfo ?
                        (
                            <UserForm update={this.updateUser}/>
                        )
                        :
                        (
                            <Grid container item xs={12} sm={12} md={7} lg={7} className="empty" style={{marginTop:140, paddingTop:160, paddingBottom:160}}>
                                You do not have an account!
                            </Grid>
                        )
                }

            </Grid>

        );
    }
}

const mapStateToProps = (state) => {
    console.log('State here: ', state);
    return {
        userInfo: state.loggedInInfo.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (id, data) => dispatch(updateUser(id, data)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditUser);