import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.DELETE_ADDRESS;

const deleteAddress = (token, id_address) => (
    fetch(API_URL + 'token=' + token + '&id_address=' + id_address, 
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

export default deleteAddress;