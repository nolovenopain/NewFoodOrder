import { StyleSheet } from 'react-native';
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { height, width } from '../../Components/Dimensions/Dimensions';

const avatarSize = 60

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end'
    },
    bgGeoLocationWrapper: {
        width: width,
        height: height
    },
    back: {
        position: 'absolute',
        width: width,
        top: 30,
        left: 10,
    },
    bottom: {
        position: 'absolute',
    
    },
    borderTop: {
        width: width,
        paddingVertical: 10,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: tomato,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    borderBottomWrapper: {
        backgroundColor: tomato
    },
    borderBottom: {
        paddingTop: 15,
        paddingBottom: 20,
        width: width,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: backgroundColorWhite,
        alignItems: 'center'
    },
    borderBottomInside: {
        flexDirection: 'row',
        marginBottom: 20
    },
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize/2,
        borderWidth: 2,
        borderColor: backgroundColorWhite
    },
    borderTopCenter: {
        width: width - 60 - avatarSize - (avatarSize - 15) * 2 - 10,
        paddingLeft: 15,
    },
    evaluation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    driverName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        color: '#fff'
    },
    evaluate: {
        fontFamily: 'Poppins-Light',
        color: '#fff',
        marginLeft: 5
    },
    btn: {
        width: avatarSize - 15,
        height: avatarSize - 15,
        borderRadius: (avatarSize - 15)/2,
        backgroundColor: backgroundColorWhite,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBottomLeft: {
        width: avatarSize/2,
        alignItems: 'center'
    },
    borderBottomRight: {
        width: width - 60  - avatarSize/2,
        paddingLeft: 20,
    },
    locWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: tomato,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startLoc: {
       
    },
    address: {
        fontFamily: 'Poppins-Regular'
    },
    phone: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    cancelBtn: {
        paddingVertical: 10,
        width: width - 60,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: tomato,
        alignItems: 'center'
    },
    cancel: {
        color: tomato,
        fontFamily: 'Poppins-Medium',
        fontSize: 17
    }
})

export { styles };