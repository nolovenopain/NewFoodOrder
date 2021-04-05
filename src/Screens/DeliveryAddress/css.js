import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';
import { backgroundColorGrey, backgroundColorWhite, blue, tomato } from '../../Components/Colors/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: backgroundColorWhite,
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
    bodyHeader: {
        width: width,
        backgroundColor: backgroundColorGrey
    },
    bodyHeaderTop: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: backgroundColorWhite,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10
    },
    bodyHeaderTopLeft: {
        width: 40,
        height: 70
    },
    bodyHeaderTopCenter: {
        width: width - 40 - 80,
    },
    bodyHeaderTopRight: {
        width: 40,
        alignItems: 'flex-end',
        height: 70
    },
    receiver: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    phone: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    address: {
        fontFamily: 'Poppins-Regular',
    },
    editAddress: {
        fontFamily: 'Poppins-Regular',
        color: blue
    },
    bodyHeaderBottom: {
        backgroundColor: backgroundColorWhite,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    history: {
        fontFamily: 'Poppins-Regular',
    },
    body: {
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    bodyElement: {
        width: width,
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
    },
    bodyElementInside: {
        width: width - 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        paddingVertical: 10
    },
    touchableGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyElementLeft: {
        width: 40,
        height: 70
    },
    bodyElementCenter: {
        width: width - 40 - 80,
    },
    bodyElementRight: {
        width: 40,
        height: 70,
        alignItems: 'flex-end'
    },
    footer: {
        width: width,
        height: 20,
        backgroundColor: backgroundColorWhite,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    bottom: {
        width: width,
        backgroundColor: tomato,
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    addNewBtn: {
        width: width - 50,
        paddingVertical: 10,
        backgroundColor: backgroundColorWhite,
        alignItems: 'center',
        borderRadius: 25
    },
    addNewTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: tomato
    },
});

export { styles };