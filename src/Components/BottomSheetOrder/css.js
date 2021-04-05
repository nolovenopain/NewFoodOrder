import { StyleSheet } from 'react-native';
import { width, height } from '../../Components/Dimensions/Dimensions';
import { backgroundColorGrey, backgroundColorWhite, tomato } from '../../Components/Colors/Color';

const imageSIZE = 70;

const styles = StyleSheet.create({
    bottomSheet: {
        height: height - height/4,
        backgroundColor: backgroundColorWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width   
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    bottomSheetHeaderLeft: {
        alignItems: 'flex-end',
        width: 40
    },
    bottomSheetHeaderCenter: {
        width: width - 80,
        alignItems: 'center'
    },
    bottomSheetHeaderRight: {
        width: 40
    },
    bottomSheetHeaderTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    sizeHeaderWrapper: {
        width: width,
        paddingVertical: 5,
        backgroundColor: backgroundColorGrey,
        paddingLeft: 15
    },
    sizeHeaderTitle: {
        fontFamily: 'Poppins',
        color: 'gray'
    },
    orderPassToBottomSheetDetails: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderImage: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5
    },
    foodElementInfo: {
        width: width - 40 - imageSIZE,
        paddingLeft: 15
    },
    foodElementInfoInside: {
        width: width - 40 - imageSIZE - 15,
        paddingRight: 15
    },
    foodName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    },
    foodDescribe: {
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        marginBottom: 10,
        color: 'gray'
    },
    foodPrice: {
        fontSize: 17,
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
        fontSize: 17,
        fontFamily: 'Poppins-Light'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        width: width,
        borderLeftWidth: 3,
        borderBottomWidth: 0.3,
        borderBottomColor: 'silver'
    },
    rowLeft: {
        width: width/2,
        paddingLeft: 15,    
    },
    rowRight: {
        width: width/2,
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Poppins'
    },
    bottomSheetBody: {
        height: height - height/4 - 110
    },
    bottomSheetBottom: {
        height: 60,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.3,
        borderColor: 'gray'
    },
    bottomSheetBottomLeft: {
        width: width/2,
        paddingLeft: 15
    },
    bottomSheetBottomRight: {
        width: width/2,
        alignItems: 'center'
    },
    totalPayment: {
        fontSize: 20,
        fontFamily: 'Poppins'
    },
    confirmBtn: {
        alignItems: 'center',
        paddingVertical: 5,
        borderColor: tomato,
        borderWidth: 1,
        borderRadius: 20,
        width: width/2 - 30
    },
    confirmBtnTitle: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: tomato
    }
});

export { styles };