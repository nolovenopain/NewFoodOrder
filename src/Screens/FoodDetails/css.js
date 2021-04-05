import { StyleSheet } from 'react-native';
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    headerGroupBtn: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerGroupBtnLeft: {
        width: (width - 20)/2,
    },
    headerGroupBtnRight: {
        width: (width - 20)/2,
        alignItems: 'flex-end',
    },
    image: {
        width: width,
        height: 200,
        paddingTop: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    body: {
        width: width,
        alignItems: 'center'
    },
    foodNameRow: {
        width: width - 30,
        marginBottom: 10
    },
    foodName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17
    },
    priceRow: {
        flexDirection: 'row',
        marginBottom: 20  
    },
    rowLeft: {
        width: (width - 30)/2
    },
    price: {
        fontFamily: 'Poppins-Regular',
    },
    rowRight: {
        width: (width - 30)/2,
        alignItems: 'flex-end'
    },
    removeAddGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    showAmount: {
        paddingHorizontal: 15
    },
    amount: {
        fontFamily: 'Poppins-Light'
    },
    cartBorder: {
        width: width,
        backgroundColor: tomato,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        height: 60,
        alignItems: 'center', 
    },
    cartBorderWrapper: {
        width: width,
        backgroundColor: backgroundColorWhite,
    },
    cartBorderInside: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    iconCartWrapper: {
        width: 40,
        height: 30,
    },
    totalPaymentWrapper: {
        width: width - 200,
        height: 30,
        paddingHorizontal: 10
    },
    checkOutWrapper: {
        height: 30,
        width: 100,
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
        borderRadius: 10,
        justifyContent: 'center'
    },
    payment: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-Medium',
    },
    checkOut: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium'
    },
    amountOnIconCartWrapper: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        position: 'absolute',
        left: 20,
        top: -5
    },
    amountOnIconCart: {
        color: '#fff'
    },
    describeWrapper: {
        width: width - 30
    },
    describe: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        lineHeight: 22
    }
});

export { styles };