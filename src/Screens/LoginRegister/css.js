import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        marginBottom: 5,
        marginTop: 15
    },
    titleWrapper: {
        width: width - 40,
        marginBottom: 10
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 20,
        textAlign: 'center'
    },
    top: {
        width: width,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 25,
        paddingTop: 10
    },
    tabBarGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBarGroupLeft: {
        width: width/2,
        alignItems: 'center'
    },
    tabBarGroupRight: {
        width: width/2,
        alignItems: 'center'
    },
    loginTab: {
        width: width/4,
        paddingVertical: 10,
        alignItems: 'center'
    },
    registerTab: {
        width: width/4,
        paddingVertical: 10,
        alignItems: 'center'
    },
    tabTitle: {
        fontSize: 17,
        fontFamily: 'Poppins',
    },
    body: {
        width: width,
        alignItems: 'center'
    },
    inputGroup: {
        width: width/1.2,
        borderBottomWidth: 1,
        marginBottom: 20
    },
    inputLabel: {
        fontFamily: 'Poppins',
        fontSize: 17,
        color: 'gray'
    },
    forgotPasswordWrapper: {
        width: width/1.2,
        marginBottom: 20,
        alignItems: 'flex-start'
    },
    forgotPasswordTitle: {
        fontSize: 19,
        fontFamily: 'Poppins',
        color: tomato
    },
    btn: {
        width: width/1.2 - 10,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 25
    },
    btnTitle: {
        fontSize: 19,
        fontFamily: 'Poppins',
        color: tomato
    },
    loginWithGroup: {
        flexDirection: 'row',
        width: width/1.2
    },
    loginWithText: {
        fontSize: 15,
        fontFamily: 'Poppins',
    },
    facebook: {
        marginLeft: 15
    },
    google: {
        marginLeft: 20
    }
});

export { styles };