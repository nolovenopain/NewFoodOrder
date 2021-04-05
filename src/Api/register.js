import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.REGISTER;

const register = (firstname, lastname, email, password) => (
    fetch(API_URL + 'first_name=' + firstname + '&last_name=' + lastname + '&email=' + email + '&password=' + password, 
        {
            method: 'POST',
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

export default register;