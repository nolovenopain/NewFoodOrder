import { StyleSheet } from 'react-native';
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { height, width } from '../../Components/Dimensions/Dimensions';
import { tomato } from '../../Components/Colors/Color';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    modalContent: {
        width: width,
        height: height - height/4,
        backgroundColor: backgroundColorWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    modalHeaderLeft: {
        width: 80,
        paddingLeft: 10
    },
    modalHeaderCenter: {
        width: width - 160,
        alignItems: 'center'
    },
    modalHeaderRight: {
        width: 80,
        alignItems: 'center', 
    },
    modalHeaderTitle: {
        fontFamily: 'Poppins-Medium'
    },
    modalBody: {
        width: width,
        alignItems: 'center',
        flex: 1
    },
    element: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    elementLeft: {
        width: width - 40 - 100,
        paddingRight: 15
    },
    elementRight: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',    
    },
    orderName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    },
    orderDescribe: {
        color: 'gray',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginBottom: 5
    },
    orderPrice: {
        fontFamily: 'Poppins-Regular',
    },
    showAmount: {
        paddingHorizontal: 15,
    },
    amount: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center'
    },
    clearList: {
        color: tomato,
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    }
});

export { styles };