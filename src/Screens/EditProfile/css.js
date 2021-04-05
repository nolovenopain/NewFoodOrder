import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { width, height, statusbarHeight } from '../../Components/Dimensions/Dimensions';

const avatarSIZE = 80

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    headerLeft: {
        width: 50,
        alignItems: 'center'
    },
    headerCenter: {
        width: width - 100,
        alignItems: 'center'
    },
    headerRight: {
        width: 50
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    body: {
        width: width,
        alignItems: 'center',
        paddingTop: 20
    },
    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        width: avatarSIZE,
        height: avatarSIZE,
        borderRadius: avatarSIZE/2,
        borderWidth: 2,
        borderColor: tomato,
    },
    row: {
        width: width - 30,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    left: {
        width: (width - 30)/2,
    },
    inputTitle: {
        fontFamily: 'Poppins-Regular',
    },
    right: {
        width: (width - 30)/2,
    },
    genderTitle: {
        marginRight: 5,
        color: 'gray'
    },
    saveBtn: {
        width: width - 60,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: tomato,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 40
    },
    btnTitle: {
        fontFamily: 'Poppins-Medium',
        color: tomato,
        fontSize: 17
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: height,
    },
    modalPicker: {
        height: 160,
        width: width/1.1,
        top: height/1.4
    },
    imgPicker: {
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    takePhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    },
    libraryPhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    }
});

export { styles };