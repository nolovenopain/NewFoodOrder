import { StyleSheet, StatusBar } from 'react-native';
import { width, height } from '../../Components/Dimensions/Dimensions';
import { backgroundColorGrey, backgroundColorWhite, blue, tomato } from '../../Components/Colors/Color';

const imageSIZE = 70;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    header: {
        width: width,
        backgroundColor: backgroundColorGrey,
        alignItems: 'center',
    },
    topHeader: {
        width: width,
        backgroundColor: backgroundColorWhite,
        paddingBottom: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        marginBottom: 10
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
    storeImage: {
        width: width,
        height: 200,
        paddingTop: 40,
        alignItems: 'center',
        marginBottom: 10
    },
    storeNameWrapper: {
        width: width - 30,
        marginBottom: 5
    },
    storeName: {
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
    },
    evaluationAndDistance: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    evaluation: {
        fontFamily: 'Poppins-Light',
        marginLeft: 5
    },
    elementText: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
    },
    bottomHeader: {
        width: width,
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        backgroundColor: backgroundColorWhite
    },
    delivery: {
        marginLeft: 15,
        fontFamily: 'Poppins-Regular',
        marginBottom: 3
    },
    estTime: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    estTimeLeft: {
        width: width/2,
        paddingLeft: 20
    },
    estTimeRight: {
        width: width/2,
        alignItems: 'flex-end',
        paddingRight: 20
    },
    arrrival: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    changeArrivalTime: {
        fontFamily: 'Poppins-Light',
        color: blue
    },
    foodList: {
        backgroundColor: backgroundColorWhite,
        width: width,
        alignItems: 'center',
        flex: 1
    },
    foodElementWrapper: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.3,
        borderColor: 'silver',
        justifyContent: 'center'
    },
    foodImage: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5
    },
    foodElementInfo: {
        width: width - 40 - imageSIZE,
        paddingLeft: 15, 
    },
    foodElementInfoInside: {
        width: width - 40 - imageSIZE,
        paddingRight: 10
    },
    foodName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    },
    foodDescribe: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        marginBottom: 10,
        color: 'gray'
    },
    foodPrice: {
        fontFamily: 'Poppins-Regular',
    },
    orderGroup: {
        width: width - 40 - imageSIZE,
        alignItems: 'center',
        flexDirection: 'row'
    },
    foodPriceWrapper: {
        width: (width - 40 - imageSIZE)/2,
    },
    addToCart: {
        width: (width - 40 - imageSIZE)/2,
        paddingRight: 15,
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
    allFood: {
        width: width,
        backgroundColor: backgroundColorWhite,
        paddingLeft: 20,
        paddingTop: 15
    },
    allFoodTitle: {
        fontFamily: 'Poppins-Regular',
    },
    tabGroup: {
        width: width,
        backgroundColor: backgroundColorWhite,
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    tab: {
        marginTop: 7,
        alignItems: 'center',
        marginLeft: 20,
    },
    tabTitle: {
        marginBottom: 3
    },
    underlineTab: {
        width: 30,
        height: 3,
        borderRadius: 20
    },
    bgGeoLocationWrapper: {
        width: width - 40,
        height: 130,
    },
    showInforWrapper: {
        width: width,
        alignItems: 'center',
        backgroundColor: backgroundColorWhite,
    },
    mapView: {
        borderRadius: 10, 
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10
    },
    infoRow: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.2,
    },
    infoText: {
        marginLeft: 15,
        fontFamily: 'Poppins-Light'
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end'
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
    }
});

export { styles };