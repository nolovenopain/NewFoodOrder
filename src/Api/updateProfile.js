import Config from "react-native-config";
import { URL } from '../Constants';
import { Platform } from 'react-native';

const API_URL = Config.API_BASE_URL_RELEASE + URL.UPDATE_PROFILE;

const createFormData = (avatar) => {
    const data = new FormData();
    if(avatar) {
        data.append("avatar", {
            name: avatar.filename,
            type: avatar.mime,
            uri:
                Platform.OS == "android" ? avatar.path : avatar.path.replace("file://", "")
        });
    }
    return data;
};

const updateProfile = (token, name, gender, phone, birth_day, avatar) => (
    fetch(API_URL + 'token=' + token + '&name=' + name + '&gender=' + gender + '&phone=' + phone + '&birth_day=' + birth_day, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: avatar ? createFormData(avatar) : null
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default updateProfile;