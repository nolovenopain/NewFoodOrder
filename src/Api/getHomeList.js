import Config from "react-native-config";
import { URL } from '../Constants'

const API_URL = Config.API_BASE_URL_RELEASE + URL.LIST_HOME;

const getHomeList = (category_id, lat, long) => (
    fetch(API_URL + 'category_id=' + category_id + '&lat=' + lat + '&long=' + long, 
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

export default getHomeList;