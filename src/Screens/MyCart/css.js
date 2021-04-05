import { StyleSheet } from 'react-native';
import { backgroundColorGrey, backgroundColorWhite, blue, tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: statusbarHeight,
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
    bodyHeaderTopCenter: {
        paddingLeft: 15,
        width: width - 40 - 70 - 40,
    },
    bodyHeaderTopRight: {
        width: 40,
        alignItems: 'flex-end',
        height: 70
    },
    mapView: {
        borderRadius: 10, 
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10
    },
    bgGeoLocationWrapper: {
        width: 70,
        height: 70,
    },
    receiver: {
        fontFamily: 'Poppins-Regular',
    },
    phone: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        fontSize: 12
    },
    address: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        fontSize: 12
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
    storeName: {
        fontFamily: 'Poppins-Medium',
    },
    body: {
        flex: 1
    },
    elementWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        backgroundColor: backgroundColorWhite,
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    elementLeft: {
        height: 80,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        justifyContent: 'center'
    },
    elementRight: {
        width: width - 110,
        height: 80,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        justifyContent: 'center',
        paddingLeft: 15
    },
    orderName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 3
    },
    orderPrice: {
        fontFamily: 'Poppins-Regular',
    },
    footer: {
        backgroundColor: backgroundColorWhite,
        paddingTop: 15,
        width: width,
        alignItems: 'center'
    },
    footerRow: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerRowLeft: {
        width: (width - 40)/2,
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    footerRowRight: {
        width: (width - 40)/2,
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        alignItems: 'flex-end'
    },
    footerRowLeftTitle: {
        fontFamily: 'Poppins-Regular',
    },
    footerRowRightText: {
        fontFamily: 'Poppins-Regular',
    },
    totalPaymentTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },
    totalPaymentAmount: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18
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
    btnGroup: {
        width: width - 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    cardWrapper: {
        borderColor: '#fff',
        width: (width - 80) / 2,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10
    },
    cashWrapper: {
        borderColor: '#fff',
        width: (width - 80) / 2,
        marginLeft: 30,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10
    },
    btnTitle: {
        fontFamily: 'Poppins-Light',
        marginLeft: 10,
        textAlignVertical: 'center'
    },
    submitBtn: {
        width: width - 50,
        paddingVertical: 10,
        backgroundColor: backgroundColorWhite,
        alignItems: 'center',
        borderRadius: 25
    },
    submitTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: tomato
    },
    note: {
        fontFamily: 'Poppins-Light',
        fontSize: 12
    }
});

export { styles };