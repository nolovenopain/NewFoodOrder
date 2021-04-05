import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.ADD_ADDRESS;

const createAddress = (token, lat, long, address, name, phone) => (
    fetch(API_URL + 'token=' + token + '&lat=' + lat + '&long=' + long + '&address=' + address + '&name=' + name + '&phone=' + phone, 
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

export default createAddress;