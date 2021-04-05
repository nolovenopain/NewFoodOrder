import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.LOGIN;

const login = (username, password, login_type) => (
    fetch(API_URL + 'username=' + username + '&password=' + password + '&login_type=' + login_type, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Cache-Control': 'no-cache'
            },
        })
    .then(res => { 
        return res;
    })
    .catch(err => console.log(err))
);

const loginViaSocial = (name, email, avatar, login_type) => (
    fetch(API_URL + 'name=' + name + '&username=' + email + '&avatar=' + avatar + '&login_type=' + login_type, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Cache-Control': 'no-cache'
            },
        })
    .then(res => { 
        return res;
    })
    .catch(err => console.log(err))
);

export { login, loginViaSocial };