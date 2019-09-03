import axios from "axios";

export const updateUser = (id, data) => async (dispatch) => {
    try {
        let user;
        console.log(data);
        const response = await axios.put(`http://localhost:3001/users/${id}` ,{fname: data.fname, lname: data.lname, email:data.email});

        if(response.data.user){
            user = response.data.user;
            dispatch(updateUserSuccess(user));
        }
    }
    catch (e) {
        console.log(e);
    }
};

export const updateUserSuccess = (data) => {
    return {
        type: 'UPDATE_USER',
        payload: data,
    };
};

export const logIn = (data) => async (dispatch) => {
    try {
        let user;
        const response = await axios.post('http://localhost:3001/users/login', {username: data.username, password: data.password});

        if(response.data.user){
            user = response.data.user;
            axios.defaults.headers.common['Authorization'] = data.username + ':' + data.password;

            const storage = data.rememberMe ? window.localStorage : window.sessionStorage;
            storage.setItem('ESHOP_USER', data.username + ':' + data.password);

            dispatch(logInSuccess(user));
        }
    }
    catch (e) {
        console.log(e);
    }
};

export const logInSuccess = (data) => {

    return {
      type: 'LOG_IN_USER',
      payload: data,
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT_USER',
    };
};